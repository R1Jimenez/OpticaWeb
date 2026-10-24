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

export async function getTraspasos(filtros = {}, pagina = 1, porPagina = 10) {
    const params = new URLSearchParams({ pagina, por_pagina: porPagina })
    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor !== null && valor !== undefined && valor !== '') params.append(clave, valor)
    })
    const res = await fetch(`${API_BASE}/traspasos/all?${params}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar los traspasos')
}

export async function getEstatusTraspaso() {
    const res = await fetch(`${API_BASE}/traspasos/estatus`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar los estatus de traspaso')
}

export async function getTraspaso(id) {
    const res = await fetch(`${API_BASE}/traspasos/${id}`, { headers: authHeaders() })
    return handleResponse(res, 'Error al cargar el traspaso')
}

export async function createTraspaso(payload) {
    return handleResponse(await enviarJson(`${API_BASE}/traspasos/create`, 'POST', payload), 'Error al crear el traspaso')
}

export async function updateTraspaso(id, payload) {
    return handleResponse(await enviarJson(`${API_BASE}/traspasos/update/${id}`, 'PUT', payload), 'Error al actualizar el traspaso')
}

export async function enviarTraspaso(id) {
    return handleResponse(await enviarJson(`${API_BASE}/traspasos/${id}/enviar`, 'POST'), 'Error al enviar el traspaso')
}

export async function recibirTraspaso(id) {
    return handleResponse(await enviarJson(`${API_BASE}/traspasos/${id}/recibir`, 'POST'), 'Error al recibir el traspaso')
}

export async function cancelarTraspaso(id) {
    return handleResponse(await enviarJson(`${API_BASE}/traspasos/${id}/cancelar`, 'POST'), 'Error al cancelar el traspaso')
}
