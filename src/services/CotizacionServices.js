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

export async function createCotizacion(payload) {
    const res = await fetch(`${API_BASE}/cotizacion/create`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al crear la cotización')
}

export async function getCotizacion(cotizacionId) {
    const res = await fetch(`${API_BASE}/cotizacion/${cotizacionId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar la cotización')
}

// Endpoint pendiente de crear en backend: debe responder con el PDF del ticket (Content-Type: application/pdf).
export async function getTicketPdf(cotizacionId) {
    const res = await fetch(`${API_BASE}/cotizacion/${cotizacionId}/ticket`, {
        headers: authHeaders(),
    })
    if (!res.ok) {
        throw new Error('Error al generar el ticket')
    }
    return res.blob()
}
