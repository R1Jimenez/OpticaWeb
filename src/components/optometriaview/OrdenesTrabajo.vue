<style scoped>
.OrdTable {
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    margin-top: 16px;
    flex-shrink: 0;
}

.OrdTablHeader {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
    cursor: pointer;
    user-select: none;
}

.OrdTablHeader span.titulo {
    flex: 1;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.chevron-icon {
    color: white;
    font-size: 26px;
    transition: transform 0.2s;
}

.chevron-icon.rotated { transform: rotate(180deg); }

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

.HeadProd {
    width: 100%;
    max-height: 420px;
    overflow-x: auto;
    overflow-y: auto;
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
    position: sticky;
    top: 0;
    background-color: #F5F5F5;
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
</style>

<template>
    <div class="OrdTable" v-if="clienteId != null">
        <div class="OrdTablHeader" @click="toggleExpanded">
            <span class="titulo">Ordenes de Trabajo</span>
            <span class="material-icons chevron-icon" :class="{ rotated: isExpanded }">keyboard_arrow_down</span>
        </div>

        <template v-if="isExpanded">
            <div v-if="isLoading" class="ordenes-empty">
                <div class="empty-box">Cargando ordenes de trabajo...</div>
            </div>

            <div v-else-if="errorMsg" class="ordenes-empty">
                <div class="empty-box">{{ errorMsg }}</div>
            </div>

            <div v-else-if="ordenes.length === 0" class="ordenes-empty">
                <div class="empty-box">
                    No hay órdenes de trabajo registradas para este cliente
                </div>
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
                        <tr v-for="orden in ordenes" :key="orden.id">
                            <td>{{ orden.id }}</td>
                            <td>N/A</td>
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
                                <OrdButTable />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import OrdButTable from '../ordtra/consulordview/OrdButTable.vue'
import OrdDetMinTable from '../ordtra/consulordview/OrdDetMinTable.vue'
import OrdPacMinTable from '../ordtra/consulordview/OrdPacMinTable.vue'
import { getOrdenesTrabajoByCliente } from '../../services/OrdenesTrabajoServices'

const props = defineProps({
    clienteId: { type: Number, default: null },
})

const isExpanded = ref(false)
const isLoading = ref(false)
const errorMsg = ref(null)
const ordenes = ref([])

const cargarOrdenes = async (clienteId) => {
    if (clienteId == null) {
        ordenes.value = []
        return
    }
    isLoading.value = true
    errorMsg.value = null
    try {
        ordenes.value = await getOrdenesTrabajoByCliente(clienteId)
    } catch (error) {
        errorMsg.value = error.message
        ordenes.value = []
    } finally {
        isLoading.value = false
    }
}

watch(() => props.clienteId, (clienteId) => cargarOrdenes(clienteId), { immediate: true })

const toggleExpanded = () => { isExpanded.value = !isExpanded.value }

const nombrePaciente = (orden) => {
    return orden.paciente ? `${orden.paciente.nombres} ${orden.paciente.apellidos}` : 'Sin paciente asignado'
}

// El backend expone la refraccion dentro de info_referencial (refraccion_{oi|od}_{esfera|cilindro|eje})
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
    if (!fecha) return 'N/A'
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
}
</script>
