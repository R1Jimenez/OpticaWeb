import { createPinia, setActivePinia } from 'pinia'
import FiltCotiz from '../FiltCotiz.vue'
import { useCotizacionStore } from '../../../../stores/cotizacion'

const API = 'http://127.0.0.1:8000'

const promoArmazones = {
    id: 3, nombre: 'Armazones 20%', descuento: '20.00', acumulativa: false,
    productos: [{ id: 36, etiqueta: 'ARMAZON' }], atributos_valores: [],
}
const promoGeneral = { id: 4, nombre: 'Buen Fin', descuento: '5.00', acumulativa: true, productos: [], atributos_valores: [] }

const montar = () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useCotizacionStore()
    store.setSucursal({ id: 1, nombre: 'Almacen Central' })
    cy.mount(FiltCotiz, { global: { plugins: [pinia] } })
    return store
}

describe('Cotización - dropdown de promociones', () => {
    beforeEach(() => {
        cy.viewport(1400, 700)
        cy.intercept('GET', `${API}/tipo_venta/all`, [{ id: 1, venta: 'Contado' }, { id: 2, venta: 'Credito' }])
        cy.intercept('GET', `${API}/plazos/1`, [{ id: 10, plazo: '1 semana', tipo_venta_id: 1 }])
        cy.intercept('GET', `${API}/plazos/2`, [{ id: 20, plazo: '4 semanas', tipo_venta_id: 2 }])
        cy.intercept('GET', `${API}/promociones/disponibles*`, (req) => {
            // la promo de armazones solo aplica a ventas de contado
            req.reply(req.query.tipo_venta_id === '1' ? [promoArmazones, promoGeneral] : [promoGeneral])
        }).as('disponibles')
    })

    it('lista las promociones disponibles y aplica la elegida a los totales', () => {
        const store = montar()
        cy.wait('@disponibles').its('request.query').should('include', { sucursal_id: '1' })
        cy.get('[data-cy=promocion-dropdown]').should('contain', 'Sin promoción').click()
        cy.get('[data-cy=promocion-opciones] .PromoItem').should('have.length', 2)
        cy.contains('[data-cy=promocion-opciones] .PromoItem', 'Armazones 20%').should('contain', '20% · no acumulativa · 1 producto(s)').click()
        cy.get('[data-cy=promocion-dropdown]').should('contain', 'Armazones 20%')

        cy.then(() => {
            store.descuentoPorcentaje = 10
            store.agregarItem({ producto: { id: 36, atributos_seleccionados: {} }, precio: { precio: '100' }, piezas: 1 })
            store.agregarItem({ producto: { id: 38, atributos_seleccionados: {} }, precio: { precio: '200' }, piezas: 1 })
            // 100 - 20% (elegible) + 200 - 10% (cliente)
            expect(store.totalVenta).to.equal(260)
            expect(store.pctItem(store.items[0])).to.equal(20)
            expect(store.pctItem(store.items[1])).to.equal(10)
        })
    })

    it('al cambiar a un tipo de venta donde ya no aplica, quita la promoción seleccionada', () => {
        const store = montar()
        // espera a que se carguen tipo de venta y plazo por defecto (cada cambio vuelve a consultar)
        cy.get('[data-cy=promocion-dropdown]').click()
        cy.get('[data-cy=promocion-opciones] .PromoItem').should('have.length', 2)
        cy.contains('[data-cy=promocion-opciones] .PromoItem', 'Armazones 20%').click()
        cy.get('[data-cy=promocion-dropdown]').should('contain', 'Armazones 20%')
        cy.then(() => store.setTipoVenta({ id: 2, venta: 'Credito' }))
        cy.get('[data-cy=promocion-dropdown]').should('contain', 'Sin promoción')
        cy.then(() => expect(store.promocionSeleccionada).to.equal(null))
    })
})
