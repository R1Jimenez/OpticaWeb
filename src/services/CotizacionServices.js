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

export async function getCotizacionesByCliente(idCliente) {
    const res = await fetch(`${API_BASE}/cotizacion/cliente/${idCliente}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar las cotizaciones del cliente')
}

export async function getCotizacionesEnEspera(sucursalId) {
    const res = await fetch(`${API_BASE}/cotizacion/en-espera/${sucursalId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar las cotizaciones en espera')
}

export async function deleteCotizacion(cotizacionId) {
    const res = await fetch(`${API_BASE}/cotizacion/delete/${cotizacionId}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al eliminar la cotización')
}

export async function getTickets(filtros = {}, pagina = 1, porPagina = 10) {
    const params = new URLSearchParams({ pagina, por_pagina: porPagina })
    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor !== null && valor !== undefined && valor !== '') params.append(clave, valor)
    })
    const res = await fetch(`${API_BASE}/cotizacion/tickets?${params}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar los tickets')
}

export async function getTicket(cotizacionId) {
    const res = await fetch(`${API_BASE}/cotizacion/ticket/${cotizacionId}`, {
        headers: authHeaders(),
    })
    return handleResponse(res, 'Error al cargar el ticket')
}
