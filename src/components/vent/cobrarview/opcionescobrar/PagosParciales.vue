<style scoped>
.PParTable {
    width: 100%;
    border-collapse: collapse;
}

.PParTable thead th {
    padding: 10px 14px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 2px solid #130348;
    white-space: nowrap;
}

.PParTable tbody td {
    padding: 8px 14px;
    font-size: 0.95rem;
    color: #130348;
    border-bottom: 1px solid #BCBCBC;
    vertical-align: middle;
}

.PParTable .Monto {
    text-align: right;
}

.PParTable .Centro {
    text-align: center;
}

.PParNumFolio {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.PParIcon {
    cursor: pointer;
    color: #130348;
    font-size: 1.2rem;
}

.PParIcon:hover {
    color: #FB1C2E;
}

.PParIcon.deshabilitado {
    opacity: 0.4;
    pointer-events: none;
}

.PParBadge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 12px;
    background-color: #6b6b6b;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    margin-right: 8px;
}

.PParPagado {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.PParPagadoMonto {
    color: #337AB7;
    cursor: pointer;
}

.PParPagadoMonto:hover {
    text-decoration: underline;
}

.PParAbonoInput {
    width: 110px;
    padding: 5px 8px;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #130348;
    text-align: right;
    outline: none;
    background: white;
}

.PParAbonoInput:focus {
    border: 2px solid #130348;
}

.PParAbonoInput.invalido {
    border: 2px solid #FB1C2E;
}

.PParDetalleRow td {
    background-color: #FAFAFA;
    padding: 6px 14px 6px 40px;
    border-bottom: 1px solid #BCBCBC;
}

.PParDetalleTitulo {
    font-size: 0.85rem;
    font-weight: 700;
    color: #130348;
    padding: 4px 0 2px;
}

.PParDetalleItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #444;
    padding: 2px 0;
}

.PParTotalRow td {
    text-align: right;
    font-size: 1.1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: none;
    padding: 12px 14px;
}

.PParMensaje {
    padding: 16px;
    text-align: center;
    color: #130348;
    font-size: 1rem;
}

.PParAviso {
    margin: 0 14px 8px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
}

.PParAviso.error {
    color: #FB1C2E;
    border: 1px solid #FB1C2E;
}

.PParAviso.exito {
    color: #2E8B57;
    border: 1px solid #2E8B57;
}
</style>

<template>
    <div v-if="aviso" class="PParAviso" :class="aviso.tipo" data-cy="parciales-aviso">{{ aviso.texto }}</div>
    <div v-if="!cliente" class="PParMensaje">Seleccione un cliente para ver sus pagos parciales</div>
    <div v-else-if="cargando" class="PParMensaje">Cargando pagos parciales...</div>
    <div v-else-if="errorCarga" class="PParMensaje">{{ errorCarga }}</div>
    <div v-else-if="ventas.length === 0" class="PParMensaje">El cliente no tiene ventas con saldo por pagar</div>
    <table v-else class="PParTable">
        <thead>
            <tr>
                <th>Presupuesto</th>
                <th>Tipo de Venta</th>
                <th>Fecha Venta</th>
                <th class="Monto">Total a pagar</th>
                <th class="Monto">Total Pagado</th>
                <th class="Monto">Diferencia</th>
                <th class="Centro">Abono</th>
                <th class="Centro">Cancelar</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="v in ventas" :key="v.id">
                <tr data-cy="parcial">
                    <td>
                        <div class="PParNumFolio">
                            <span
                                class="material-icons PParIcon"
                                :title="expandidas.has(v.id) ? 'Ocultar detalle' : 'Ver detalle'"
                                @click="toggleFila(v.id)"
                            >{{ expandidas.has(v.id) ? 'expand_less' : 'expand_more' }}</span>
                            {{ v.id }}
                        </div>
                    </td>
                    <td>
                        <span class="PParBadge">{{ v.tipo_venta }}</span>
                        {{ v.plazo }}
                    </td>
                    <td>{{ formatearFecha(v.fecha) }}</td>
                    <td class="Monto">{{ formatearMoneda(v.total_venta) }}</td>
                    <td class="Monto">
                        <span class="PParPagado">
                            <span class="PParPagadoMonto" title="Ver pagos registrados" @click="expandidas.add(v.id)">
                                {{ formatearMoneda(v.total_pagado) }}
                            </span>
                            <span
                                class="material-icons PParIcon"
                                title="Abonar el saldo completo"
                                data-cy="abonar-saldo"
                                @click="abonos[v.id] = Number(v.diferencia).toFixed(2)"
                            >edit</span>
                        </span>
                    </td>
                    <td class="Monto">{{ formatearMoneda(v.diferencia) }}</td>
                    <td class="Centro">
                        <input
                            v-model="abonos[v.id]"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            class="PParAbonoInput"
                            :class="{ invalido: abonoInvalido(v) }"
                            :title="abonoInvalido(v) ? 'El abono no puede exceder la diferencia' : ''"
                            :disabled="procesando"
                            data-cy="abono"
                        />
                    </td>
                    <td class="Centro">
                        <span
                            class="material-icons PParIcon"
                            :class="{ deshabilitado: procesando }"
                            title="Cancelar el saldo pendiente"
                            data-cy="cancelar-saldo"
                            @click="cancelarSaldo(v)"
                        >edit_note</span>
                    </td>
                </tr>
                <tr v-if="expandidas.has(v.id)" class="PParDetalleRow">
                    <td colspan="8">
                        <div class="PParDetalleTitulo">Productos</div>
                        <div v-for="(d, i) in v.detalles" :key="i" class="PParDetalleItem">
                            <span>{{ d.nombre }} x{{ d.cantidad }}</span>
                            <span>{{ formatearMoneda(d.subtotal) }}</span>
                        </div>
                        <div class="PParDetalleTitulo">Pagos</div>
                        <div v-if="Number(v.pago_inicial) > 0" class="PParDetalleItem">
                            <span>Pago inicial</span>
                            <span>{{ formatearMoneda(v.pago_inicial) }}</span>
                        </div>
                        <div v-for="a in v.abonos" :key="a.id" class="PParDetalleItem">
                            <span>{{ a.tipo === 'incobrable' ? 'Saldo cancelado' : 'Abono' }} - {{ formatearFecha(a.fecha) }}</span>
                            <span>{{ formatearMoneda(a.monto) }}</span>
                        </div>
                        <div v-if="!Number(v.pago_inicial) && v.abonos.length === 0" class="PParDetalleItem">
                            <span>Sin pagos registrados</span>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
        <tfoot>
            <tr class="PParTotalRow">
                <td colspan="6">Total a pagar</td>
                <td class="Centro" data-cy="parciales-total">{{ formatearMoneda(totalAbonos) }}</td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getPagosParciales, cobrarAbonos } from '../../../../services/PagosServices'
import { marcarIncobrable } from '../../../../services/AbonosServices'
import { useCobroStore } from '../../../../stores/cobro'
import { useSucursalStore } from '../../../../stores/sucursal'
import { parsearFechaUTC, formatearMoneda } from '../../../../utils/formato'

const props = defineProps({
    cliente: { type: Object, default: null },
})

const emit = defineEmits(['update:total'])

const cobro = useCobroStore()
const sucursalStore = useSucursalStore()

const ventas = ref([])
const abonos = ref({})
const expandidas = ref(new Set())
const cargando = ref(false)
const procesando = ref(false)
const errorCarga = ref('')
const aviso = ref(null)

const centavos = (valor) => Math.round(Number(valor || 0) * 100)

const totalAbonos = computed(() => ventas.value.reduce((acc, v) => acc + centavos(abonos.value[v.id]), 0) / 100)

watch(totalAbonos, (total) => emit('update:total', total), { immediate: true })

function formatearFecha(fecha) {
    const d = parsearFechaUTC(fecha)
    if (!d) return '-'
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = d.toLocaleDateString('es-MX', { month: 'short' }).replace('.', '')
    return `${dia}-${mes}-${d.getFullYear()}`
}

function abonoInvalido(v) {
    const monto = abonos.value[v.id]
    if (monto === '' || monto === null || monto === undefined) return false
    return centavos(monto) < 0 || centavos(monto) > centavos(v.diferencia)
}

function toggleFila(id) {
    if (expandidas.value.has(id)) expandidas.value.delete(id)
    else expandidas.value.add(id)
}

async function cargar() {
    abonos.value = {}
    expandidas.value = new Set()
    if (!props.cliente?.id) {
        ventas.value = []
        return
    }
    cargando.value = true
    errorCarga.value = ''
    try {
        ventas.value = await getPagosParciales(props.cliente.id)
    } catch (e) {
        errorCarga.value = e.message
        ventas.value = []
    } finally {
        cargando.value = false
    }
}

async function cancelarSaldo(v) {
    if (!confirm(`¿Cancelar el saldo pendiente de ${formatearMoneda(v.diferencia)} del presupuesto ${v.id}? El cliente ya no lo deberá.`)) return
    procesando.value = true
    aviso.value = null
    try {
        await marcarIncobrable(v.id)
        await cargar()
        aviso.value = { tipo: 'exito', texto: `Se canceló el saldo del presupuesto ${v.id}` }
    } catch (e) {
        aviso.value = { tipo: 'error', texto: e.message }
    } finally {
        procesando.value = false
    }
}

// Lo invoca CobrarOptions desde el botón "Aceptar"
async function aplicar() {
    aviso.value = null
    const invalidas = ventas.value.filter(abonoInvalido)
    if (invalidas.length) {
        aviso.value = { tipo: 'error', texto: `El abono excede la diferencia en: ${invalidas.map(v => v.id).join(', ')}` }
        return false
    }
    const payload = ventas.value
        .filter(v => centavos(abonos.value[v.id]) > 0)
        .map(v => ({ cotizacion_id: v.id, monto: (centavos(abonos.value[v.id]) / 100).toFixed(2) }))
    if (!payload.length) {
        aviso.value = { tipo: 'error', texto: 'Capture al menos un abono' }
        return false
    }
    const sucursalId = sucursalStore.sucursalSeleccionada?.id
    if (!sucursalId) {
        aviso.value = { tipo: 'error', texto: 'Seleccione la sucursal en la que se cobra' }
        return false
    }
    if (!cobro.cubreTotal) {
        aviso.value = {
            tipo: 'error',
            texto: cobro.cambioInvalido ? 'El excedente solo puede entregarse como cambio en efectivo' : 'El total pagado no cubre los abonos',
        }
        return false
    }

    procesando.value = true
    try {
        const pago = await cobrarAbonos({
            sucursal_id: sucursalId,
            abonos: payload,
            formas: cobro.payloadFormas(),
            observaciones: cobro.observaciones.trim() || null,
        })
        cobro.limpiar()
        await cargar()
        const cambio = Number(pago.cambio) > 0 ? ` Cambio a entregar: ${formatearMoneda(pago.cambio)}.` : ''
        aviso.value = { tipo: 'exito', texto: `Abonos registrados (cobro #${pago.id}) por ${formatearMoneda(pago.total)}.${cambio}` }
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
    cargar()
}, { immediate: true })
</script>
