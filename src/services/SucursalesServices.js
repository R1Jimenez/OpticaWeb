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
export async function getTiposSucursal() {
    const res = await fetch(`${API_BASE}/tipo_sucursal/all`)
    return handleResponse(res, 'Error al cargar tipos de sucursal')
}

export async function getEstadosSucursal() {
    const res = await fetch(`${API_BASE}/estado_sucursal/all`)
    return handleResponse(res, 'Error al cargar estados de sucursal')
}

export async function getCatalogos() {
    const [tiposSucursal, estadosSucursal] = await Promise.all([
        getTiposSucursal(),
        getEstadosSucursal(),
    ])
    return { tiposSucursal, estadosSucursal }
}

// ── Sucursales ─────────────────────────────────────────
export async function getSucursales() {
    const res = await fetch(`${API_BASE}/sucursales/all`)
    return handleResponse(res, 'Error al cargar sucursales')
}

export async function createSucursal(payload) {
    const res = await fetch(`${API_BASE}/sucursales/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear sucursal')
}

export async function updateSucursal(id, payload) {
    const res = await fetch(`${API_BASE}/sucursales/update/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al actualizar sucursal')
}