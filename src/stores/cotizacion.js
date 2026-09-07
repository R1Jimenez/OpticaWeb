import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { createCotizacion, getTicketPdf } from '../services/CotizacionServices'

export const useCotizacionStore = defineStore('cotizacion', () => {
    const clienteSeleccionado = ref(null)
    const pacienteSeleccionado = ref(null)
    const tipoVentaSeleccionado = ref(null)
    const plazoSeleccionado = ref(null)
    const sucursalSeleccionada = ref(null)
    const productoBusqueda = ref(null)
    const pagoInicial = ref(0)
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

    function setPagoInicial(monto) {
        pagoInicial.value = monto
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
        items.value = items.value.filter(i => i.producto.id !== item.producto.id)
    }

    function limpiarItems() {
        items.value = []
    }

    function piezasEnCarrito(productoId) {
        const item = items.value.find(i => i.producto.id === productoId)
        return item ? item.piezas : 0
    }

    function construirPayloadCotizacion() {
        const authStore = useAuthStore()
        const payload = {
            sucursal_id: sucursalSeleccionada.value?.id ?? null,
            usuario_id: authStore.user?.user?.id ?? authStore.user?.id ?? null,
            id_cliente: clienteSeleccionado.value?.id ?? null,
            id_paciente: pacienteSeleccionado.value?.id ?? null,
            tipo_venta: tipoVentaSeleccionado.value?.id ?? null,
            plazo: plazoSeleccionado.value?.id ?? null,
            pago_inicial: Number(pagoInicial.value) || 0,
            productos: items.value.map(item => ({
                producto_id: item.producto.id,
                cantidad: item.piezas,
            })),
        }

        // el backend requiere todos estos campos (no aceptan null)
        const faltantes = ['sucursal_id', 'usuario_id', 'id_cliente', 'id_paciente', 'tipo_venta', 'plazo']
            .filter(campo => payload[campo] === null || payload[campo] === undefined)
        if (faltantes.length > 0) {
            throw new Error(`Faltan datos para crear la cotización: ${faltantes.join(', ')}`)
        }
        if (payload.productos.length === 0) {
            throw new Error('Debe agregar al menos un producto a la cotización')
        }

        return payload
    }

    async function crearCotizacion() {
        const payload = construirPayloadCotizacion()
        return await createCotizacion(payload)
    }

    async function imprimirTicket(cotizacionId) {
        const blob = await getTicketPdf(cotizacionId)
        const url = URL.createObjectURL(blob)
        const ventana = window.open(url, '_blank')
        ventana?.addEventListener('load', () => ventana.print())
    }

    return { 
        clienteSeleccionado,
        pacienteSeleccionado,
        tipoVentaSeleccionado,
        plazoSeleccionado,
        sucursalSeleccionada,
        productoBusqueda,
        pagoInicial,
        items,
        setCliente,
        limpiarCliente,
        setPaciente,
        setTipoVenta,
        setPlazo,
        setSucursal,
        setProductoBusqueda,
        limpiarProductoBusqueda,
        setPagoInicial,
        agregarItem,
        quitarItem,
        limpiarItems,
        piezasEnCarrito,
        construirPayloadCotizacion,
        crearCotizacion,
        imprimirTicket,
    }
})
