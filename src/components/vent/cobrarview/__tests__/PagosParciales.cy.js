import { h } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import CobrarOptions from '../CobrarOptions.vue'
import FormasPago from '../FormasPago.vue'
import { useSucursalStore } from '../../../../stores/sucursal'

const API = 'http://127.0.0.1:8000'

const parciales = [
    {
        id: 565298, tipo_venta: 'COD', plazo: '1 Semana', fecha: '2026-10-29T18:00:00', total_venta: '2290.00',
        pago_inicial: '1000.00', total_pagado: '1500.00', diferencia: '790.00',
        detalles: [{ nombre: 'ARMAZON PRUEBA', cantidad: 1, subtotal: '2290.00' }],
        abonos: [{ id: 4, cotizacion_id: 565298, usuario_id: 1, monto: '500.00', tipo: 'pago', fecha: '2026-10-30T18:00:00' }],
    },
]

const montar = () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    useSucursalStore().sucursalSeleccionada = { id: 3, nombre: 'Almacen Central' }
    const Vista = {
        render: () => h('div', [
            h(CobrarOptions, { modelValue: 'Pagos Parciales', cliente: { id: 7, nombres: 'GONZALEZ', apellidos: 'DILAN' } }),
            h(FormasPago),
        ]),
    }
    cy.mount(Vista, { global: { plugins: [pinia] } })
}

const importe = (forma) => cy.get(`[data-cy="importe-${forma}"]`)

describe('Cobrar - Pagos Parciales', () => {
    beforeEach(() => {
        cy.viewport(1400, 1000)
        cy.intercept('GET', `${API}/pagos/parciales/cliente/7`, parciales).as('parciales')
    })

    it('muestra la venta con lo pagado y su historial; el lápiz propone el saldo completo', () => {
        montar()
        cy.wait('@parciales')
        cy.get('[data-cy=parcial]').should('have.length', 1)
            .and('contain', 'COD').and('contain', '1 Semana').and('contain', '29-oct-2026')
            .and('contain', '$2,290.00').and('contain', '$1,500.00').and('contain', '$790.00')
        cy.contains('.PParPagadoMonto', '1,500.00').click()
        cy.contains('.PParDetalleItem', 'Pago inicial').should('contain', '$1,000.00')
        cy.contains('.PParDetalleItem', 'Abono').should('contain', '$500.00')

        cy.get('[data-cy=cobrar-aceptar]').should('be.disabled')
        cy.get('[data-cy=abonar-saldo]').click()
        cy.get('[data-cy=abono]').should('have.value', '790.00')
        cy.get('[data-cy=parciales-total]').should('contain', '$790.00')
        cy.get('[data-cy=total-global]').should('contain', '$790.00')

        cy.get('[data-cy=abono]').clear().type('800')
        cy.get('[data-cy=abono]').should('have.class', 'invalido')
    })

    it('cobra los abonos con sus formas de pago', () => {
        cy.intercept('POST', `${API}/pagos/abonos`, {
            id: 12, tipo: 'abono', cliente_id: 7, sucursal_id: 3, fecha: '2026-11-02T18:00:00', total: '300.00',
            recibido: '300.00', cambio: '0.00', observaciones: null, formas: [], cotizacion_ids: [565298],
        }).as('cobrar')
        montar()
        cy.wait('@parciales')
        cy.get('[data-cy=abono]').type('300')
        cy.get('[data-cy=cobrar-aceptar]').should('be.disabled')
        importe('CLIP').type('300')
        cy.get('[data-cy=diferencia]').should('contain', '$0.00')

        cy.intercept('GET', `${API}/pagos/parciales/cliente/7`, []).as('recarga')
        cy.get('[data-cy=cobrar-aceptar]').should('not.be.disabled').click()
        cy.wait('@cobrar').its('request.body').should('deep.equal', {
            sucursal_id: 3,
            abonos: [{ cotizacion_id: 565298, monto: '300.00' }],
            formas: [{ forma: 'CLIP', referencia: null, importe: '300.00' }],
            observaciones: null,
        })
        cy.wait('@recarga')
        cy.get('[data-cy=parciales-aviso]').should('contain', 'cobro #12')
        importe('CLIP').should('have.value', '')
    })

    it('cancela el saldo pendiente previa confirmación', () => {
        cy.intercept('POST', `${API}/abonos/incobrable/565298`, { id: 5, tipo: 'incobrable' }).as('cancelar')
        montar()
        cy.wait('@parciales')
        cy.on('window:confirm', (texto) => {
            expect(texto).to.contain('$790.00')
            return true
        })
        cy.get('[data-cy=cancelar-saldo]').click()
        cy.wait('@cancelar')
        cy.get('[data-cy=parciales-aviso]').should('contain', 'Se canceló el saldo')
    })
})
