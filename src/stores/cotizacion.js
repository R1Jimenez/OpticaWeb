import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCotizacionStore = defineStore('cotizacion', () => {
    const clienteSeleccionado = ref(null)
    const pacienteSeleccionado = ref(null)
    const tipoVentaSeleccionado = ref(null)
    const plazoSeleccionado = ref(null)
    const sucursalSeleccionada = ref(null)
    const productoBusqueda = ref(null)
    const items = ref([])

    function setCliente(cliente) {
        clienteSeleccionado.value = cliente
        pacienteSeleccionado.value = null
    }

    function limpiarCliente() {
        clienteSeleccionado.value = null
        pacienteSeleccionado.value = null
    }

    function setPaciente(paciente) {
        pacienteSeleccionado.value = paciente
    }

    function setTipoVenta(tipoVenta) {
        tipoVentaSeleccionado.value = tipoVenta
    }

    function setPlazo (plazo) {
        plazoSeleccionado.value = plazo
    }

    function setSucursal(sucursal) {
        sucursalSeleccionada.value = sucursal
    }

    function setProductoBusqueda(producto) {
        productoBusqueda.value = producto
    }

    function limpiarProductoBusqueda() {
        productoBusqueda.value = null
    }

    function agregarItem(item) {
        const existente = items.value.find(i => i.producto.id === item.producto.id)
        if (existente) {
            existente.piezas += item.piezas
        } else {
            items.value.push(item)
        }
    }

    function quitarItem(item) {
        items.value = items.value.filter(i => i.producto.id !== item.productoId)
    }

    function limpiarItems() {
        items.value = []
    }

    function piezasEnCarrito(productoId) {
        const item = items.value.find(i => i.producto.id === productoId)
        return item ? item.piezas : 0
    }

    return { 
        clienteSeleccionado,
        pacienteSeleccionado,
        tipoVentaSeleccionado,
        plazoSeleccionado,
        sucursalSeleccionada,
        productoBusqueda,
        items,
        setCliente,
        limpiarCliente,
        setPaciente,
        setTipoVenta,
        setPlazo,
        setSucursal,
        setProductoBusqueda,
        limpiarProductoBusqueda,
        agregarItem,
        quitarItem,
        limpiarItems,
        piezasEnCarrito,
    }
})
