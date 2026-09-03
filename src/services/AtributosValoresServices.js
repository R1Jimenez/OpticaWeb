import { authHeaders } from './authHeader'

const BASE_URL = 'http://127.0.0.1:8000/atributosvalores'

export const AtributosValoresService = {

    async getByAtributo(atributoId) {
        const response = await fetch(`${BASE_URL}/by-atributo/${atributoId}`, {
            headers: authHeaders(),
        })
        if (response.status === 404) return []   // sin valores, devuelve array vacío
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    },

    async create(atributo_id, descripcion) {
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ atributo_id, descripcion })
        })
        if (!response.ok) throw new Error(`Error al crear valor: ${response.status}`)
        return await response.json()
    },

    async delete(id) {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        })
        if (!response.ok) throw new Error(`Error al eliminar valor: ${response.status}`)
        return await response.json()
    },

    async update(id, data) {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: 'POST',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error(`Error al actualizar valor: ${response.status}`)
            return await response.json()
    }
}