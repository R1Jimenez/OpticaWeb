import { authHeaders } from './authHeader'

const API_BASE = 'http://127.0.0.1:8000'

async function handleResponse(response, fallbackError) {
    if (!response.ok) {
        let detail = fallbackError
        try {
            const err = await response.json()
            detail = err.detail || fallbackError
        } catch {
            // response body wasn't JSON, keep fallback
        }
        throw new Error(detail)
    }
    return response.json()
}

export async function createInventario({ sucursal_id, producto_id, punto_reorden = 0 }) {
    const res = await fetch(`${API_BASE}/inventario/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ sucursal_id, producto_id, punto_reorden }),
    })
    return handleResponse(res, 'Error al crear el inventario')
}

export async function updateInventario(inventarioId, payload) {
    const res = await fetch(`${API_BASE}/inventario/update/${inventarioId}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar el inventario')
}

export async function getInventarioSucursal(sucursalId) {
    const res = await fetch(`${API_BASE}/inventario/sucursal/${sucursalId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar el inventario de la sucursal')
}

export async function getInventarioSucursalProducto(sucursalId, productoId) {
    const res = await fetch(`${API_BASE}/inventario/sucursal/${sucursalId}/${productoId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar el inventario del producto en la sucursal')
}

export async function registrarMovimiento({ sucursal_id, producto_id, entrada = 0, merma = 0 }) {
    const res = await fetch(`${API_BASE}/inventario/movimiento`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ sucursal_id, producto_id, entrada, merma }),
    })
    return handleResponse(res, 'Error al registrar el movimiento de inventario')
}
