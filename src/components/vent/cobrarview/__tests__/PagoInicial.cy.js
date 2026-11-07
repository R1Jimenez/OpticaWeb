import { h } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import CobrarOptions from '../CobrarOptions.vue'
import FormasPago from '../FormasPago.vue'
import { useSucursalStore } from '../../../../stores/sucursal'

const API = 'http://127.0.0.1:8000'

const pendientes = [
    {
        id: 565299, tipo_venta: 'Contado', plazo: 'Inmediato', fecha: '2026-10-30T18:00:00', vencimiento: '2026-10-30T18:00:00',
        total_venta: '500.00', pago_inicial: '500.00', detalles: [{ nombre: 'ARMAZON PRUEBA', cantidad: 1, subtotal: '500.00' }],
    },
    {
        id: 565300, tipo_venta: 'Credito', plazo: '4 semanas', fecha: '2026-10-30T18:05:00', vencimiento: '2026-11-27T18:05:00',
        total_venta: '1000.00', pago_inicial: '200.00', detalles: [],
    },
]

const montar = () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    useSucursalStore().sucursalSeleccionada = { id: 3, nombre: 'Almacen Central' }
    const Vista = {
        render: () => h('div', [
            h(CobrarOptions, { modelValue: 'Pago Inicial', cliente: { id: 7, nombres: 'Mostrador', apellidos: '' } }),
            h(FormasPago),
        ]),
    }
    cy.mount(Vista, { global: { plugins: [pinia] } })
}

const importe = (forma) => cy.get(`[data-cy="importe-${forma}"]`)

describe('Cobrar - Pago Inicial', () => {
    beforeEach(() => {
        cy.viewport(1400, 1000)
        cy.intercept('GET', `${API}/pagos/pago-inicial/cliente/7`, pendientes).as('pendientes')
    })

    it('muestra los presupuestos con su pago inicial y calcula total, crédito y diferencia', () => {
        montar()
        cy.wait('@pendientes')
        cy.get('[data-cy=presupuesto]').should('have.length', 2)
        cy.get('[data-cy=presupuesto]').first().should('contain', 'Contado').and('contain', 'Inmediato').and('contain', '30-oct-2026')
        cy.get('[data-cy=pago-inicial-total]').should('contain', '700.00')
        cy.get('[data-cy=total-global]').should('contain', '700.00')
        cy.get('[data-cy=forma-credito]').should('have.value', '800.00').and('be.disabled')
        cy.get('[data-cy=diferencia]').should('contain', '-$700.00')
        cy.get('[data-cy=diferencia-aviso]').should('have.text', 'Falta por cubrir')
        cy.get('[data-cy=cobrar-aceptar]').should('be.disabled')

        importe('Tarjeta de Crédito').type('720')
        cy.get('[data-cy=diferencia-aviso]').should('have.text', 'El cambio solo puede darse en efectivo')
        cy.get('[data-cy=cobrar-aceptar]').should('be.disabled')
        importe('Efectivo').type('10')
        cy.get('[data-cy=cobrar-aceptar]').should('be.disabled')
        importe('Tarjeta de Crédito').clear().type('500')
        cy.get('[data-cy=total-pagado]').should('contain', '510.00')
        cy.get('[data-cy=diferencia-aviso]').should('have.text', 'Falta por cubrir')
        importe('Efectivo').clear().type('250')
        cy.get('[data-cy=diferencia]').should('contain', '50.00')
        cy.get('[data-cy=diferencia-aviso]').should('have.text', 'Cambio a entregar')
        cy.get('[data-cy=cobrar-aceptar]').should('not.be.disabled')
    })

    it('registra el cobro, limpia las formas de pago y recarga los pendientes', () => {
        cy.intercept('POST', `${API}/pagos/pago-inicial`, {
            id: 9, tipo: 'pago_inicial', cliente_id: 7, sucursal_id: 3, fecha: '2026-11-02T18:00:00', total: '700.00',
            recibido: '750.00', cambio: '50.00', observaciones: null, formas: [], cotizacion_ids: [565299, 565300],
        }).as('cobrar')
        montar()
        cy.wait('@pendientes')
        cy.get('[aria-label="Referencia Tarjeta de Crédito"]').type(' 4321 ')
        importe('Tarjeta de Crédito').type('500')
        importe('Efectivo').type('250')
        cy.get('[data-cy=observaciones]').type('Paga en mostrador')

        cy.intercept('GET', `${API}/pagos/pago-inicial/cliente/7`, []).as('recarga')
        cy.get('[data-cy=cobrar-aceptar]').click()
        cy.wait('@cobrar').its('request.body').should('deep.equal', {
            sucursal_id: 3,
            cotizacion_ids: [565299, 565300],
            formas: [
                { forma: 'Efectivo', referencia: null, importe: '250.00' },
                { forma: 'Tarjeta de Crédito', referencia: '4321', importe: '500.00' },
            ],
            observaciones: 'Paga en mostrador',
        })
        cy.wait('@recarga')
        cy.get('[data-cy=pago-inicial-aviso]').should('contain', 'cobro #9').and('contain', 'Cambio a entregar: $50.00')
        cy.contains('no tiene presupuestos pendientes')
        importe('Efectivo').should('have.value', '')
        cy.get('[data-cy=observaciones]').should('have.value', '')
        cy.get('[data-cy=total-global]').should('contain', '0.00')
    })

    it('muestra el error del servidor sin perder lo capturado', () => {
        cy.intercept('POST', `${API}/pagos/pago-inicial`, {
            statusCode: 400, body: { detail: 'El pago inicial del presupuesto 565299 ya fue cobrado' },
        })
        montar()
        cy.wait('@pendientes')
        importe('Efectivo').type('700')
        cy.get('[data-cy=cobrar-aceptar]').click()
        cy.get('[data-cy=pago-inicial-aviso]').should('contain', 'ya fue cobrado')
        importe('Efectivo').should('have.value', '700')
    })
})
