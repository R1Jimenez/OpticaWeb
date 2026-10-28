// Mismas reglas que el backend (promociones_controller.py); el backend recalcula y es la fuente de verdad.

// producto: ProductOut ({ id, atributos_seleccionados: { atributo_id: valor_id } })
export function productoElegible(promocion, producto) {
    if (!promocion) return false
    if (promocion.productos?.length) return promocion.productos.some(p => p.id === producto?.id)
    if (promocion.atributos_valores?.length) {
        const valores = Object.values(producto?.atributos_seleccionados ?? {}).map(Number)
        return promocion.atributos_valores.some(v => valores.includes(v.id))
    }
    return true
}

// Acumulativa: se suma al descuento del tipo de cliente (tope 100). No acumulativa: se aplica el mayor.
export function porcentajeDescuento(pctCliente, promocion, elegible) {
    const cliente = Number(pctCliente) || 0
    if (!promocion || !elegible) return cliente
    const promo = Number(promocion.descuento) || 0
    return promocion.acumulativa ? Math.min(100, cliente + promo) : Math.max(cliente, promo)
}

export function porcentajeItem(pctCliente, promocion, producto) {
    return porcentajeDescuento(pctCliente, promocion, productoElegible(promocion, producto))
}

export function describirPromocion(p) {
    const partes = [`${Number(p.descuento)}%`, p.acumulativa ? 'acumulativa' : 'no acumulativa']
    if (p.productos?.length) partes.push(`${p.productos.length} producto(s)`)
    if (p.atributos_valores?.length) partes.push(p.atributos_valores.map(a => a.etiqueta).join(', '))
    return partes.join(' · ')
}
