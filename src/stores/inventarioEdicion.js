import { ref } from 'vue'
import { defineStore } from 'pinia'

// Guarda el producto y la sucursal activos en la edición de inventario (EdInvModal/ProdTable)
export const useInventarioEdicionStore = defineStore('inventarioEdicion', () => {
    const productoId = ref(null)
    const sucursalId = ref(null)

    function setProducto(id) {
        productoId.value = id
    }

    function setSucursal(id) {
        sucursalId.value = id
    }

    return { productoId, sucursalId, setProducto, setSucursal }
})
