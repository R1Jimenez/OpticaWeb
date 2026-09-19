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

export async function createOrdenTrabajo(payload) {
    const res = await fetch(`${API_BASE}/ordenes-trabajo/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear la orden de trabajo')
}

export async function getOrdenesTrabajo() {
    const res = await fetch(`${API_BASE}/ordenes-trabajo/all`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar las ordenes de trabajo')
}

export async function getOrdenesTrabajoByCliente(clienteId) {
    const res = await fetch(`${API_BASE}/ordenes-trabajo/cliente/${clienteId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar las ordenes de trabajo del cliente')
}

export async function getOrdenTrabajo(ordenId) {
    const res = await fetch(`${API_BASE}/ordenes-trabajo/${ordenId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar la orden de trabajo')
}

export async function updateOrdenTrabajo(ordenId, payload) {
    const res = await fetch(`${API_BASE}/ordenes-trabajo/update/${ordenId}`, {
        method: 'PUT',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar la orden de trabajo')
}
