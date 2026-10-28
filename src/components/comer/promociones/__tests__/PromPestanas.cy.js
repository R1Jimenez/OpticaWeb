import 'v-calendar/style.css'
import { createPinia, setActivePinia } from 'pinia'
import PromConEdits from '../PromConEdits.vue'
import { usePromocionStore } from '../../../../stores/promocion'

const API = 'http://127.0.0.1:8000'

const montar = () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    cy.mount(PromConEdits, { global: { plugins: [pinia] } })
    return usePromocionStore()
}

const pestana = (nombre) => cy.contains('.OpButton', nombre).click()

describe('Promociones - pestañas Tipo de Venta, Producto y Cliente', () => {
    beforeEach(() => {
        cy.viewport(1400, 900)
        cy.intercept('GET', `${API}/sucursales/all`, [{ id: 1, sucursal: 'Almacen Central' }]).as('sucursales')
        cy.intercept('GET', `${API}/tipo_venta/all`, [{ id: 1, venta: 'Contado' }, { id: 2, venta: 'Credito' }])
        cy.intercept('GET', `${API}/plazos/all`, [{ id: 7, plazo: '4 semanas', tipo_venta_id: 2 }])
        cy.intercept('GET', `${API}/productos/buscar*`, [{ id: 36, codigo: '0100030000200001001', nombre: 'ARMAZON PRUEBA', codigo_externo: 'codigo1' }]).as('buscarProducto')
        cy.intercept('GET', `${API}/atributos/all`, [{ id: 1, atributo: 'Marca', longitud: 2 }])
        cy.intercept('GET', `${API}/atributosvalores/all`, [{ id: 10, atributo_id: 1, clave: '01', descripcion: 'RayBan' }, { id: 11, atributo_id: 1, clave: '02', descripcion: 'Oakley' }])
        cy.intercept('GET', `${API}/cliente/search*`, [{ id: 4, nombres: 'Antonio', apellidos: 'Doe' }]).as('buscarCliente')
        cy.intercept('GET', `${API}/tipo_cliente/all`, [{ id: 3, cliente: 'Frecuente', porcentaje_descuento: 10 }])
    })

    it('Tipo de Venta: agrega tipos y al cambiar a Por Plazo descarta la selección previa', () => {
        const promo = montar()
        pestana('Tipo de Venta')
        cy.contains('[data-cy=venta-disponibles] .ListaItem', 'Credito').dblclick()
        cy.get('[data-cy=venta-aplica] .ListaItem').should('have.length', 1).and('contain', 'Credito')

        cy.on('window:confirm', () => true)
        cy.get('[data-cy=criterio-plazos]').click()
        cy.get('[data-cy=criterio-plazos]').should('be.checked')
        cy.get('[data-cy=venta-aplica]').should('contain', 'aplica a todos los plazos')
        cy.contains('[data-cy=venta-disponibles] .ListaItem', '4 semanas (Credito)').click()
        cy.get('[data-cy=venta-agregar]').click()
        cy.then(() => {
            expect(promo.condiciones.tipos_venta).to.deep.equal([])
            expect(promo.condiciones.plazos.map(p => p.id)).to.deep.equal([7])
        })
    })

    it('Producto: busca, agrega y elimina; por atributo filtra el catálogo de valores', () => {
        const promo = montar()
        pestana('Producto')
        cy.get('[data-cy=buscador-input]').type('codigo1')
        cy.wait('@buscarProducto').its('request.url').should('include', 'q=codigo1')
        cy.contains('[data-cy=buscador-resultados] .BusItem', 'ARMAZON PRUEBA').click()
        cy.get('[data-cy=buscador-agregar]').click()
        cy.get('[data-cy=buscador-lista] .AplicaItem').should('have.length', 1).and('contain', '0100030000200001001')

        cy.get('[data-cy=buscador-lista] .AplicaItem').first().click()
        cy.get('[data-cy=buscador-eliminar]').click()
        cy.get('[data-cy=buscador-lista]').should('contain', 'aplica a todos los productos')

        cy.get('[data-cy=criterio-atributos_valores]').click()
        cy.get('[data-cy=buscador-input]').type('ray')
        cy.get('[data-cy=buscador-resultados] .BusItem').should('have.length', 1).and('contain', 'Marca: RayBan')
        cy.get('[data-cy=buscador-resultados] .BusItem').click()
        cy.get('[data-cy=buscador-agregar]').click()
        cy.then(() => expect(promo.condiciones.atributos_valores).to.deep.equal([{ id: 10, etiqueta: 'Marca: RayBan' }]))
    })

    it('Cliente: cancelar el cambio de criterio conserva lo capturado', () => {
        const promo = montar()
        pestana('Cliente')
        cy.get('[data-cy=buscador-input]').type('Antonio')
        cy.wait('@buscarCliente')
        cy.contains('[data-cy=buscador-resultados] .BusItem', 'Antonio Doe').click()
        cy.get('[data-cy=buscador-agregar]').click()

        cy.on('window:confirm', () => false)
        cy.get('[data-cy=criterio-tipos_cliente]').click()
        cy.get('[data-cy=criterio-clientes]').should('be.checked')
        cy.get('[data-cy=buscador-lista] .AplicaItem').should('contain', 'Antonio Doe')
        cy.then(() => expect(promo.condiciones.clientes.map(c => c.id)).to.deep.equal([4]))
    })

    it('las condiciones de todas las pestañas viajan en el mismo payload', () => {
        cy.intercept('POST', `${API}/promociones/create`, { statusCode: 400, body: { detail: 'detenido por la prueba' } }).as('crear')
        const promo = montar()
        cy.wait('@sucursales')
        cy.then(() => {
            promo.nombre = 'Combo'
            promo.descuento = 10
            promo.permanente = true
            promo.sucursalesIds = [1]
            promo.agregarCondicion('tipos_venta', { id: 2, etiqueta: 'Credito' })
            promo.cambiarCriterio('producto', 'atributos_valores')
            promo.agregarCondicion('atributos_valores', { id: 10, etiqueta: 'Marca: RayBan' })
            promo.cambiarCriterio('cliente', 'tipos_cliente')
            promo.agregarCondicion('tipos_cliente', { id: 3, etiqueta: 'Frecuente' })
        })
        cy.get('[data-cy=promo-guardar]').click()
        cy.wait('@crear').its('request.body').should('include.all.keys', 'tipos_venta', 'atributos_valores', 'tipos_cliente')
            .and((body) => {
                expect(body.tipos_venta).to.deep.equal([2])
                expect(body.atributos_valores).to.deep.equal([10])
                expect(body.tipos_cliente).to.deep.equal([3])
                expect(body.productos).to.deep.equal([])
            })
        // un error del servidor no limpia lo capturado
        cy.get('[data-cy=promo-aviso]').should('contain', 'detenido por la prueba')
        cy.then(() => expect(promo.nombre).to.equal('Combo'))
    })
})
