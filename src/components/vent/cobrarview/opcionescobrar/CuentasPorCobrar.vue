<style scoped>
.CxCTable {
    width: 100%;
    border-collapse: collapse;
}

.CxCTable thead th {
    padding: 10px 14px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 2px solid #130348;
    white-space: nowrap;
}

.CxCTable tbody td {
    padding: 8px 14px;
    font-size: 0.95rem;
    color: #130348;
    border-bottom: 1px solid #BCBCBC;
    vertical-align: middle;
}

.CxCNumFolio {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.CxCExpandIcon {
    cursor: pointer;
    color: #130348;
    font-size: 1.2rem;
}

.CxCBadge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 12px;
    background-color: #6b6b6b;
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
}

.CxCPagado {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.CxCPagadoMonto {
    color: #337AB7;
    cursor: pointer;
}

.CxCPagadoMonto:hover {
    text-decoration: underline;
}

.CxCAccionIcon {
    cursor: pointer;
    color: #130348;
    font-size: 1.2rem;
}

.CxCAccionIcon:hover {
    color: #FB1C2E;
}

.CxCAccionIcon.deshabilitado {
    opacity: 0.4;
    pointer-events: none;
}

.CxCVencido {
    color: #FB1C2E !important;
    font-weight: 700;
}

.CxCAbonoInput {
    width: 110px;
    padding: 5px 8px;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #130348;
    outline: none;
    background: white;
}

.CxCAbonoInput:focus {
    border: 2px solid #130348;
}

.CxCAbonoInput.invalido {
    border: 2px solid #FB1C2E;
}

.CxCDetalleRow td {
    background-color: #FAFAFA;
    padding: 6px 14px 6px 40px;
    border-bottom: 1px solid #BCBCBC;
}

.CxCDetalleTitulo {
    font-size: 0.85rem;
    font-weight: 700;
    color: #130348;
    padding: 4px 0 2px;
}

.CxCDetalleItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.85rem;
    color: #444;
    padding: 2px 0;
}

.CxCTotalRow td {
    text-align: right;
    font-size: 1.1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: none;
    padding: 12px 14px;
}

.CxCMensaje {
    padding: 16px;
    text-align: center;
    color: #130348;
    font-size: 1rem;
}

.CxCAviso {
    margin: 0 14px 8px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
}

.CxCAviso.error {
    color: #FB1C2E;
    border: 1px solid #FB1C2E;
}

.CxCAviso.exito {
    color: #2E8B57;
    border: 1px solid #2E8B57;
}
</style>

<template>
    <div v-if="!cliente" class="CxCMensaje">Seleccione un cliente para ver sus cuentas por cobrar</div>
    <div v-else-if="cargando" class="CxCMensaje">Cargando cuentas por cobrar...</div>
    <div v-else-if="errorCarga" class="CxCMensaje">{{ errorCarga }}</div>
    <template v-else>
        <div v-if="aviso" class="CxCAviso" :class="aviso.tipo">{{ aviso.texto }}</div>

        <div v-if="cuentas.length === 0" class="CxCMensaje">El cliente no tiene cuentas por cobrar</div>
        <table v-else class="CxCTable">
            <thead>
                <tr>
                    <th>Referencia</th>
                    <th>Concepto</th>
                    <th>Emisión</th>
                    <th>Vencimiento</th>
                    <th>Importe</th>
                    <th>Total Pagado</th>
                    <th>Diferencia</th>
                    <th>Abono</th>
                    <th>Incobrable</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="cuenta in cuentas" :key="cuenta.id">
                    <tr>
                        <td>
                            <div class="CxCNumFolio">
                                <span
                                    class="material-icons CxCExpandIcon"
                                    @click="toggleFila(cuenta.id)"
                                >
                                    {{ expandidas.has(cuenta.id) ? 'expand_less' : 'expand_more' }}
                                </span>
                                {{ cuenta.id }}
                            </div>
                        </td>
                        <td><span class="CxCBadge">{{ cuenta.concepto }}</span></td>
                        <td>{{ formatearFecha(cuenta.emision) }}</td>
                        <td :class="{ CxCVencido: estaVencida(cuenta) }" :title="estaVencida(cuenta) ? 'Cuenta vencida' : ''">
                            {{ formatearFecha(cuenta.vencimiento) }}
                        </td>
                        <td>{{ formatearMoneda(cuenta.importe) }}</td>
                        <td>
                            <div class="CxCPagado">
                                <span class="CxCPagadoMonto" title="Ver historial de abonos" @click="expandir(cuenta.id)">
                                    {{ formatearMoneda(cuenta.total_pagado) }}
                                </span>
                                <span
                                    class="material-icons CxCAccionIcon"
                                    title="Abonar el saldo completo"
                                    @click="abonarSaldo(cuenta)"
                                >edit</span>
                            </div>
                        </td>
                        <td>{{ formatearMoneda(cuenta.diferencia) }}</td>
                        <td>
                            <input
                                v-model="abonos[cuenta.id]"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                class="CxCAbonoInput"
                                :class="{ invalido: abonoInvalido(cuenta) }"
                                :title="abonoInvalido(cuenta) ? 'El abono no puede exceder la diferencia' : ''"
                                :disabled="procesando"
                            />
                        </td>
                        <td>
                            <span
                                class="material-icons CxCAccionIcon"
                                :class="{ deshabilitado: procesando }"
                                title="Marcar como incobrable"
                                @click="confirmarIncobrable(cuenta)"
                            >edit_note</span>
                        </td>
                    </tr>
                    <tr v-if="expandidas.has(cuenta.id)" class="CxCDetalleRow">
                        <td colspan="9">
                            <div class="CxCDetalleTitulo">Productos</div>
                            <div v-for="detalle in cuenta.detalles" :key="detalle.producto_id" class="CxCDetalleItem">
                                <span>{{ detalle.nombre }} x{{ detalle.cantidad }}</span>
                                <span>{{ formatearMoneda(detalle.subtotal) }}</span>
                            </div>
                            <div class="CxCDetalleTitulo">Historial de abonos</div>
                            <div v-if="cuenta.abonos.length === 0" class="CxCDetalleItem">
                                <span>Sin abonos registrados</span>
                            </div>
                            <div v-for="abono in cuenta.abonos" :key="abono.id" class="CxCDetalleItem">
                                <span>{{ abono.tipo === 'incobrable' ? 'Incobrable' : 'Abono' }} - {{ formatearFecha(abono.fecha) }}</span>
                                <span>{{ formatearMoneda(abono.monto) }}</span>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr class="CxCTotalRow">
                    <td colspan="7">Total a pagar</td>
                    <td colspan="2">{{ formatearMoneda(totalAbonos) }}</td>
                </tr>
            </tfoot>
        </table>
    </template>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getCuentasPorCobrar, aplicarAbonos, marcarIncobrable } from '../../../../services/AbonosServices'
import { parsearFechaUTC, formatearMoneda } from '../../../../utils/formato'

const props = defineProps({
    cliente: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['update:total'])

const cuentas = ref([])
const abonos = ref({})
const expandidas = ref(new Set())
const cargando = ref(false)
const procesando = ref(false)
const errorCarga = ref('')
const aviso = ref(null)

const centavos = (valor) => Math.round(Number(valor || 0) * 100)

const totalAbonos = computed(() =>
    cuentas.value.reduce((acc, c) => acc + centavos(abonos.value[c.id]), 0) / 100
)

watch(totalAbonos, (total) => emit('update:total', total), { immediate: true })

function formatearFecha(fecha) {
    const d = parsearFechaUTC(fecha)
    return d ? d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
}

function estaVencida(cuenta) {
    const venc = parsearFechaUTC(cuenta.vencimiento)
    return !!venc && venc < new Date()
}

function abonoInvalido(cuenta) {
    const monto = abonos.value[cuenta.id]
    if (monto === '' || monto === null || monto === undefined) return false
    return centavos(monto) < 0 || centavos(monto) > centavos(cuenta.diferencia)
}

function toggleFila(id) {
    if (expandidas.value.has(id)) {
        expandidas.value.delete(id)
    } else {
        expandidas.value.add(id)
    }
}

function expandir(id) {
    expandidas.value.add(id)
}

function abonarSaldo(cuenta) {
    abonos.value[cuenta.id] = Number(cuenta.diferencia).toFixed(2)
}

async function cargarCuentas() {
    abonos.value = {}
    expandidas.value = new Set()
    if (!props.cliente?.id) {
        cuentas.value = []
        return
    }
    cargando.value = true
    errorCarga.value = ''
    try {
        cuentas.value = await getCuentasPorCobrar(props.cliente.id)
    } catch (e) {
        errorCarga.value = e.message
        cuentas.value = []
    } finally {
        cargando.value = false
    }
}

async function confirmarIncobrable(cuenta) {
    const saldo = formatearMoneda(cuenta.diferencia)
    if (!confirm(`¿Marcar la cuenta ${cuenta.id} como incobrable? Se cancelará el saldo pendiente de ${saldo}.`)) return

    procesando.value = true
    aviso.value = null
    try {
        await marcarIncobrable(cuenta.id)
        await cargarCuentas()
        aviso.value = { tipo: 'exito', texto: `La cuenta ${cuenta.id} se marcó como incobrable` }
    } catch (e) {
        aviso.value = { tipo: 'error', texto: e.message }
    } finally {
        procesando.value = false
    }
}

// Lo invoca CobrarOptions desde el botón "Aceptar"
async function aplicar() {
    aviso.value = null

    const invalidas = cuentas.value.filter(abonoInvalido)
    if (invalidas.length > 0) {
        aviso.value = { tipo: 'error', texto: `El abono excede la diferencia en la(s) cuenta(s): ${invalidas.map(c => c.id).join(', ')}` }
        return false
    }

    const payload = cuentas.value
        .filter(c => centavos(abonos.value[c.id]) > 0)
        .map(c => ({ cotizacion_id: c.id, monto: (centavos(abonos.value[c.id]) / 100).toFixed(2) }))

    if (payload.length === 0) {
        aviso.value = { tipo: 'error', texto: 'Capture al menos un abono' }
        return false
    }

    procesando.value = true
    try {
        await aplicarAbonos(payload)
        const total = formatearMoneda(totalAbonos.value)
        await cargarCuentas()
        aviso.value = { tipo: 'exito', texto: `Se aplicaron abonos por ${total}` }
        return true
    } catch (e) {
        aviso.value = { tipo: 'error', texto: e.message }
        return false
    } finally {
        procesando.value = false
    }
}

defineExpose({ aplicar, procesando })

watch(() => props.cliente?.id, cargarCuentas, { immediate: true })
</script>
