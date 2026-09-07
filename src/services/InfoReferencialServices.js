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

export async function createInfoReferencial(payload) {
    const res = await fetch(`${API_BASE}/info-referencial/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear info referencial')
}

export async function getInfoReferencialByPaciente(pacienteId) {
    const res = await fetch(`${API_BASE}/info-referencial/paciente/${pacienteId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar info referencial del paciente')
}

export async function getInfoReferencialByCliente(clienteId) {
    const res = await fetch(`${API_BASE}/info-referencial/cliente/${clienteId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar info referencial del cliente')
}

export async function getInfoReferencial(infoId) {
    const res = await fetch(`${API_BASE}/info-referencial/${infoId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar info referencial')
}

export async function updateInfoReferencial(infoId, payload) {
    const res = await fetch(`${API_BASE}/info-referencial/update/${infoId}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar info referencial')
}

export async function deleteInfoReferencial(infoId) {
    const res = await fetch(`${API_BASE}/info-referencial/delete/${infoId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al eliminar info referencial')
}
