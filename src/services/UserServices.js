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

// ── Catálogos ──────────────────────────────────────────
export async function getSucursales() {
    const res = await fetch(`${API_BASE}/sucursales/all`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar sucursales')
}

export async function getRoles() {
    const res = await fetch(`${API_BASE}/users_roles/all`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar roles')
}

// ── Usuarios ───────────────────────────────────────────
export async function getUsers() {
    const res = await fetch(`${API_BASE}/users/all`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar usuarios')
}

export async function loginUser(payload) {
    const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Usuario o contraseña incorrectos')
}

export async function createUser(payload) {
    const res = await fetch(`${API_BASE}/users/signup`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear el usuario')
}

export async function updateUser(id, payload) {
    const res = await fetch(`${API_BASE}/users/update/${id}`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar usuario')
}
