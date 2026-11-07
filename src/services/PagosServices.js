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

export async function getPagosInicialesPendientes(idCliente) {
    const res = await fetch(`${API_BASE}/pagos/pago-inicial/cliente/${idCliente}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar los presupuestos pendientes de pago')
}

export async function cobrarPagoInicial(payload) {
    const res = await fetch(`${API_BASE}/pagos/pago-inicial`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al registrar el pago inicial')
}

export async function getPagosParciales(idCliente) {
    const res = await fetch(`${API_BASE}/pagos/parciales/cliente/${idCliente}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar los pagos parciales')
}

// abonos: [{ cotizacion_id, monto }]; sirve para Pagos Parciales y Cuentas por Cobrar
export async function cobrarAbonos(payload) {
    const res = await fetch(`${API_BASE}/pagos/abonos`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
    })
    return handleResponse(res, 'Error al registrar los abonos')
}

export async function getLiquidaciones(idCliente, pagina = 1, porPagina = 10) {
    const params = new URLSearchParams({ pagina, por_pagina: porPagina })
    const res = await fetch(`${API_BASE}/pagos/liquidaciones/cliente/${idCliente}?${params}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar las liquidaciones')
}

export async function getDetalleLiquidacion(cotizacionId) {
    const res = await fetch(`${API_BASE}/pagos/liquidaciones/${cotizacionId}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar el detalle de la liquidación')
}

export async function marcarLiquidacionImpresa(cotizacionId) {
    const res = await fetch(`${API_BASE}/pagos/liquidaciones/${cotizacionId}/impresa`, {
        method: 'POST',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al marcar la liquidación como impresa')
}
