import { h, ref } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import ConexFilt from '../ConexFilt.vue'
import ConexTabla from '../ConexTabla.vue'
import SalirModal from '../../../SalirModal.vue'

const API = 'http://127.0.0.1:8000'

const usuarios = [
    { id: 2, usuario: 'l.madero', nombres: 'Lehi', apellidos: 'Madero' },
    { id: 1, usuario: 'ana.garay02', nombres: 'Ana', apellidos: 'Garay' },
]

const conexion = (id, tipo, usuario = 'ana.garay02', nombre = 'Ana Garay') => ({
    id, user_id: 1, usuario, nombre, tipo, fecha: '2026-10-30T01:03:00',
})

const pagina = (items, total = items.length) => ({ total, pagina: 1, por_pagina: 10, items })

const montarVista = () => {
    const Vista = {
        setup() {
            const filtros = ref({})
            return () => h('div', [
                h(ConexFilt, { onFiltrar: (f) => { filtros.value = f } }),
                h(ConexTabla, { filtros: filtros.value }),
            ])
        },
    }
    cy.mount(Vista)
}

describe('Historial de conexiones', () => {
    beforeEach(() => {
        cy.viewport(1280, 900)
        cy.intercept('GET', `${API}/users/all`, usuarios).as('usuarios')
    })

    it('muestra las conexiones con su tipo y pagina el total', () => {
        cy.intercept('GET', `${API}/conexiones/all*`, pagina([conexion(2, 'Salida'), conexion(1, 'Entrada')], 23)).as('conexiones')
        montarVista()
        cy.wait('@conexiones').its('request.query').should('include', { pagina: '1', por_pagina: '10' })
        cy.get('[data-cy=conexion]').should('have.length', 2)
        cy.get('[data-cy=conexion]').first().within(() => {
            cy.contains('ana.garay02')
            cy.contains('Ana Garay')
            cy.get('.TipoBox.Salida').should('contain', 'Salida')
        })
        cy.get('.Paginacion').should('contain', '1–10 de 23 conexiones')

        cy.get('[data-cy=por-pagina]').select('25')
        cy.wait('@conexiones').its('request.query').should('include', { por_pagina: '25' })
    })

    it('filtra por usuario (con b\u00fasqueda) y por tipo', () => {
        cy.intercept('GET', `${API}/conexiones/all*`, pagina([])).as('conexiones')
        montarVista()
        cy.wait('@conexiones')
        cy.get('.empty-box').should('contain', 'No se encontraron conexiones')

        cy.get('[data-cy=filtro-usuario]').click()
        // ordenados por usuario
        cy.get('[data-cy=usuarios-opciones] .DropItem').eq(1).should('contain', 'ana.garay02')
        cy.get('[data-cy=buscar-usuario]').type('madero')
        cy.get('[data-cy=usuarios-opciones] .DropItem').should('have.length', 2)
        cy.contains('[data-cy=usuarios-opciones] .DropItem', 'l.madero').click()
        cy.wait('@conexiones').its('request.query').should('include', { usuario_id: '2' })
        cy.get('[data-cy=filtro-usuario]').should('contain', 'l.madero — Lehi Madero')

        cy.get('[data-cy=filtro-tipo]').click()
        cy.contains('.DropItem', 'Entrada').click()
        cy.wait('@conexiones').its('request.query').should('include', { usuario_id: '2', tipo: 'Entrada' })
    })

    it('por d\u00eda env\u00eda los l\u00edmites del d\u00eda local y deja de filtrar por usuario', () => {
        cy.intercept('GET', `${API}/conexiones/all*`, pagina([])).as('conexiones')
        montarVista()
        cy.wait('@conexiones')
        cy.get('[data-cy=modo-dia]').click()
        cy.wait('@conexiones').its('request.query').then((q) => {
            const hoy = new Date()
            expect(q).not.to.have.property('usuario_id')
            expect(q.desde).to.equal(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).toISOString())
            expect(q.hasta).to.equal(new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1).toISOString())
        })
        cy.get('[data-cy=filtro-dia]').should('not.have.value', '')
    })
})

describe('SalirModal', () => {
    const montarModal = () => {
        localStorage.setItem('user', JSON.stringify({ access_token: 'tok123', user: { usuario: 'ana.garay02' } }))
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [{ path: '/', component: { render: () => null } }],
        })
        cy.mount(SalirModal, { global: { plugins: [createPinia(), router] } })
    }

    it('registra la salida con el token antes de cerrar la sesi\u00f3n', () => {
        cy.intercept('POST', `${API}/conexiones/salida`, { id: 1, tipo: 'Salida' }).as('salida')
        montarModal()
        cy.contains('button', 'Salir').click()
        cy.wait('@salida').its('request.headers.authorization').should('equal', 'Bearer tok123')
        cy.wrap(null).should(() => expect(localStorage.getItem('user')).to.equal(null))
    })

    it('cierra la sesi\u00f3n aunque no se pueda registrar la salida', () => {
        cy.intercept('POST', `${API}/conexiones/salida`, { statusCode: 401, body: { detail: 'Token vencido' } }).as('salida')
        montarModal()
        cy.contains('button', 'Salir').click()
        cy.wait('@salida')
        cy.wrap(null).should(() => expect(localStorage.getItem('user')).to.equal(null))
    })
})
