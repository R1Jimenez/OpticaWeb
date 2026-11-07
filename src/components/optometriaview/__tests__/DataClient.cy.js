import DataClient from '../DataClient.vue'

const API = 'http://127.0.0.1:8000'

const tipos = [
    { id: 1, cliente: 'Público General', porcentaje_descuento: 0 },
    { id: 3, cliente: 'Frecuente', porcentaje_descuento: 10 },
]

const cliente = {
    id: 40, nombres: 'Ana', apellidos: 'Garay', rfc: 'XAXX010101000', email: 'ana@example.com', telefono: '1',
    contacto: '-', calle: '-', numero: '-', colonia: '-', ciudad: '-', estado: '-', codigopostal: '0', tipocliente: 1,
}

describe('DataClient - tipo de cliente', () => {
    beforeEach(() => {
        cy.viewport(1280, 700)
        cy.intercept('GET', `${API}/tipo_cliente/all`, tipos).as('tipos')
    })

    it('al crear propone el tipo predeterminado y env\u00eda el elegido', () => {
        cy.intercept('POST', `${API}/cliente/create`, (req) => req.reply({ ...cliente, ...req.body, id: 41 })).as('crear')
        cy.mount(DataClient)
        cy.wait('@tipos')
        cy.get('[data-cy=cliente-tipo]').should('have.value', '1').and('not.be.disabled')
        cy.get('[data-cy=cliente-tipo] option').should('contain', 'Frecuente (10%)')

        cy.contains('label', 'Nombres').next('input').type('Luis')
        cy.contains('label', 'Apellidos').next('input').type('Perez')
        cy.get('[data-cy=cliente-tipo]').select('Frecuente (10%)')
        cy.contains('button', 'Agregar').click()
        cy.wait('@crear').its('request.body.tipocliente').should('equal', 3)
    })

    it('muestra el tipo del cliente bloqueado y permite cambiarlo al modificar', () => {
        cy.intercept('POST', `${API}/cliente/update/40`, (req) => req.reply({ ...cliente, ...req.body })).as('actualizar')
        const onClienteActualizado = cy.spy().as('actualizado')
        cy.mount(DataClient, { props: { cliente, onClienteActualizado } })
        cy.wait('@tipos')
        cy.get('[data-cy=cliente-tipo]').should('be.disabled').and('have.value', '1')

        cy.contains('button', 'Modificar').click()
        cy.get('[data-cy=cliente-tipo]').should('not.be.disabled').select('Frecuente (10%)')
        cy.contains('button', 'Guardar').click()
        cy.wait('@actualizar').its('request.body.tipocliente').should('equal', 3)
        cy.get('@actualizado').should('have.been.calledWithMatch', { tipocliente: 3 })
    })

    it('cancelar la edici\u00f3n restaura el tipo original', () => {
        cy.mount(DataClient, { props: { cliente: { ...cliente, tipocliente: 3 } } })
        cy.wait('@tipos')
        cy.contains('button', 'Modificar').click()
        cy.get('[data-cy=cliente-tipo]').select('Público General (0%)')
        cy.contains('button', 'Cancelar').click()
        cy.get('[data-cy=cliente-tipo]').should('have.value', '3').and('be.disabled')
    })
})
