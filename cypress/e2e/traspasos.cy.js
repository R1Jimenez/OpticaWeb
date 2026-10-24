// Prueba end to end contra el backend real: crea, envía y recibe un traspaso y verifica el inventario.
// Requiere backend en http://127.0.0.1:8000 y la variable CYPRESS_AUTH_USER con la respuesta de /users/login (JSON).

const API = 'http://127.0.0.1:8000'
const ORIGEN = { id: 1, nombre: 'Almacen Central' }
const DESTINO = 'Smart La Cuesta'
const CODIGO_EXTERNO = 'codigo1'
const CANTIDAD = 2

const auth = () => {
    const valor = Cypress.env('AUTH_USER')
    if (!valor) throw new Error('Defina CYPRESS_AUTH_USER con la respuesta JSON de /users/login')
    return typeof valor === 'string' ? JSON.parse(valor) : valor
}

const api = (url, opciones = {}) => cy.request({
    url: `${API}${url}`,
    headers: { Authorization: `Bearer ${auth().access_token}` },
    failOnStatusCode: false,
    ...opciones,
})

const existencia = (sucursalId, productoId) =>
    api(`/inventario/sucursal/${sucursalId}/${productoId}`).then(r => (r.status === 200 ? r.body.existencia_actual : 0))

const visitarTraspasos = () => cy.visit('/Traspasos', {
    onBeforeLoad(win) {
        win.localStorage.setItem('user', JSON.stringify(auth()))
        win.localStorage.setItem('sucursalSeleccionada', JSON.stringify(ORIGEN))
    },
})

describe('Traspasos de mercancía', () => {
    let producto
    let destinoId
    let existenciaOrigenInicial
    let existenciaDestinoInicial

    before(() => {
        api(`/inventario/sucursal/${ORIGEN.id}/buscar?q=${CODIGO_EXTERNO}`).then(r => {
            expect(r.status).to.eq(200)
            producto = r.body.find(p => p.codigo_externo === CODIGO_EXTERNO)
            expect(producto, 'producto de prueba con existencia en el origen').to.exist
            expect(producto.existencia_actual).to.be.gte(CANTIDAD)
            existenciaOrigenInicial = producto.existencia_actual
        })
        api('/sucursales/all').then(r => {
            destinoId = r.body.find(s => s.sucursal === DESTINO).id
        }).then(() => existencia(destinoId, producto.producto_id)).then(e => {
            existenciaDestinoInicial = e
        })
    })

    it('crea, envía y recibe un traspaso actualizando el inventario de ambas sucursales', () => {
        // error interno de v-calendar al cerrar su popover (no afecta la UI); cualquier otro error sí falla la prueba
        cy.on('uncaught:exception', (err) => !err.message.includes('dayIndex'))
        cy.viewport(1600, 1000)
        visitarTraspasos()

        cy.get('[data-cy=nuevo-traspaso]').click()
        cy.get('[data-cy=modal-traspaso]').should('be.visible')
        cy.get('[data-cy=estatus]').should('have.text', 'Nuevo')
        cy.get('[data-cy=origen]').should('contain', ORIGEN.nombre)

        cy.get('[data-cy=comentarios]').type('Traspaso de muestra generado por la prueba end to end')
        cy.get('[data-cy=destino]').click()
        cy.contains('.DropItem', DESTINO).click()

        // promesa de entrega: dentro de 7 días
        const promesa = new Date()
        promesa.setDate(promesa.getDate() + 7)
        const idDia = `id-${promesa.getFullYear()}-${String(promesa.getMonth() + 1).padStart(2, '0')}-${String(promesa.getDate()).padStart(2, '0')}`
        cy.get('[data-cy=promesa]').click()
        if (promesa.getMonth() !== new Date().getMonth()) cy.get('.vc-next').first().click()
        cy.get(`.vc-day.${idDia} .vc-day-content`).first().click()

        // búsqueda por código externo y validación de existencia
        cy.get('[data-cy=buscar-producto]').type(CODIGO_EXTERNO)
        cy.get('[data-cy=resultados-producto]').should('contain', producto.nombre)
        cy.contains('[data-cy=resultados-producto] .DropItem', producto.codigo).click()
        cy.get('[data-cy=cantidad-producto]').type(String(existenciaOrigenInicial + 1))
        cy.get('[data-cy=agregar-producto]').click()
        cy.get('[data-cy=error-producto]').should('contain', `Solo hay ${existenciaOrigenInicial} unidades`)

        cy.get('[data-cy=cantidad-producto]').clear().type(String(CANTIDAD))
        cy.get('[data-cy=agregar-producto]').click()
        cy.get('[data-cy=tabla-productos] tbody tr').should('have.length', 1).and('contain', producto.codigo)

        cy.intercept('POST', `${API}/traspasos/create`).as('crear')
        cy.intercept('POST', `${API}/traspasos/*/enviar`).as('enviar')
        cy.get('[data-cy=guardar-enviar-traspaso]').scrollIntoView().click()
        cy.wait('@crear').its('response.statusCode').should('eq', 200)
        cy.wait('@enviar').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body.estatus).to.eq('Enviado')
            cy.wrap(response.body.id).as('traspasoId')
        })
        cy.get('[data-cy=modal-traspaso]').should('not.exist')

        cy.get('@traspasoId').then(id => {
            cy.get(`[data-cy=traspaso-${id}]`).should('contain', 'Enviado').and('contain', ORIGEN.nombre).and('contain', DESTINO)
            existencia(ORIGEN.id, producto.producto_id).should('eq', existenciaOrigenInicial - CANTIDAD)

            // recibir desde el modal de edición
            cy.get(`[data-cy=traspaso-${id}] [data-cy=editar-traspaso]`).click()
            cy.get('[data-cy=estatus]').should('have.text', 'Enviado')
            cy.get('[data-cy=buscar-producto]').should('not.exist')
            cy.get('[data-cy=recibir-traspaso]').scrollIntoView().click()
            cy.get('[data-cy=modal-traspaso]').should('not.exist')
            cy.get(`[data-cy=traspaso-${id}]`).should('contain', 'Recibido')
            existencia(destinoId, producto.producto_id).should('eq', existenciaDestinoInicial + CANTIDAD)

            // detalle
            cy.get(`[data-cy=traspaso-${id}] [data-cy=ver-traspaso]`).click()
            cy.get('[data-cy=detalle-traspaso]').within(() => {
                cy.get('[data-cy=detalle-estatus]').should('have.text', 'Recibido')
                cy.contains('td', producto.codigo).parent('tr').within(() => {
                    cy.get('td').eq(6).should('have.text', String(CANTIDAD))
                    cy.get('td').eq(7).should('have.text', String(CANTIDAD))
                    cy.get('td').eq(8).should('have.text', String(CANTIDAD))
                })
            })
            cy.get('[data-cy=detalle-traspaso]').click('topLeft')
            cy.get('[data-cy=detalle-traspaso]').should('not.exist')

            // filtro por estatus
            cy.get('[data-cy=filtro-estatus]').click()
            cy.contains('.DropItem', 'Recibido').click()
            cy.get(`[data-cy=traspaso-${id}]`).should('exist')
            cy.get('[data-cy=filtro-estatus]').click()
            cy.contains('.DropItem', 'Cancelado').click()
            cy.get(`[data-cy=traspaso-${id}]`).should('not.exist')

            // los movimientos de inventario quedan referenciados al traspaso
            api(`/inventario/movimientos?referencia=Traspaso%20${id}`).its('body.items').then(items => {
                const propios = items.filter(m => m.referencia === `Traspaso ${id}`)
                expect(propios.map(m => m.tipo).sort()).to.deep.eq(['Entrada por Traspaso', 'Salida por Traspaso'])
            })
        })
    })

    it('impide traspasar a la misma sucursal y rechaza cantidades mayores a la existencia en el backend', () => {
        api('/traspasos/create', {
            method: 'POST',
            body: { sucursal_origen_id: ORIGEN.id, sucursal_destino_id: ORIGEN.id, productos: [{ producto_id: producto.producto_id, cantidad: 1 }] },
        }).its('status').should('eq', 400)

        api('/traspasos/create', {
            method: 'POST',
            body: { sucursal_origen_id: ORIGEN.id, sucursal_destino_id: destinoId, productos: [{ producto_id: producto.producto_id, cantidad: 100000 }] },
        }).then(r => {
            expect(r.status).to.eq(400)
            expect(r.body.detail).to.contain('en existencia')
        })
    })
})
