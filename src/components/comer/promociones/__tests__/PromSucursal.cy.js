import 'v-calendar/style.css'
import { createPinia, setActivePinia } from 'pinia'
import PromConEdits from '../PromConEdits.vue'
import { usePromocionStore } from '../../../../stores/promocion'

const API = 'http://127.0.0.1:8000'

const sucursales = [
    { id: 1, sucursal: 'Almacen Central' },
    { id: 2, sucursal: 'Jilotepec' },
    { id: 7, sucursal: 'Smart La Cuesta' },
]

const montar = () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    cy.mount(PromConEdits, { global: { plugins: [pinia] } })
    return usePromocionStore()
}

describe('Promociones - pestaña Sucursal', () => {
    beforeEach(() => {
        cy.viewport(1400, 900)
        cy.intercept('GET', `${API}/sucursales/all`, sucursales).as('sucursales')
    })

    it('mueve sucursales entre Disponibles y Aplica en', () => {
        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=suc-disponibles] .SucItem').should('have.length', 3)

        cy.contains('[data-cy=suc-disponibles] .SucItem', 'Jilotepec').click()
        cy.get('[data-cy=suc-agregar]').click()
        cy.get('[data-cy=suc-aplica] .SucItem').should('have.length', 1).and('contain', 'Jilotepec')

        cy.contains('[data-cy=suc-disponibles] .SucItem', 'Almacen Central').dblclick()
        cy.get('[data-cy=suc-aplica] .SucItem').should('have.length', 2)

        cy.get('[data-cy=suc-agregar-todas]').click()
        cy.get('[data-cy=suc-disponibles] .SucItem').should('have.length', 0)

        cy.get('[data-cy=suc-eliminar-todas]').click()
        cy.get('[data-cy=suc-aplica] .SucItem').should('have.length', 0)
        cy.get('[data-cy=suc-disponibles] .SucItem').should('have.length', 3)
    })

    it('valida los datos antes de guardar', () => {
        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=promo-descuento]').type('10')
        cy.get('[data-cy=promo-descuento-vendedor]').type('20')
        cy.get('[data-cy=promo-guardar]').click()
        cy.get('[data-cy=promo-aviso]')
            .should('contain', 'Ingrese el nombre')
            .and('contain', 'no puede ser mayor al descuento')
            .and('contain', 'Indique la vigencia')
            .and('contain', 'Agregue al menos una sucursal')
    })

    it('crea una promoción permanente con el payload esperado y limpia el formulario', () => {
        cy.intercept('POST', `${API}/promociones/create`, (req) => {
            req.reply({
                id: 12, ...req.body, activo: true, vigente: true,
                sucursales: [{ id: 1, sucursal: 'Almacen Central' }, { id: 7, sucursal: 'Smart La Cuesta' }],
                creado_por: 'u', fecha_creacion: '2026-10-27T10:00:00', modificado_por: 'u', fecha_modificacion: '2026-10-27T10:00:00',
            })
        }).as('crear')

        const promo = montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=promo-nombre]').type('  Promo Lentes  ')
        cy.get('[data-cy=promo-descuento]').type('15')
        cy.get('[data-cy=promo-descuento-vendedor]').type('5')
        cy.get('[data-cy=promo-acumulativa]').check()
        cy.get('[data-cy=promo-permanente]').check()
        cy.get('[data-cy=promo-inicio]').should('be.disabled')
        cy.contains('[data-cy=suc-disponibles] .SucItem', 'Almacen Central').click()
        cy.contains('[data-cy=suc-disponibles] .SucItem', 'Smart La Cuesta').click()
        cy.get('[data-cy=suc-agregar]').click()

        cy.get('[data-cy=promo-guardar]').click()
        cy.wait('@crear').its('request.body').should('deep.equal', {
            nombre: 'Promo Lentes',
            descuento: 15,
            descuento_max_vendedor: 5,
            acumulativa: true,
            permanente: true,
            fecha_inicio: null,
            fecha_fin: null,
            sucursales: [1, 7],
            tipos_venta: [],
            plazos: [],
            productos: [],
            atributos_valores: [],
            clientes: [],
            tipos_cliente: [],
        })
        cy.get('[data-cy=promo-aviso]').should('contain', 'Promoción #12 "Promo Lentes" creada')
        cy.contains('Nueva promoción')
        cy.get('[data-cy=promo-nombre]').should('have.value', '')
        cy.get('[data-cy=promo-descuento]').should('have.value', '')
        cy.get('[data-cy=promo-acumulativa]').should('not.be.checked')
        cy.get('[data-cy=promo-permanente]').should('not.be.checked')
        cy.get('[data-cy=suc-aplica] .SucItem').should('have.length', 0)
        cy.then(() => expect(promo.id).to.equal(null))
    })

    it('envía la vigencia como fechas de calendario y muestra errores del servidor', () => {
        cy.intercept('POST', `${API}/promociones/create`, {
            statusCode: 400, body: { detail: "Ya existe una promocion activa con el nombre 'Buen Fin'" },
        }).as('crear')

        const promo = montar()
        cy.wait('@sucursales')
        cy.then(() => {
            promo.nombre = 'Buen Fin'
            promo.descuento = 20
            promo.fechaInicio = new Date(2026, 10, 1)
            promo.fechaFin = new Date(2026, 10, 30)
            promo.sucursalesIds = [2]
        })
        cy.get('[data-cy=promo-inicio]').should('have.value', '01/11/2026')
        cy.get('[data-cy=promo-guardar]').click()
        cy.wait('@crear').its('request.body').should('include', { fecha_inicio: '2026-11-01', fecha_fin: '2026-11-30' })
        cy.get('[data-cy=promo-aviso]').should('contain', 'Ya existe una promocion activa')
        cy.contains('Nueva promoción')
    })
})
