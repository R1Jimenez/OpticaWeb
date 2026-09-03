import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSucursalStore = defineStore('sucursal', () => {
    const sucursalSeleccionada = ref(JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? 'null'))

    function setSucursal(sucursal) {
        sucursalSeleccionada.value = sucursal
        localStorage.setItem('sucursalSeleccionada', JSON.stringify(sucursal))
    }

    return { sucursalSeleccionada, setSucursal }
})
