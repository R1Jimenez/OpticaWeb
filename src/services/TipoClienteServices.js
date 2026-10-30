import { authHeaders } from './authHeader'

const API_BASE = 'http://127.0.0.1:8000'

async function handleResponse(response, fallbackError) {
    if (!response.ok) {
        let detail = fallbackError
        try {
            const err = await response.json()
            if (typeof err.detail === 'string') detail = err.detail
            else if (Array.isArray(err.detalle)) detail = err.detalle.map(d => d.msg).join('; ')
        } catch {
            // response body wasn't JSON, keep fallback
        }
        throw new Error(detail)
    }
    return response.json()
}

export async function getTiposCliente() {
    const res = await fetch(`${API_BASE}/tipo_cliente/all`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar tipos de cliente')
}

export async function getTipoCliente(id) {
    const res = await fetch(`${API_BASE}/tipo_cliente/${id}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar tipo de cliente')
}

export async function createTipoCliente(payload) {
    const res = await fetch(`${API_BASE}/tipo_cliente/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear tipo de cliente')
}

export async function updateTipoCliente(id, payload) {
    const res = await fetch(`${API_BASE}/tipo_cliente/update/${id}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar tipo de cliente')
}

export async function deleteTipoCliente(id) {
    const res = await fetch(`${API_BASE}/tipo_cliente/delete/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al eliminar tipo de cliente')
}