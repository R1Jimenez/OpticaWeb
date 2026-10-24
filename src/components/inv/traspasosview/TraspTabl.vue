<style scoped>
.TraspTable {
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

.TraspTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.TraspTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadTraspTabl {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.Trasp tr {
    background-color: #F5F5F5;
}

.Trasp th {
    padding: 5px 1px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-bottom: 1px solid #130348;
}

.bodyTrasp tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyTrasp tr:hover { background-color: #FAFAFA; }

.bodyTrasp td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.bodyTrasp td:nth-child(1) {
    text-align: left;
}

.EstBox {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
}

.EstBox.Enviado {
    background: radial-gradient(ellipse at center, #230097 10%, #130348 100%);
}

.EstBox.Recibido {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
}

.EstBox.Cancelado {
    background: radial-gradient(ellipse at center, #FB1C2E 10%, #bb1724 100%);
}

.traspasos-empty {
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

.EstBox text {
    font-size: 1rem;
    color: white;
}

.butrow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10%;
}

.butrow button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 3px;
    border: 1px solid #130348;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 5%,
        #BCBCBC 100%
    );
    cursor: pointer;
}
</style>

<template>
    <div class="TraspTable">
        <div class="TraspTablHeader">
            <span>
                Mostrando Registros Disponibles
            </span>
        </div>
        <div v-if="isLoading" class="traspasos-empty">
            <div class="empty-box">Cargando traspasos...</div>
        </div>
        <div v-else-if="errorMsg" class="traspasos-empty">
            <div class="empty-box">{{ errorMsg }}</div>
        </div>
        <div v-else-if="traspasos.length === 0" class="traspasos-empty">
            <div class="empty-box">No se encontraron traspasos con los filtros seleccionados</div>
        </div>
        <div v-else class="HeadTraspTabl">
            <table>
                <colgroup>
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 6%;">
                    <col style="width: 7%;">
                    <col style="width: 7%;">
                    <col style="width: 10%;">
                    <col style="width: 7%;">
                    <col style="width: 10%;">
                    <col style="width: 5.5%;">
                </colgroup>
                <thead class="Trasp">
                    <tr>
                        <th>No#</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Estatus</th>
                        <th>Promesa Entrega</th>
                        <th>Creado Por</th>
                        <th>Fecha Creación</th>
                        <th>Modificado Por</th>
                        <th>Última Modificación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="bodyTrasp">
                    <tr v-for="t in traspasos" :key="t.id" :data-cy="`traspaso-${t.id}`">
                        <td>{{ t.id }}</td>
                        <td>{{ t.origen }}</td>
                        <td>{{ t.destino }}</td>
                        <td>
                            <div class="EstBox" :class="t.estatus">
                                <text>{{ t.estatus }}</text>
                            </div>
                        </td>
                        <td>{{ formatPromesa(t.promesa_entrega) }}</td>
                        <td>{{ t.creado_por }}</td>
                        <td>{{ formatFechaHora(t.fecha_creacion) }}</td>
                        <td>{{ t.modificado_por }}</td>
                        <td>{{ formatFechaHora(t.fecha_modificacion) }}</td>
                        <td>
                            <div class="butrow">
                                <button title="Ver detalle" data-cy="ver-traspaso" @click="$emit('ver', t.id)">
                                    <span class="material-icons" style="color:#130348; font-size:20px;">visibility</span>
                                </button>
                                <button title="Editar / cambiar estatus" data-cy="editar-traspaso" @click="$emit('editar', t.id)">
                                    <span class="material-icons" style="color:#130348; font-size:20px;">edit</span>
                                </button>
                            </div>
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
            etiqueta="traspasos"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Paginacion from '../../Paginacion.vue'
import { getTraspasos } from '../../../services/TraspasosServices'
import { parsearFechaUTC, parsearFechaCalendario } from '../../../utils/formato'

const POR_PAGINA = 10

const props = defineProps({
    filtros: { type: Object, default: () => ({}) },
    // se incrementa desde la vista para recargar tras crear o modificar un traspaso
    recarga: { type: Number, default: 0 },
})

defineEmits(['ver', 'editar'])

const traspasos = ref([])
const total = ref(0)
const pagina = ref(1)
const isLoading = ref(false)
const errorMsg = ref(null)

let solicitud = 0

const cargarTraspasos = async () => {
    // descarta respuestas de consultas anteriores que lleguen tarde
    const actual = ++solicitud
    isLoading.value = true
    errorMsg.value = null
    try {
        const respuesta = await getTraspasos(props.filtros, pagina.value, POR_PAGINA)
        if (actual !== solicitud) return
        traspasos.value = respuesta.items
        total.value = respuesta.total
    } catch (error) {
        if (actual !== solicitud) return
        errorMsg.value = error.message
        traspasos.value = []
        total.value = 0
    } finally {
        if (actual === solicitud) isLoading.value = false
    }
}

watch(() => props.filtros, () => {
    if (pagina.value === 1) cargarTraspasos()
    else pagina.value = 1
}, { deep: true })

watch(() => props.recarga, cargarTraspasos)
watch(pagina, cargarTraspasos, { immediate: true })

const pad = (n) => String(n).padStart(2, '0')

const formatPromesa = (valor) => {
    const d = parsearFechaCalendario(valor)
    return d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(-2)}` : '-'
}

const formatFechaHora = (valor) => {
    const d = parsearFechaUTC(valor)
    if (!d) return '-'
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
</script>