<style scoped>
.OrdTable {
    width: 98%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    flex-shrink: 0;
}

.OrdTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.OrdTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadProd {
    width: 100%;
    overflow-x: auto;
}

.ordenes-empty {
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

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.Prod tr {
    background-color: #F5F5F5;
}

.Prod th {
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

.bodyT tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyT tr:last-child { border-bottom: none; }
.bodyT tr:hover { background-color: #FAFAFA; }

.bodyT td {
    padding: 10px;
    font-size: 1rem;
    color: #130348;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.DetalleTitulo {
    font-weight: 700;
    font-size: 0.85rem;
    color: #130348;
    text-align: left;
    padding-bottom: 4px;
    border-bottom: 1px solid #DDD;
    margin-bottom: 4px;
}

.MiniTablaDetalle {
    width: 100%;
    border-collapse: collapse;
    background: transparent;
}

.MiniTablaDetalle th {
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    text-align: center;
    padding: 2px 6px;
    border: none;
}

.MiniTablaDetalle td {
    font-size: 0.8rem;
    color: #130348;
    text-align: left;
    padding: 2px 6px;
    border: none;
    white-space: normal;
}

.MiniTablaDetalle .EtiquetaFila {
    text-align: left;
    font-weight: 600;
    color: #130348;
}
</style>

<template>
    <div class="OrdTable">
        <div class="OrdTablHeader">
            <span>
                Mostrando Ordenes Disponibles
            </span>
        </div>
        <div v-if="isLoading" class="ordenes-empty">
            <div class="empty-box">Cargando ordenes de trabajo...</div>
        </div>
        <div v-else-if="errorMsg" class="ordenes-empty">
            <div class="empty-box">{{ errorMsg }}</div>
        </div>
        <div v-else-if="ordenes.length === 0" class="ordenes-empty">
            <div class="empty-box">No se encontraron órdenes de trabajo con los filtros seleccionados</div>
        </div>
        <div v-else class="HeadProd">
            <table>
                <colgroup>
                    <col style="width: 5%;">
                    <col style="width: 5%;">
                    <col style="width: 7%;">
                    <col style="width: 9.1%;">
                    <col style="width: 14%;">
                    <col style="width: 5.5%;">
                    <col style="width: 7%;">
                    <col style="width: 7%;">
                    <col style="width: 18%;">
                    <col style="width: 6.5%;">
                    <col style="width: 6.5%;">
                    <col style="width: 9.1%;">
                </colgroup>
                <thead class="Prod">
                    <tr>
                        <th>Núm Orden.</th>
                        <th>Núm Prspto.</th>
                        <th>Sucursal</th>
                        <th>Cliente</th>
                        <th>Paciente</th>
                        <th>Enviada Por</th>
                        <th>Promesa Entrega</th>
                        <th>Fecha Envío</th>
                        <th>Detalle</th>
                        <th>Estatus Optica</th>
                        <th>Estatus Lab.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="bodyT">
                    <tr v-for="orden in ordenesPagina" :key="orden.id">
                        <td>{{ orden.id }}</td>
                        <td>{{ orden.id_cotizacion ?? 'N/A' }}</td>
                        <td>{{ orden.sucursal?.sucursal }}</td>
                        <td>{{ orden.cliente?.nombres }} {{ orden.cliente?.apellidos }}</td>
                        <td>
                            <OrdPacMinTable
                                :nombre-paciente="nombrePaciente(orden)"
                                :oi="ojoInfo(orden, 'oi')"
                                :od="ojoInfo(orden, 'od')"
                            />
                        </td>
                        <td>{{ orden.usuario?.nombres }} {{ orden.usuario?.apellidos }}</td>
                        <td>{{ formatFecha(orden.promesa_entrega) }}</td>
                        <td>{{ formatFecha(orden.fecha) }}</td>
                        <td>
                            <OrdDetMinTable :detalles="detallesOrden(orden)" />
                        </td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>
                            <OrdButTable @detalle="ordenSeleccionada = orden" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Paginacion
            v-if="!isLoading && !errorMsg && ordenes.length > 0"
            v-model:pagina="pagina"
            :total="ordenes.length"
            :por-pagina="POR_PAGINA"
            etiqueta="órdenes"
        />

        <OrdDetalle
            :orden="ordenSeleccionada"
            :visible="ordenSeleccionada != null"
            @close="ordenSeleccionada = null"
        />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import OrdButTable from './OrdButTable.vue';
import OrdDetMinTable from './OrdDetMinTable.vue';
import OrdPacMinTable from './OrdPacMinTable.vue';
import OrdDetalle from '../../optometriaview/OrdDetalle.vue'
import Paginacion from '../../Paginacion.vue'
import { getOrdenesTrabajo } from '../../../services/OrdenesTrabajoServices'
import { parsearFechaUTC } from '../../../utils/formato'

const POR_PAGINA = 10

const props = defineProps({
    filtros: { type: Object, default: () => ({}) },
})

const ordenes = ref([])
const isLoading = ref(false)
const errorMsg = ref(null)
const pagina = ref(1)
const ordenSeleccionada = ref(null)

const ordenesPagina = computed(() => ordenes.value.slice((pagina.value - 1) * POR_PAGINA, pagina.value * POR_PAGINA))

const cargarOrdenes = async () => {
    isLoading.value = true
    errorMsg.value = null
    try {
        ordenes.value = await getOrdenesTrabajo(props.filtros)
    } catch (error) {
        errorMsg.value = error.message
        ordenes.value = []
    } finally {
        pagina.value = 1
        isLoading.value = false
    }
}

watch(() => props.filtros, cargarOrdenes, { immediate: true, deep: true })

const nombrePaciente = (orden) => {
    return orden.paciente ? `${orden.paciente.nombres} ${orden.paciente.apellidos}` : 'Sin paciente asignado'
}

const ojoInfo = (orden, ojo) => {
    const info = orden.info_referencial
    if (!info) return { esfera: '-', cilindro: '-', eje: '-' }
    return {
        esfera: info[`refraccion_${ojo}_esfera`] ?? '-',
        cilindro: info[`refraccion_${ojo}_cilindro`] ?? '-',
        eje: info[`refraccion_${ojo}_eje`] ?? '-',
    }
}

const detallesOrden = (orden) => {
    return (orden.detalles || []).map(d => ({
        cantidad: d.cantidad,
        nombre: d.nombre,
        codigoExterno: d.codigo_externo,
    }))
}

const formatFecha = (fecha) => {
    const d = parsearFechaUTC(fecha)
    if (!d) return 'N/A'
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
}
</script>
