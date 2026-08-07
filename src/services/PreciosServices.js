const API_BASE = 'http://127.0.0.1:8000'

async function handleResponse(response, fallbackError) {
    if (!response.ok) {
        let detail = fallbackError
        try {
            const err = await response.json()
            detail = err.detail || fallbackError
        } catch {
            
        }
        throw new Error(detail)
    }
    return response.json()
}

export async function createPrecioSucursal({ sucursal, producto, costo, precio }) {
    const res = await fetch(`${API_BASE}/precioporproducto/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sucursal, producto, costo, precio }),
    })
    return handleResponse(res, 'Error al guardar precio')
}

export async function getPreciosByProducto(productoId) {
    const res = await fetch(`${API_BASE}/precioporproducto/${productoId}`)
    return handleResponse(res, 'Error al cargar precios del producto')
}

export async function updatePrecioSucursal(precioId, payload) {
    const res = await fetch(`${API_BASE}/precioporproducto/update/${precioId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar precio')
}

export async function deletePrecioSucursal(precioId) {
    const res = await fetch(`${API_BASE}/precioporproducto/delete/${precioId}`, {
        method: 'DELETE',
    })
    return handleResponse(res, 'Error al eliminar precio')
}