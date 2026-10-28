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

const enviarJson = (url, method, payload) => fetch(url, {
    method,
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: payload === undefined ? undefined : JSON.stringify(payload),
})

export async function getPromociones({ sucursalId = null, incluirInactivas = false } = {}) {
    const params = new URLSearchParams({ incluir_inactivas: incluirInactivas })
    if (sucursalId) params.append('sucursal_id', sucursalId)
    const res = await fetch(`${API_BASE}/promociones/all?${params}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar las promociones')
}

export async function getPromocion(id) {
    const res = await fetch(`${API_BASE}/promociones/${id}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar la promoción')
}

// Promociones vigentes que aplican a una venta con estos datos
export async function getPromocionesDisponibles({ sucursalId, tipoVentaId = null, plazoId = null, clienteId = null }) {
    const params = new URLSearchParams({ sucursal_id: sucursalId })
    if (tipoVentaId) params.append('tipo_venta_id', tipoVentaId)
    if (plazoId) params.append('plazo_id', plazoId)
    if (clienteId) params.append('cliente_id', clienteId)
    const res = await fetch(`${API_BASE}/promociones/disponibles?${params}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar las promociones disponibles')
}

export async function createPromocion(payload) {
    return handleResponse(await enviarJson(`${API_BASE}/promociones/create`, 'POST', payload), 'Error al crear la promoción')
}

export async function updatePromocion(id, payload) {
    return handleResponse(await enviarJson(`${API_BASE}/promociones/update/${id}`, 'PUT', payload), 'Error al actualizar la promoción')
}

export async function bajaPromocion(id) {
    return handleResponse(await enviarJson(`${API_BASE}/promociones/delete/${id}`, 'DELETE'), 'Error al dar de baja la promoción')
}
