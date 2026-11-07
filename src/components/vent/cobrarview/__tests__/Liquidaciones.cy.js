import { createPinia, setActivePinia } from 'pinia'
import CobrarOptions from '../CobrarOptions.vue'

const API = 'http://127.0.0.1:8000'

const fila = (id, extra = {}) => ({
    id, sucursal: 'Servicio a Industrias', ticket: 168, folio: null, importe_total: '21180.35',
    impresa: false, fecha_liquidacion: '2019-07-13T18:00:00', ...extra,
})

const detalle = {
    id: 460867, sucursal: 'Servicio a Industrias', tipo_venta: 'Contado', plazo: 'Inmediato',
    fecha_venta: '2019-07-10T18:00:00', fecha_liquidacion: '2019-07-13T18:00:00', total_venta: '21180.35', impresa: false,
    detalles: [{ nombre: 'ARMAZON PRUEBA', cantidad: 2, subtotal: '21180.35' }],
    pagos: [
        {
            concepto: 'Pago inicial', fecha: '2019-07-13T18:00:00', monto: '21180.35', cobro_id: 168, cobro_total: '22000.00',
            formas: [{ forma: 'Efectivo', referencia: null, importe: '2000.00' }, { forma: 'CLIP', referencia: '4321', importe: '20000.00' }],
        },
    ],
}

const ticket = {
    folio: 460867, fecha: '2019-07-10T18:00:00', sucursal: 'Servicio a Industrias', vendedor: 'Ana', cliente_nombre: 'TIMS',
    cliente_direccion: '-', cliente_telefono: '-', tipo_cliente: null, paciente: null, plazo: 'Inmediato', promocion: null,
    items: [{ cantidad: 2, nombre: 'ARMAZON PRUEBA', precio_unitario: '10590.18', descuento_porcentaje: '0' }],
    total_normal: '21180.35', total_venta: '21180.35', descuento_porcentaje: '0', pago_inicial: '21180.35', pago_restante: '0',
    promesa_entrega: null,
}

const montar = () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    cy.mount(CobrarOptions, {
        props: { modelValue: 'Liquidaciones', cliente: { id: 7, nombres: 'TIMS MEXICO', apellidos: '' } },
        global: { plugins: [pinia] },
    })
}

describe('Cobrar - Liquidaciones', () => {
    beforeEach(() => {
        cy.viewport(1400, 900)
        cy.intercept('GET', `${API}/pagos/liquidaciones/cliente/7*`, (req) => {
            const pagina = Number(req.query.pagina)
            req.reply({
                total: 12, pagina, por_pagina: 10,
                items: pagina === 1 ? [fila(460867), fila(462060, { ticket: 62, importe_total: '609.00', impresa: true })] : [fila(462064, { ticket: 64 })],
            })
        }).as('liquidaciones')
    })

    it('lista las ventas liquidadas con paginación y sin cobro pendiente', () => {
        montar()
        cy.wait('@liquidaciones').its('request.query').should('include', { pagina: '1', por_pagina: '10' })
        cy.get('[data-cy=liquidacion]').should('have.length', 2)
        cy.get('[data-cy=liquidacion]').first()
            .should('contain', 'Servicio a Industrias').and('contain', '460867').and('contain', '168')
            .and('contain', 'N/A').and('contain', '$21,180.35').and('contain', '13/07/2019')
        cy.get('[data-cy=liquidacion]').eq(1).find('.LiqImpresa.si').should('exist')
        cy.get('[data-cy=total-global]').should('contain', '$0.00')
        cy.get('[data-cy=cobrar-aceptar]').should('be.disabled')

        cy.get('.Paginacion').should('contain', '1–10 de 12 liquidaciones')
        cy.get('.PagBtn').contains('2').click()
        cy.wait('@liquidaciones').its('request.query.pagina').should('equal', '2')
        cy.get('[data-cy=liquidacion]').should('have.length', 1).and('contain', '462064')
    })

    it('muestra el detalle e imprime el ticket marcándolo como impreso', () => {
        cy.intercept('GET', `${API}/pagos/liquidaciones/460867`, detalle).as('detalle')
        cy.intercept('GET', `${API}/cotizacion/ticket/460867`, ticket).as('ticket')
        cy.intercept('POST', `${API}/pagos/liquidaciones/460867/impresa`, { id: 460867, impresa: true }).as('impresa')
        montar()
        cy.wait('@liquidaciones')
        cy.window().then((win) => {
            cy.stub(win, 'open').returns({ document: { open() { }, write() { }, close() { } }, focus() { }, print() { }, close() { } })
        })
        cy.get('[data-cy=ver-liquidacion]').first().click()
        cy.wait('@detalle')
        cy.get('[data-cy=liquidacion-detalle]').should('contain', 'Contado · Inmediato').and('contain', 'ARMAZON PRUEBA')
        cy.get('[data-cy=liquidacion-pagos]').should('contain', 'Pago inicial').and('contain', 'Cobro #168')
            .and('contain', 'Efectivo $2,000.00').and('contain', 'CLIP $20,000.00')
            .and('contain', 'incluyó otros presupuestos')

        cy.get('[data-cy=imprimir-liquidacion]').click()
        cy.wait('@ticket')
        cy.wait('@impresa')
        cy.get('[data-cy=liquidacion-detalle]').should('contain', 'Impreso')
        cy.get('[data-cy=liquidacion]').first().find('.LiqImpresa.si').should('exist')
    })
})
