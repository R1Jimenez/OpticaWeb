<style scoped>
.TicksTabPrinc {
    width: 98%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    margin-top: 1%;
    flex-shrink: 0;
}

.TicksHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.TicksHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadTicks {
    width: 100%;
    overflow-x: auto;
}

.Ticket tr {
    background-color: #F5F5F5;
}

.Ticket th {
    padding: 9px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-bottom: 1px solid #130348;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.bodyTT tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyTT tr:last-child { border-bottom: none; }
.bodyTT tr:hover { background-color: #FAFAFA; }

.bodyTT td {
    padding: 10px;
    font-size: 1rem;
    color: #130348;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid #130348;   
}

.bodyTT td.centrado {
    text-align: center;
}

.bodyTT td.importe {
    text-align: right;
}

.ImprimirBtn {
    background: none;
    border: none;
    color: #130348;
    cursor: pointer;
    padding: 0;
    display: inline-flex;
}

.ImprimirBtn:hover:not(:disabled) {
    color: #FB1C2E;
}

.ImprimirBtn:disabled {
    opacity: 0.4;
    cursor: default;
}

.ticks-empty {
    padding: 16px;
}

.empty-box {
    padding: 16px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 8px;
    text-align: center;
    font-size: 0.875rem;
    color: #6C757D;
    font-style: italic;
}

.ErrorImpresion {
    margin: 10px 16px 0;
    padding: 6px 12px;
    border: 1px solid #FB1C2E;
    border-radius: 8px;
    color: #FB1C2E;
    font-size: 0.9rem;
    font-weight: 600;
}
</style>

<template>
    <div class="TicksTabPrinc">
        <div class="TicksHeader">
            <span>
                Mostrando Tickets disponibles
            </span>
        </div>
        <div v-if="errorImpresion" class="ErrorImpresion">{{ errorImpresion }}</div>
        <div v-if="isLoading" class="ticks-empty">
            <div class="empty-box">Cargando tickets...</div>
        </div>
        <div v-else-if="errorMsg" class="ticks-empty">
            <div class="empty-box">{{ errorMsg }}</div>
        </div>
        <div v-else-if="tickets.length === 0" class="ticks-empty">
            <div class="empty-box">No se encontraron tickets con los filtros seleccionados</div>
        </div>
        <div v-else class="HeadTicks">
            <table>
                <colgroup>
                    <col style="width: 7%;">
                    <col style="width: 15%;">
                    <col style="width: 38%;">
                    <col style="width: 10%;">
                    <col style="width: 23%;">
                    <col style="width: 7%;">
                </colgroup>
                <thead class="Ticket">
                    <tr>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Importe</th>
                        <th>Comentarios</th>
                        <th>Imprimir</th>
                    </tr>
                </thead>
                <tbody class="bodyTT">
                    <tr v-for="ticket in tickets" :key="ticket.id">
                        <td class="centrado">{{ ticket.id }}</td>
                        <td>{{ formatFecha(ticket.fecha) }}</td>
                        <td :title="ticket.cliente">{{ ticket.cliente }}</td>
                        <td class="importe">{{ formatearMoneda(ticket.importe) }}</td>
                        <td></td>
                        <td class="centrado">
                            <button
                                class="ImprimirBtn"
                                title="Reimprimir ticket"
                                :disabled="imprimiendo === ticket.id"
                                @click="reimprimir(ticket.id)"
                            >
                                <span class="material-icons">print</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Paginacion
            v-if="!isLoading && !errorMsg && total > 0"
            v-model:pagina="pagina"
            :total="total"
            :por-pagina="POR_PAGINA"
            etiqueta="tickets"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Paginacion from '../../Paginacion.vue'
import { getTickets, getTicket } from '../../../services/CotizacionServices'
import { parsearFechaUTC, formatearMoneda } from '../../../utils/formato'
import { abrirVentanaTicket, escribirTicket } from '../../../utils/ticket'

const POR_PAGINA = 10

const props = defineProps({
    filtros: { type: Object, default: () => ({}) },
})

const tickets = ref([])
const total = ref(0)
const pagina = ref(1)
const isLoading = ref(false)
const errorMsg = ref(null)
const imprimiendo = ref(null)
const errorImpresion = ref(null)

let solicitud = 0

const cargarTickets = async () => {
    // descarta respuestas de consultas anteriores que lleguen tarde
    const actual = ++solicitud
    isLoading.value = true
    errorMsg.value = null
    try {
        const respuesta = await getTickets(props.filtros, pagina.value, POR_PAGINA)
        if (actual !== solicitud) return
        tickets.value = respuesta.items
        total.value = respuesta.total
    } catch (error) {
        if (actual !== solicitud) return
        errorMsg.value = error.message
        tickets.value = []
        total.value = 0
    } finally {
        if (actual === solicitud) isLoading.value = false
    }
}

watch(() => props.filtros, () => {
    if (pagina.value === 1) cargarTickets()
    else pagina.value = 1
}, { deep: true })

watch(pagina, cargarTickets, { immediate: true })

const reimprimir = async (folio) => {
    errorImpresion.value = null
    const ventana = abrirVentanaTicket()
    imprimiendo.value = folio
    try {
        const t = await getTicket(folio)
        escribirTicket(ventana, {
            folio: t.folio,
            sucursal: t.sucursal,
            fecha: parsearFechaUTC(t.fecha),
            vendedor: t.vendedor,
            cliente: {
                nombre: t.cliente_nombre,
                direccion: t.cliente_direccion,
                telefono: t.cliente_telefono,
                tipo: t.tipo_cliente,
            },
            paciente: t.paciente,
            items: t.items.map(i => ({
                cantidad: i.cantidad,
                nombre: i.nombre,
                precioUnitario: i.precio_unitario,
                descuentoPct: i.descuento_porcentaje,
            })),
            descuentoPct: Number(t.descuento_porcentaje),
            promocion: t.promocion,
            totalNormal: t.total_normal,
            totalVenta: t.total_venta,
            plazo: t.plazo,
            pagoInicial: t.pago_inicial,
            pagoRestante: t.pago_restante,
            promesaEntrega: t.promesa_entrega,
        })
    } catch (error) {
        ventana?.close()
        errorImpresion.value = `No se pudo reimprimir el ticket ${folio}: ${error.message}`
    } finally {
        imprimiendo.value = null
    }
}

const formatFecha = (fecha) => {
    const d = parsearFechaUTC(fecha)
    if (!d) return '-'
    const dia = d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const hora = d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    return `${dia} ${hora}`
}
</script>