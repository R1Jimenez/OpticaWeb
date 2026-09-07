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

export async function createPaciente(payload) {
    const res = await fetch(`${API_BASE}/pacientes/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear paciente')
}

export async function getPacientes() {
    const res = await fetch(`${API_BASE}/pacientes/all`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar pacientes')
}

export async function getPacientesByCliente(clienteId) {
    const res = await fetch(`${API_BASE}/pacientes/cliente/${clienteId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar pacientes del cliente')
}

export async function getPaciente(pacienteId) {
    const res = await fetch(`${API_BASE}/pacientes/${pacienteId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar paciente')
}

export async function updatePaciente(pacienteId, payload) {
    const res = await fetch(`${API_BASE}/pacientes/update/${pacienteId}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar paciente')
}

export async function deletePaciente(pacienteId) {
    const res = await fetch(`${API_BASE}/pacientes/delete/${pacienteId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al eliminar paciente')
}
