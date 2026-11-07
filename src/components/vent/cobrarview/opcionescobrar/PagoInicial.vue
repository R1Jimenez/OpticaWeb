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

.PagIniTable th.Monto,
.PagIniTable td.Monto {
    text-align: right;
}

.PagIniTable th.Centro,
.PagIniTable td.Centro {
    text-align: center;
}

.PagIniAviso {
    margin: 0 14px 8px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
}

.PagIniAviso.error {
    color: #FB1C2E;
    border: 1px solid #FB1C2E;
}

.PagIniAviso.exito {
    color: #2E8B57;
    border: 1px solid #2E8B57;
}
</style>

<template>
    <div v-if="aviso" class="PagIniAviso" :class="aviso.tipo" data-cy="pago-inicial-aviso">{{ aviso.texto }}</div>
    <div v-if="!cliente" class="PagIniMensaje">Seleccione un cliente para ver sus presupuestos pendientes de pago</div>
    <div v-else-if="cargando" class="PagIniMensaje">Cargando presupuestos...</div>
    <div v-else-if="error" class="PagIniMensaje">{{ error }}</div>
    <div v-else-if="pendientes.length === 0" class="PagIniMensaje">
        El cliente no tiene presupuestos pendientes de pago inicial
    </div>
    <table v-else class="PagIniTable">
        <thead>
            <tr>
                <th>Número de Presupuesto</th>
                <th>Tipo de Venta</th>
                <th>Fecha Venta</th>
                <th>Vencimiento</th>
                <th class="Monto">Total a pagar</th>
                <th class="Monto">Pago Inicial</th>
                <th class="Centro">Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="p in pendientes" :key="p.id">
                <tr data-cy="presupuesto">
                    <td>
                        <div class="PagIniNumFolio">
                            <span
                                class="material-icons PagIniExpandIcon"
                                :title="filasExpandidas.has(p.id) ? 'Ocultar productos' : 'Ver productos'"
                                @click="toggleFila(p.id)"
                            >
                                {{ filasExpandidas.has(p.id) ? 'expand_less' : 'expand_more' }}
                            </span>
                            {{ p.id }}
                        </div>
                    </td>
                    <td>
                        <span class="PagIniBadge">{{ p.tipo_venta }}</span>
                        {{ p.plazo }}
                    </td>
                    <td>{{ formatearFecha(p.fecha) }}</td>
                    <td>{{ formatearFecha(p.vencimiento) }}</td>
                    <td class="Monto">{{ formatearMoneda(p.total_venta) }}</td>
                    <td class="Monto">{{ formatearMoneda(p.pago_inicial) }}</td>
                    <td class="Centro">
                        <span
                            class="material-icons PagIniEliminarIcon"
                            title="Cancelar presupuesto"
                            @click="eliminarCotizacion(p)"
                        >close</span>
                    </td>
                </tr>
                <tr v-if="filasExpandidas.has(p.id)" class="PagIniDetalleRow">
                    <td colspan="7">
                        <div v-for="(detalle, i) in p.detalles" :key="i" class="PagIniDetalleItem">
                            <span>{{ detalle.nombre }} x{{ detalle.cantidad }}</span>
                            <span>{{ formatearMoneda(detalle.subtotal) }}</span>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
        <tfoot>
            <tr class="PagIniTotalRow">
                <td colspan="5">Total a pagar</td>
                <td data-cy="pago-inicial-total">{{ formatearMoneda(totalPagoInicial) }}</td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { deleteCotizacion } from '../../../../services/CotizacionServices'
import { getPagosInicialesPendientes, cobrarPagoInicial } from '../../../../services/PagosServices'
import { useCobroStore } from '../../../../stores/cobro'
import { useSucursalStore } from '../../../../stores/sucursal'
import { parsearFechaUTC, formatearMoneda } from '../../../../utils/formato'

const props = defineProps({
    cliente: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['update:total'])

const cobro = useCobroStore()
const sucursalStore = useSucursalStore()

const pendientes = ref([])
const cargando = ref(false)
const procesando = ref(false)
const error = ref('')
const aviso = ref(null)
const filasExpandidas = ref(new Set())

const centavos = (valor) => Math.round(Number(valor || 0) * 100)

const totalPagoInicial = computed(() => pendientes.value.reduce((acc, p) => acc + centavos(p.pago_inicial), 0) / 100)
// lo que no se cubre con el pago inicial queda a crédito
const saldoCredito = computed(() =>
    pendientes.value.reduce((acc, p) => acc + centavos(p.total_venta) - centavos(p.pago_inicial), 0) / 100
)

watch(totalPagoInicial, (total) => emit('update:total', total), { immediate: true })
watch(saldoCredito, (saldo) => { cobro.credito = saldo }, { immediate: true })

function formatearFecha(fecha) {
    const d = parsearFechaUTC(fecha)
    if (!d) return '-'
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = d.toLocaleDateString('es-MX', { month: 'short' }).replace('.', '')
    return `${dia}-${mes}-${d.getFullYear()}`
}

function toggleFila(id) {
    if (filasExpandidas.value.has(id)) {
        filasExpandidas.value.delete(id)
    } else {
        filasExpandidas.value.add(id)
    }
}

async function cargarPendientes() {
    filasExpandidas.value = new Set()
    if (!props.cliente?.id) {
        pendientes.value = []
        return
    }
    cargando.value = true
    error.value = ''
    try {
        pendientes.value = await getPagosInicialesPendientes(props.cliente.id)
    } catch (e) {
        error.value = e.message
        pendientes.value = []
    } finally {
        cargando.value = false
    }
}

async function eliminarCotizacion(p) {
    if (!confirm(`¿Cancelar el presupuesto #${p.id}? Se eliminará la venta y se regresará el inventario.`)) return
    aviso.value = null
    try {
        await deleteCotizacion(p.id)
        pendientes.value = pendientes.value.filter(c => c.id !== p.id)
        aviso.value = { tipo: 'exito', texto: `Presupuesto #${p.id} cancelado` }
    } catch (e) {
        aviso.value = { tipo: 'error', texto: e.message }
    }
}

// Lo invoca CobrarOptions desde el botón "Aceptar"
async function aplicar() {
    aviso.value = null
    const sucursalId = sucursalStore.sucursalSeleccionada?.id
    if (!sucursalId) {
        aviso.value = { tipo: 'error', texto: 'Seleccione la sucursal en la que se cobra' }
        return false
    }
    if (!cobro.cubreTotal) {
        aviso.value = {
            tipo: 'error',
            texto: cobro.cambioInvalido
                ? 'El excedente solo puede entregarse como cambio en efectivo'
                : 'El total pagado no cubre el pago inicial',
        }
        return false
    }

    procesando.value = true
    try {
        const pago = await cobrarPagoInicial({
            sucursal_id: sucursalId,
            cotizacion_ids: pendientes.value.map(p => p.id),
            formas: cobro.payloadFormas(),
            observaciones: cobro.observaciones.trim() || null,
        })
        cobro.limpiar()
        await cargarPendientes()
        const cambio = Number(pago.cambio) > 0 ? ` Cambio a entregar: ${formatearMoneda(pago.cambio)}.` : ''
        aviso.value = { tipo: 'exito', texto: `Pago inicial registrado (cobro #${pago.id}) por ${formatearMoneda(pago.total)}.${cambio}` }
        return true
    } catch (e) {
        aviso.value = { tipo: 'error', texto: e.message }
        return false
    } finally {
        procesando.value = false
    }
}

defineExpose({ aplicar, procesando })

watch(() => props.cliente?.id, () => {
    aviso.value = null
    cargarPendientes()
}, { immediate: true })
</script>