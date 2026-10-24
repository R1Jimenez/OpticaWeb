import { agregarProducto, cantidadValida, validarTraspaso } from '../traspasos'

const armazon = {
    producto_id: 36,
    codigo: '0100030000200001001',
    nombre: 'ARMAZON PRUEBA',
    descripcion: 'Descripcion',
    codigo_externo: 'codigo1',
    punto_reorden: 2,
    existencia_actual: 5,
}

describe('utils/traspasos', () => {
    context('agregarProducto', () => {
        it('agrega un producto nuevo con su existencia', () => {
            const { items, error } = agregarProducto([], armazon, '3')
            expect(error).to.equal(null)
            expect(items).to.have.length(1)
            expect(items[0]).to.include({ producto_id: 36, cantidad: 3, existencia: 5, codigo_externo: 'codigo1' })
        })

        it('suma la cantidad si el producto ya estaba en la lista', () => {
            const inicial = agregarProducto([], armazon, 2).items
            const { items, error } = agregarProducto(inicial, armazon, 3)
            expect(error).to.equal(null)
            expect(items).to.have.length(1)
            expect(items[0].cantidad).to.equal(5)
        })

        it('no permite superar la existencia del origen (sumando lo ya capturado)', () => {
            const inicial = agregarProducto([], armazon, 4).items
            const { items, error } = agregarProducto(inicial, armazon, 2)
            expect(error).to.contain('Solo hay 5 unidades')
            expect(items).to.equal(inicial)
        })

        it('rechaza cantidades no enteras, cero o negativas', () => {
            ;['0', '-1', '1.5', 'abc', ''].forEach(valor => {
                expect(agregarProducto([], armazon, valor).error, `valor "${valor}"`).to.contain('entero mayor a 0')
            })
        })

        it('exige seleccionar un producto', () => {
            expect(agregarProducto([], null, 1).error).to.equal('Seleccione un producto')
        })

        it('no modifica la lista original', () => {
            const inicial = agregarProducto([], armazon, 1).items
            const copia = JSON.stringify(inicial)
            agregarProducto(inicial, armazon, 1)
            expect(JSON.stringify(inicial)).to.equal(copia)
        })
    })

    context('cantidadValida', () => {
        it('acepta valores entre 1 y la existencia', () => {
            expect(cantidadValida({ cantidad: 1, existencia: 5 })).to.equal(true)
            expect(cantidadValida({ cantidad: '5', existencia: 5 })).to.equal(true)
        })

        it('rechaza valores fuera de rango o no enteros', () => {
            expect(cantidadValida({ cantidad: 6, existencia: 5 })).to.equal(false)
            expect(cantidadValida({ cantidad: 0, existencia: 5 })).to.equal(false)
            expect(cantidadValida({ cantidad: '2.5', existencia: 5 })).to.equal(false)
        })
    })

    context('validarTraspaso', () => {
        const item = { nombre: 'ARMAZON PRUEBA', cantidad: 1, existencia: 5 }

        it('sin errores cuando todo es valido', () => {
            expect(validarTraspaso({ origenId: 1, destinoId: 2, items: [item] })).to.deep.equal([])
        })

        it('reporta origen, destino y productos faltantes', () => {
            const errores = validarTraspaso({ origenId: null, destinoId: null, items: [] })
            expect(errores).to.have.length(3)
        })

        it('origen y destino iguales', () => {
            expect(validarTraspaso({ origenId: 1, destinoId: 1, items: [item] }))
                .to.deep.equal(['El origen y el destino deben ser diferentes'])
        })

        it('cantidad mayor a la existencia', () => {
            const errores = validarTraspaso({ origenId: 1, destinoId: 2, items: [{ ...item, cantidad: 9 }] })
            expect(errores[0]).to.contain('ARMAZON PRUEBA')
        })
    })
})
