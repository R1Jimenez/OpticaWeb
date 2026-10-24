// Reglas de captura de traspasos (sin acceso a API). El backend vuelve a validar todo.

export const ESTATUS_DESCRIPCION = {
    Nuevo: 'Pendiente de enviar',
    Enviado: 'En tránsito hacia la sucursal destino',
    Recibido: 'Recibido en la sucursal destino',
    Cancelado: 'El traspaso fue cancelado',
}

const entero = (valor) => (/^\d+$/.test(String(valor ?? '').trim()) ? Number(valor) : NaN)

export function cantidadValida(item) {
    const cantidad = entero(item.cantidad)
    return Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= item.existencia
}

/**
 * Agrega un producto (resultado de la búsqueda) a la lista; si ya existe suma la cantidad.
 * Devuelve { items, error } sin modificar la lista original.
 */
export function agregarProducto(items, producto, cantidadCapturada) {
    if (!producto) return { items, error: 'Seleccione un producto' }

    const cantidad = entero(cantidadCapturada)
    if (!Number.isInteger(cantidad) || cantidad < 1) {
        return { items, error: 'La cantidad debe ser un número entero mayor a 0' }
    }

    const existente = items.find(i => i.producto_id === producto.producto_id)
    const total = cantidad + (existente ? entero(existente.cantidad) || 0 : 0)
    if (total > producto.existencia_actual) {
        return {
            items,
            error: `Solo hay ${producto.existencia_actual} unidades de ${producto.nombre} en la sucursal de origen`,
        }
    }

    if (existente) {
        return { items: items.map(i => (i === existente ? { ...i, cantidad: total } : i)), error: null }
    }

    return {
        items: [...items, {
            producto_id: producto.producto_id,
            codigo: producto.codigo,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo_externo: producto.codigo_externo,
            punto_reorden: producto.punto_reorden,
            existencia: producto.existencia_actual,
            cantidad,
        }],
        error: null,
    }
}

export function validarTraspaso({ origenId, destinoId, items }) {
    const errores = []
    if (!origenId) errores.push('Seleccione la sucursal de origen')
    if (!destinoId) errores.push('Seleccione la sucursal destino')
    if (origenId && destinoId && origenId === destinoId) errores.push('El origen y el destino deben ser diferentes')
    if (!items.length) errores.push('Agregue al menos un producto')
    const invalidos = items.filter(i => !cantidadValida(i))
    if (invalidos.length) {
        errores.push(`Cantidad inválida para: ${invalidos.map(i => i.nombre).join(', ')}`)
    }
    return errores
}
