import { authHeaders } from './authHeader'

const BASE_URL = 'http://127.0.0.1:8000/plazos'

export const PlazoService = {
    async getAll() {
        const response = await fetch(`${BASE_URL}/all`, {
            headers: authHeaders(),
        })
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    },

    async getByTipoVenta(tipoVentaId) {
        const response = await fetch(`${BASE_URL}/${tipoVentaId}`, {
            headers: authHeaders(),
        })
        if (response.status === 404) return []  // sin plazos para este tipo de venta
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    },

    async create(payload) {
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || `Error: ${response.status}`)
        }
        return await response.json()
    },

    async update(id, payload) {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || `Error: ${response.status}`)
        }
        return await response.json()
    },

    async delete(id) {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        })
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    }
}
