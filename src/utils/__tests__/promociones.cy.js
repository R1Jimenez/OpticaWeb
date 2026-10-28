import { productoElegible, porcentajeDescuento, porcentajeItem, describirPromocion } from '../promociones'

const producto = { id: 5, atributos_seleccionados: { 1: 10, 2: 20 } }

describe('utils/promociones', () => {
    it('sin condiciones de producto aplica a todos', () => {
        expect(productoElegible({ productos: [], atributos_valores: [] }, producto)).to.equal(true)
    })

    it('por producto especifico', () => {
        expect(productoElegible({ productos: [{ id: 5 }] }, producto)).to.equal(true)
        expect(productoElegible({ productos: [{ id: 6 }] }, producto)).to.equal(false)
    })

    it('por atributo: basta con tener uno de los valores', () => {
        expect(productoElegible({ productos: [], atributos_valores: [{ id: 20 }, { id: 99 }] }, producto)).to.equal(true)
        expect(productoElegible({ productos: [], atributos_valores: [{ id: 99 }] }, producto)).to.equal(false)
    })

    it('sin promocion no hay elegibilidad', () => {
        expect(productoElegible(null, producto)).to.equal(false)
    })

    it('acumulativa suma con tope 100; no acumulativa toma el mayor', () => {
        expect(porcentajeDescuento(10, { descuento: '20', acumulativa: true }, true)).to.equal(30)
        expect(porcentajeDescuento(90, { descuento: '20', acumulativa: true }, true)).to.equal(100)
        expect(porcentajeDescuento(10, { descuento: '20', acumulativa: false }, true)).to.equal(20)
        expect(porcentajeDescuento(25, { descuento: '20', acumulativa: false }, true)).to.equal(25)
        expect(porcentajeDescuento(10, { descuento: '20', acumulativa: true }, false)).to.equal(10)
        expect(porcentajeDescuento(10, null, true)).to.equal(10)
    })

    it('porcentajeItem combina elegibilidad y regla', () => {
        const promo = { descuento: '15', acumulativa: false, productos: [{ id: 6 }], atributos_valores: [] }
        expect(porcentajeItem(10, promo, producto)).to.equal(10)
        expect(porcentajeItem(10, promo, { id: 6 })).to.equal(15)
    })

    it('describe la promocion', () => {
        expect(describirPromocion({ descuento: '15.00', acumulativa: true, productos: [{ id: 1 }, { id: 2 }], atributos_valores: [] }))
            .to.equal('15% · acumulativa · 2 producto(s)')
    })
})
