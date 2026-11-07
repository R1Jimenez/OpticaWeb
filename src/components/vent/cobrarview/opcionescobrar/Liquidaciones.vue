<style scoped>
.LiqTabla {
    width: calc(100% - 28px);
    margin: 0 14px;
    border-collapse: collapse;
    table-layout: fixed;
    background: white;
}

.LiqTabla th {
    padding: 8px 10px;
    background-color: #F5F5F5;
    text-align: left;
    font-size: 0.95rem;
    font-weight: 700;
    color: #130348;
    border: 1px solid #BCBCBC;
    border-bottom: 2px solid #130348;
}

.LiqTabla td {
    padding: 6px 10px;
    font-size: 0.95rem;
    color: #130348;
    border: 1px solid #BCBCBC;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.LiqTabla tbody tr:hover {
    background-color: #FAFAFA;
}

.LiqTabla .Num {
    text-align: right;
}

.LiqTabla .Centro {
    text-align: center;
}

.LiqImpresa {
    font-size: 20px;
    vertical-align: middle;
}

.LiqImpresa.si { color: #2E8B57; }
.LiqImpresa.no { color: #BCBCBC; }

.LiqNA {
    color: #6C757D;
}

.LiqDetalleBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 4px;
    border: 1px solid #130348;
    border-radius: 10px;
    background: radial-gradient(ellipse at center, #F0F0F0 5%, #BCBCBC 100%);
    color: #130348;
    cursor: pointer;
}

.LiqDetalleBtn:hover {
    border-color: #FB1C2E;
}

.LiqDetalleBtn .material-icons {
    font-size: 20px;
}

.LiqPaginacion {
    margin: 0 14px;
}

.LiqMensaje {
    padding: 16px;
    text-align: center;
    color: #130348;
    font-size: 1rem;
}
</style>

<template>
    <div v-if="!cliente" class="LiqMensaje">Seleccione un cliente para ver sus liquidaciones</div>
    <div v-else-if="cargando && !liquidaciones.length" class="LiqMensaje">Cargando liquidaciones...</div>
    <div v-else-if="error" class="LiqMensaje">{{ error }}</div>
    <div v-else-if="total === 0" class="LiqMensaje">El cliente no tiene ventas liquidadas</div>
    <template v-else>
        <table class="LiqTabla">
            <colgroup>
                <col style="width: 20%;">
                <col style="width: 15%;">
                <col style="width: 9%;">
                <col style="width: 8%;">
                <col style="width: 14%;">
                <col style="width: 9%;">
                <col style="width: 15%;">
                <col style="width: 10%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Sucursal</th>
                    <th class="Num">Número de presupuesto</th>
                    <th class="Num">Ticket</th>
                    <th class="Centro">Folio</th>
                    <th class="Num">Importe Total</th>
                    <th class="Centro">Impresa</th>
                    <th class="Centro">Fecha Liquidación</th>
                    <th class="Centro">Detalle</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="l in liquidaciones" :key="l.id" data-cy="liquidacion">
                    <td :title="l.sucursal">{{ l.sucursal }}</td>
                    <td class="Num">{{ l.id }}</td>
                    <td class="Num">{{ l.ticket ?? '-' }}</td>
                    <td class="Centro"><span :class="{ LiqNA: !l.folio }">{{ l.folio ?? 'N/A' }}</span></td>
                    <td class="Num">{{ formatearMoneda(l.importe_total) }}</td>
                    <td class="Centro">
                        <span
                            class="material-icons LiqImpresa"
                            :class="l.impresa ? 'si' : 'no'"
                            :title="l.impresa ? 'Ticket impreso' : 'Ticket sin imprimir'"
                        >{{ l.impresa ? 'check_box' : 'check_box_outline_blank' }}</span>
                    </td>
                    <td class="Centro">{{ formatearFecha(l.fecha_liquidacion) }}</td>
                    <td class="Centro">
                        <button class="LiqDetalleBtn" title="Ver detalle" data-cy="ver-liquidacion" @click="detalleId = l.id">
                            <span class="material-icons">manage_search</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="LiqPaginacion">
            <Paginacion v-model:pagina="pagina" :total="total" :por-pagina="POR_PAGINA" etiqueta="liquidaciones" />
        </div>
    </template>

    <LiquidacionDetalle
        v-if="detalleId != null"
        :cotizacion-id="detalleId"
        @cerrar="detalleId = null"
        @impresa="marcarImpresa"
    />
</template>

<script setup>
import { ref, watch } from 'vue'
import Paginacion from '../../../Paginacion.vue'
import LiquidacionDetalle from './LiquidacionDetalle.vue'
import { getLiquidaciones } from '../../../../services/PagosServices'
import { parsearFechaUTC, formatearMoneda } from '../../../../utils/formato'

const POR_PAGINA = 10

const props = defineProps({
    cliente: { type: Object, default: null },
})

const liquidaciones = ref([])
const total = ref(0)
const pagina = ref(1)
const cargando = ref(false)
const error = ref('')
const detalleId = ref(null)

let solicitud = 0

function formatearFecha(fecha) {
    const d = parsearFechaUTC(fecha)
    return d ? d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'
}

async function cargar() {
    const actual = ++solicitud
    if (!props.cliente?.id) {
        liquidaciones.value = []
        total.value = 0
        return
    }
    cargando.value = true
    error.value = ''
    try {
        const respuesta = await getLiquidaciones(props.cliente.id, pagina.value, POR_PAGINA)
        if (actual !== solicitud) return
        liquidaciones.value = respuesta.items
        total.value = respuesta.total
    } catch (e) {
        if (actual !== solicitud) return
        error.value = e.message
        liquidaciones.value = []
        total.value = 0
    } finally {
        if (actual === solicitud) cargando.value = false
    }
}

function marcarImpresa(id) {
    const fila = liquidaciones.value.find(l => l.id === id)
    if (fila) fila.impresa = true
}

watch(() => props.cliente?.id, () => {
    if (pagina.value === 1) cargar()
    else pagina.value = 1
}, { immediate: true })

watch(pagina, cargar)
</script>
