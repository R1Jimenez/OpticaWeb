const BASE_URL = 'http://127.0.0.1:8000/atributos'

export const AtributosService = {

    async getAll() {
        const response = await fetch(`${BASE_URL}/all`)
        if (!response.ok) {
            throw new Error(`Error al obtener atributos: ${response.status}`)
        }
        return await response.json()
    },

    async create(atributo, longitud) {
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ atributo, longitud })
        })
        if (!response.ok) {
            throw new Error(`Error al crear atributo: ${response.status}`)
        }
        return await response.json()
    },

    async update(id, data) {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`Error al actualizar atributo: ${response.status}`)
        }
        return await response.json()
    },

    async delete(id) {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`Error al eliminar atributo: ${response.status}`)
        }
        return await response.json()
    }
}