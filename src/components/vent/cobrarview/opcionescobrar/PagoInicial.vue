<style scoped>
.PagIniTable {
    width: 100%;
    border-collapse: collapse;
}

.PagIniTable thead th {
    padding: 10px 14px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 2px solid #130348;
    white-space: nowrap;
}

.PagIniTable tbody td {
    padding: 8px 14px;
    font-size: 0.95rem;
    color: #130348;
    border-bottom: 1px solid #BCBCBC;
    vertical-align: middle;
}

.PagIniNumFolio {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.PagIniExpandIcon {
    cursor: pointer;
    color: #130348;
    font-size: 1.2rem;
}

.PagIniBadge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 12px;
    background-color: #6b6b6b;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 8px;
}

.PagIniEliminarIcon {
    cursor: pointer;
    color: #130348;
}

.PagIniEliminarIcon:hover {
    color: #FB1C2E;
}

.PagIniDetalleRow td {
    background-color: #FAFAFA;
    padding: 6px 14px 6px 40px;
    border-bottom: 1px solid #BCBCBC;
}

.PagIniDetalleItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #444;
    padding: 2px 0;
}

.PagIniTotalRow td {
    text-align: right;
    font-size: 1.1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: none;
    padding: 12px 14px;
}

.PagIniMensaje {
    padding: 16px;
    text-align: center;
    color: #130348;
    font-size: 1rem;
}
</style>

<template>
    
        <div v-if="cargando" class="PagIniMensaje">Cargando presupuestos...</div>
        <div v-else-if="error" class="PagIniMensaje">{{ error }}</div>
        <div v-else-if="cotizacionesPendientes.length === 0" class="PagIniMensaje">
            El cliente no tiene presupuestos pendientes
        </div>
        <table v-else class="PagIniTable">
            <thead>
                <tr>
                    <th>Número de Presupuesto</th>
                    <th>Tipo de Venta</th>
                    <th>Fecha Venta</th>
                    <th>Vencimiento</th>
                    <th>Total a pagar</th>
                    <th>Pago Inicial</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="cotizacion in cotizacionesPendientes" :key="cotizacion.id">
                    <tr>
                        <td>
                            <div class="PagIniNumFolio">
                                <span
                                    class="material-icons PagIniExpandIcon"
                                    @click="toggleFila(cotizacion.id)"
                                >
                                    {{ filasExpandidas.has(cotizacion.id) ? 'expand_less' : 'expand_more' }}
                                </span>
                                {{ cotizacion.id }}
                            </div>
                        </td>
                        <td>
                            <span class="PagIniBadge">{{ tipoVentaMap[cotizacion.tipo_venta]?.venta ?? '-' }}</span>
                            {{ plazoMap[cotizacion.plazo]?.plazo ?? '-' }}
                        </td>
                        <td>{{ formatearFecha(cotizacion.fecha) }}</td>
                        <td>{{ formatearFecha(cotizacion.vencimiento) }}</td>
                        <td>{{ formatearMoneda(cotizacion.pago_restante) }}</td>
                        <td>{{ formatearMoneda(cotizacion.pago_inicial) }}</td>
                        <td>
                            <span
                                class="material-icons PagIniEliminarIcon"
                                @click="eliminarCotizacion(cotizacion)"
                            >close</span>
                        </td>
                    </tr>
                    <tr v-if="filasExpandidas.has(cotizacion.id)" class="PagIniDetalleRow">
                        <td colspan="7">
                            <div
                                v-for="detalle in cotizacion.detalles"
                                :key="detalle.id"
                                class="PagIniDetalleItem"
                            >
                                <span>Producto #{{ detalle.producto_id }} x{{ detalle.cantidad }}</span>
                                <span>{{ formatearMoneda(detalle.subtotal) }}</span>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr class="PagIniTotalRow">
                    <td colspan="4">Total a pagar</td>
                    <td colspan="3">{{ formatearMoneda(totalAPagar) }}</td>
                </tr>
            </tfoot>
        </table>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getCotizacionesByCliente, deleteCotizacion } from '../../../../services/CotizacionServices'
import { TipoVentaService } from '../../../../services/TipoVentaServices'
import { PlazoService } from '../../../../services/PlazoServices'

const props = defineProps({
    cliente: {
        type: Object,
        default: null
    }
})

const cotizaciones = ref([])
const tiposVenta = ref([])
const plazos = ref([])
const cargando = ref(false)
const error = ref('')
const filasExpandidas = ref(new Set())

const tipoVentaMap = computed(() => Object.fromEntries(tiposVenta.value.map(t => [t.id, t])))
const plazoMap = computed(() => Object.fromEntries(plazos.value.map(p => [p.id, p])))

// pendiente = activa y con saldo por cobrar
const cotizacionesPendientes = computed(() =>
    cotizaciones.value.filter(c => c.active && Number(c.pago_restante) > 0)
)

const totalAPagar = computed(() =>
    cotizacionesPendientes.value.reduce((acc, c) => acc + Number(c.pago_restante), 0)
)

function formatearFecha(fecha) {
    if (!fecha) return '-'
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatearMoneda(valor) {
    return `$${Number(valor ?? 0).toFixed(2)}`
}

function toggleFila(id) {
    if (filasExpandidas.value.has(id)) {
        filasExpandidas.value.delete(id)
    } else {
        filasExpandidas.value.add(id)
    }
}

async function cargarCatalogos() {
    try {
        const [tv, pl] = await Promise.all([TipoVentaService.getAll(), PlazoService.getAll()])
        tiposVenta.value = tv
        plazos.value = pl
    } catch (e) {
        console.error('Error al cargar tipos de venta/plazos:', e)
    }
}

async function cargarCotizaciones() {
    if (!props.cliente?.id) {
        cotizaciones.value = []
        return
    }
    cargando.value = true
    error.value = ''
    try {
        cotizaciones.value = await getCotizacionesByCliente(props.cliente.id)
    } catch (e) {
        error.value = e.message
        cotizaciones.value = []
    } finally {
        cargando.value = false
    }
}

async function eliminarCotizacion(cotizacion) {
    if (!confirm(`¿Eliminar el presupuesto #${cotizacion.id}?`)) return
    try {
        await deleteCotizacion(cotizacion.id)
        cotizaciones.value = cotizaciones.value.filter(c => c.id !== cotizacion.id)
    } catch (e) {
        alert(e.message)
    }
}

cargarCatalogos()
watch(() => props.cliente?.id, cargarCotizaciones, { immediate: true })
</script>