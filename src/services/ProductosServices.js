const BASE_URL = 'http://127.0.0.1:8000/productos'

export const ProductosService = {
    async create(payload) {
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || `Error: ${response.status}`)
        }
        return await response.json()
    },

    async getAll() {
        const response = await fetch(`${BASE_URL}/all`)
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    },

    async getFiltered(filters = {}) {
        const params = new URLSearchParams()

        if (filters.codigo) params.append('codigo', filters.codigo)
        if (filters.nombre) params.append('nombre', filters.nombre)
        if (filters.estatus !== null && filters.estatus !== undefined) {
            params.append('estatus', filters.estatus)
        }

        const response = await fetch(`${BASE_URL}/filtroproductos?${params.toString()}`)
        if (!response.ok) {
            if (response.status === 404) return []  // no matches, not a real error
            throw new Error(`Error: ${response.status}`)
        }
        return await response.json()
    },

    async getById(id) {
        const response = await fetch(`${BASE_URL}/${id}`)
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    },

    async update(id, payload) {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            method: 'DELETE'
        })
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        return await response.json()
    }
}