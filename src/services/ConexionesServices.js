import { authHeaders } from './authHeader'

const API_BASE = 'http://127.0.0.1:8000'

async function handleResponse(response, fallbackError) {
    if (!response.ok) {
        let detail = fallbackError
        try {
            const err = await response.json()
            if (typeof err.detail === 'string') detail = err.detail
        } catch {
            // response body wasn't JSON, keep fallback
        }
        throw new Error(detail)
    }
    return response.json()
}

export async function getConexiones(filtros = {}, pagina = 1, porPagina = 10) {
    const params = new URLSearchParams({ pagina, por_pagina: porPagina })
    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor !== null && valor !== undefined && valor !== '') params.append(clave, valor)
    })
    const res = await fetch(`${API_BASE}/conexiones/all?${params}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar el historial de conexiones')
}

export async function registrarSalida() {
    const res = await fetch(`${API_BASE}/conexiones/salida`, { method: 'POST', headers: authHeaders() })
    return handleResponse(res, 'Error al registrar la salida')
}
