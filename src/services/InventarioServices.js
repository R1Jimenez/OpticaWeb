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
    const res = await fetch(`${API_BASE}/inventario/sucursal/${sucursalId}/productos`, {
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

export async function registrarMovimiento({ sucursal_id, producto_id, entrada = 0, merma = 0, tipo = null, referencia = null }) {
    const res = await fetch(`${API_BASE}/inventario/movimiento`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ sucursal_id, producto_id, entrada, merma, tipo, referencia }),
    })
    return handleResponse(res, 'Error al registrar el movimiento de inventario')
}

export async function getMovimientos(filtros = {}, pagina = 1, porPagina = 10) {
    const params = new URLSearchParams({ pagina, por_pagina: porPagina })
    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor !== null && valor !== undefined && valor !== '') params.append(clave, valor)
    })
    const res = await fetch(`${API_BASE}/inventario/movimientos?${params}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar los movimientos de inventario')
}

export async function getTiposMovimiento() {
    const res = await fetch(`${API_BASE}/inventario/tipos-movimiento`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar los tipos de movimiento')
}

// Busca por código, nombre o código externo entre los productos con inventario en la sucursal
export async function buscarProductosSucursal(sucursalId, termino, limite = 15) {
    const params = new URLSearchParams({ q: termino, limite })
    const res = await fetch(`${API_BASE}/inventario/sucursal/${sucursalId}/buscar?${params}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al buscar productos')
}
