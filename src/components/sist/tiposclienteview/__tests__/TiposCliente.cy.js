import TipCliTabla from '../TipCliTabla.vue'
import TipCliModal from '../TipCliModal.vue'
import TipCliFilt from '../TipCliFilt.vue'

const API = 'http://127.0.0.1:8000'

const tipos = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    cliente: `${10 + i}% DESC PROMO ${i + 1}`,
    porcentaje_descuento: 10 + i,
    clientes: i === 0 ? 3 : 0,
}))

describe('TipCliTabla', () => {
    beforeEach(() => cy.viewport(1280, 900))

    it('pagina de 15 en 15, busca sin acentos y ordena por nombre', () => {
        const lista = [...tipos, { id: 99, cliente: 'Público General', porcentaje_descuento: 0, clientes: 0 }]
        cy.mount(TipCliTabla, { props: { tipos: lista } }).then(({ wrapper }) => {
            cy.get('[data-cy=tipo-cliente]').should('have.length', 15)
            cy.get('.Paginacion').should('contain', '1–15 de 18 tipos de cliente')
            cy.get('.PagBtn').contains('2').click()
            cy.get('[data-cy=tipo-cliente]').should('have.length', 3)

            cy.then(() => wrapper.setProps({ busqueda: 'publico' }))
            cy.get('[data-cy=tipo-cliente]').should('have.length', 1).and('contain', 'Público General')
            cy.get('.DescBox.cero').should('contain', '0%')

            cy.then(() => wrapper.setProps({ busqueda: '' }))
            cy.get('[data-cy=ordenar-nombre]').click()
            cy.get('[data-cy=tipo-cliente]').first().should('contain', 'Público General')
        })
    })

    it('no permite eliminar un tipo con clientes asignados', () => {
        const onEliminar = cy.spy().as('eliminar')
        const onModificar = cy.spy().as('modificar')
        cy.mount(TipCliTabla, { props: { tipos: tipos.slice(0, 2), onEliminar, onModificar } })
        cy.get('[data-cy=tipo-cliente]').eq(0).find('[data-cy=eliminar-tipo]')
            .should('be.disabled').and('have.attr', 'title', 'Asignado a 3 cliente(s)')
        cy.get('[data-cy=tipo-cliente]').eq(1).find('[data-cy=eliminar-tipo]').click()
        cy.get('@eliminar').should('have.been.calledWithMatch', { id: 2 })
        cy.get('[data-cy=tipo-cliente]').eq(0).find('[data-cy=modificar-tipo]').click()
        cy.get('@modificar').should('have.been.calledWithMatch', { id: 1 })
    })
})

describe('TipCliModal', () => {
    beforeEach(() => cy.viewport(1280, 900))

    it('valida y crea un tipo nuevo', () => {
        cy.intercept('POST', `${API}/tipo_cliente/create`, { id: 50, cliente: 'Mayoreo', porcentaje_descuento: 12 }).as('crear')
        const onGuardado = cy.spy().as('guardado')
        cy.mount(TipCliModal, { props: { onGuardado } })
        cy.contains('Nuevo Tipo de Cliente')
        cy.get('[data-cy=tipo-porcentaje]').clear().type('150')
        cy.get('[data-cy=tipo-confirmar]').click()
        cy.contains('Ingresa el nombre del tipo de cliente')
        cy.contains('Ingresa un porcentaje entero entre 0 y 100')

        cy.get('[data-cy=tipo-nombre]').type('  Mayoreo  ')
        cy.get('[data-cy=tipo-porcentaje]').clear().type('12{enter}')
        cy.wait('@crear').its('request.body').should('deep.equal', { cliente: 'Mayoreo', porcentaje_descuento: 12 })
        cy.get('@guardado').should('have.been.calledWithMatch', { id: 50 })
    })

    it('modifica y muestra el error del servidor', () => {
        cy.intercept('POST', `${API}/tipo_cliente/update/7`, { statusCode: 400, body: { detail: 'Este tipo de cliente ya existe' } }).as('actualizar')
        cy.mount(TipCliModal, { props: { tipo: { id: 7, cliente: 'Frecuente', porcentaje_descuento: 10 } } })
        cy.contains('Modificar Tipo de Cliente')
        cy.get('[data-cy=tipo-nombre]').should('have.value', 'Frecuente').clear().type('Mayoreo')
        cy.get('[data-cy=tipo-confirmar]').click()
        cy.wait('@actualizar')
        cy.get('[data-cy=tipo-error]').should('have.text', 'Este tipo de cliente ya existe')
    })

    it('pide confirmación para eliminar y muestra por qué no se pudo', () => {
        cy.intercept('DELETE', `${API}/tipo_cliente/delete/7`, {
            statusCode: 400, body: { detail: 'No se puede eliminar: está asignado a 1 promoción(es) activa(s)' },
        }).as('eliminar')
        cy.mount(TipCliModal, { props: { tipo: { id: 7, cliente: 'Frecuente', porcentaje_descuento: 10 }, eliminar: true } })
        cy.contains('¿Deseas eliminar el tipo de cliente')
        cy.get('[data-cy=tipo-confirmar]').should('contain', 'Eliminar').click()
        cy.wait('@eliminar')
        cy.get('[data-cy=tipo-error]').should('contain', 'promoción(es) activa(s)')
    })
})

describe('TipCliFilt', () => {
    it('emite la búsqueda y el alta', () => {
        const onAgregar = cy.spy().as('agregar')
        const onBusqueda = cy.spy().as('busqueda')
        cy.mount(TipCliFilt, { props: { busqueda: '', onAgregar, 'onUpdate:busqueda': onBusqueda } })
        cy.get('[data-cy=buscar-tipo]').type('m')
        cy.get('@busqueda').should('have.been.calledWith', 'm')
        cy.get('[data-cy=agregar-tipo]').click()
        cy.get('@agregar').should('have.been.calledOnce')
    })
})
