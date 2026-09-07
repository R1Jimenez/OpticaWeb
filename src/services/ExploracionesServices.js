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

export async function createExploracion(payload) {
    const res = await fetch(`${API_BASE}/exploraciones/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear exploracion')
}

export async function getExploracionesByPaciente(pacienteId) {
    const res = await fetch(`${API_BASE}/exploraciones/paciente/${pacienteId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar exploraciones del paciente')
}

export async function getExploracion(exploracionId) {
    const res = await fetch(`${API_BASE}/exploraciones/${exploracionId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar exploracion')
}

export async function updateExploracion(exploracionId, payload) {
    const res = await fetch(`${API_BASE}/exploraciones/update/${exploracionId}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar exploracion')
}

export async function deleteExploracion(exploracionId) {
    const res = await fetch(`${API_BASE}/exploraciones/delete/${exploracionId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al eliminar exploracion')
}
