import { authHeaders } from './authHeader'

const API_BASE = 'http://127.0.0.1:8000'

async function handleResponse(response, fallbackError) {
    if (!response.ok) {
        let detail = fallbackError
        try {
            const err = await response.json()
            detail = typeof err.detail === 'string' ? err.detail : (err.error || fallbackError)
        } catch {
            // response body wasn't JSON, keep fallback
        }
        throw new Error(detail)
    }
    return response.json()
}

export async function getCuentasPorCobrar(idCliente) {
    const res = await fetch(`${API_BASE}/abonos/cuentas-por-cobrar/cliente/${idCliente}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar las cuentas por cobrar')
}

export async function aplicarAbonos(abonos) {
    const res = await fetch(`${API_BASE}/abonos/aplicar`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ abonos }),
    })
    return handleResponse(res, 'Error al aplicar los abonos')
}

export async function marcarIncobrable(cotizacionId) {
    const res = await fetch(`${API_BASE}/abonos/incobrable/${cotizacionId}`, {
        method: 'POST',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al marcar la cuenta como incobrable')
}
