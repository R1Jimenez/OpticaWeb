import { createPinia, setActivePinia } from 'pinia'
import TraspCreate from '../TraspCreate.vue'
import { useSucursalStore } from '../../../../stores/sucursal'

const API = 'http://127.0.0.1:8000'

const sucursales = [
    { id: 1, sucursal: 'Almacen Central' },
    { id: 2, sucursal: 'Jilotepec' },
    { id: 7, sucursal: 'Smart La Cuesta' },
]

const producto = {
    producto_id: 36,
    codigo: '0100030000200001001',
    nombre: 'ARMAZON PRUEBA',
    descripcion: 'Descripcion prueba',
    codigo_externo: 'codigo1',
    existencia_actual: 3,
    punto_reorden: 1,
}

const montar = (props = {}) => {
    const pinia = createPinia()
    setActivePinia(pinia)
    useSucursalStore().sucursalSeleccionada = { id: 1, nombre: 'Almacen Central' }
    const onGuardado = cy.spy().as('guardado')
    const onCerrar = cy.spy().as('cerrar')
    cy.mount(TraspCreate, {
        props: { ...props, onGuardado, onCerrar },
        global: { plugins: [pinia] },
    })
}

describe('TraspCreate', () => {
    beforeEach(() => {
        cy.viewport(1280, 900)
        cy.intercept('GET', `${API}/sucursales/all`, sucursales).as('sucursales')
        cy.intercept('GET', `${API}/inventario/sucursal/1/buscar*`, [producto]).as('buscar')
    })

    it('preselecciona como origen la sucursal activa y excluye el origen de los destinos', () => {
        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=estatus]').should('have.text', 'Nuevo')
        cy.get('[data-cy=origen]').should('contain', 'Almacen Central')
        cy.get('[data-cy=destino]').click()
        cy.get('.DropItem').should('have.length', 2).and('not.contain', 'Almacen Central')
    })

    it('busca productos en el origen y no deja agregar mas que la existencia', () => {
        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=buscar-producto]').type('codigo1')
        cy.wait('@buscar').its('request.url').should('include', 'q=codigo1')
        cy.get('[data-cy=resultados-producto]').should('contain', 'ARMAZON PRUEBA').and('contain', 'Exist: 3')
        cy.contains('.DropItem', 'ARMAZON PRUEBA').click()

        cy.get('[data-cy=cantidad-producto]').type('4')
        cy.get('[data-cy=agregar-producto]').click()
        cy.get('[data-cy=error-producto]').should('contain', 'Solo hay 3 unidades')
        cy.get('[data-cy=tabla-productos]').should('not.exist')

        cy.get('[data-cy=cantidad-producto]').clear().type('2')
        cy.get('[data-cy=agregar-producto]').click()
        cy.get('[data-cy=tabla-productos] tbody tr').should('have.length', 1)
            .and('contain', '0100030000200001001')
            .and('contain', 'codigo1')
    })

    it('valida destino antes de guardar', () => {
        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=guardar-traspaso]').click()
        cy.get('[data-cy=error-traspaso]')
            .should('contain', 'Seleccione la sucursal destino')
            .and('contain', 'Agregue al menos un producto')
        cy.get('@guardado').should('not.have.been.called')
    })

    it('guarda y envia el traspaso con el payload esperado', () => {
        cy.intercept('POST', `${API}/traspasos/create`, { id: 99, estatus: 'Nuevo' }).as('crear')
        cy.intercept('POST', `${API}/traspasos/99/enviar`, { id: 99, estatus: 'Enviado' }).as('enviar')
        cy.on('window:confirm', () => true)

        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=comentarios]').type('Reabasto de exhibicion')
        cy.get('[data-cy=destino]').click()
        cy.contains('.DropItem', 'Smart La Cuesta').click()
        cy.get('[data-cy=buscar-producto]').type('ARMAZON')
        cy.wait('@buscar')
        cy.contains('.DropItem', 'ARMAZON PRUEBA').click()
        cy.get('[data-cy=cantidad-producto]').type('2{enter}')

        cy.get('[data-cy=guardar-enviar-traspaso]').click()
        cy.wait('@crear').its('request.body').should('deep.equal', {
            comentarios: 'Reabasto de exhibicion',
            sucursal_origen_id: 1,
            sucursal_destino_id: 7,
            promesa_entrega: null,
            productos: [{ producto_id: 36, cantidad: 2 }],
        })
        cy.wait('@enviar')
        cy.get('@guardado').should('have.been.calledOnce')
        cy.get('@cerrar').should('have.been.calledOnce')
    })

    it('muestra un traspaso enviado en solo lectura con la accion Recibir', () => {
        cy.intercept('GET', `${API}/traspasos/5`, {
            id: 5, estatus: 'Enviado', comentarios: 'x', origen: 'Almacen Central', destino: 'Jilotepec',
            sucursal_origen_id: 1, sucursal_destino_id: 2, promesa_entrega: '2026-11-02T00:00:00',
            creado_por: 'u', fecha_creacion: '2026-10-24T10:00:00', modificado_por: 'u', fecha_modificacion: '2026-10-24T10:00:00',
            detalles: [{ ...producto, existencia_origen: 1, cantidad_solicitada: 2, cantidad_enviada: 2, cantidad_recibida: null }],
        }).as('traspaso')

        montar({ traspasoId: 5 })
        cy.wait('@traspaso')
        cy.get('[data-cy=estatus]').should('have.text', 'Enviado')
        cy.get('[data-cy=comentarios]').should('be.disabled')
        cy.get('[data-cy=buscar-producto]').should('not.exist')
        cy.get('[data-cy=guardar-traspaso]').should('not.exist')
        cy.get('[data-cy=recibir-traspaso]').scrollIntoView().should('be.visible')
        cy.get('[data-cy=cancelar-traspaso]').scrollIntoView().should('be.visible')
        cy.get('[data-cy=promesa]').should('have.value', '02/11/2026')
    })

    it('muestra el error del servidor sin cerrar el modal', () => {
        cy.intercept('POST', `${API}/traspasos/create`, { statusCode: 400, body: { detail: 'ARMAZON PRUEBA: se solicitan 2 y solo hay 1 en existencia' } }).as('crear')

        montar()
        cy.wait('@sucursales')
        cy.get('[data-cy=destino]').click()
        cy.contains('.DropItem', 'Jilotepec').click()
        cy.get('[data-cy=buscar-producto]').type('ARMAZON')
        cy.wait('@buscar')
        cy.contains('.DropItem', 'ARMAZON PRUEBA').click()
        cy.get('[data-cy=cantidad-producto]').type('2{enter}')
        cy.get('[data-cy=guardar-traspaso]').click()

        cy.wait('@crear')
        cy.get('[data-cy=error-traspaso]').should('contain', 'solo hay 1 en existencia')
        cy.get('@cerrar').should('not.have.been.called')
    })
})
