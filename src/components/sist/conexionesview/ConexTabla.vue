<style scoped>
.ConexTable {
    width: 93%;
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

.ConexTablHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.ConexTablHeader > span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.PorPagina {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 0.9rem;
}

.PorPagina select {
    padding: 2px 6px;
    border: 1px solid white;
    border-radius: 8px;
    background: #130348;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
}

.HeadConexTabl {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.Conex tr {
    background-color: #F5F5F5;
}

.Conex th {
    padding: 8px 4px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 1px solid #130348;
}

.bodyConex tr {
    transition: background 0.15s;
}

.bodyConex tr:hover { background-color: #FAFAFA; }

.bodyConex td {
    padding: 6px 10px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    border: 1px solid #130348;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.bodyConex td:nth-child(1),
.bodyConex td:nth-child(2) {
    text-align: left;
}

.UsuarioCell {
    color: #337AB7;
    font-weight: 600;
}

.TipoBox {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-width: 100px;
    padding: 2px 10px;
    border-radius: 10px;
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
}

.TipoBox .material-icons {
    font-size: 18px;
}

.TipoBox.Entrada {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
}

.TipoBox.Salida {
    background: radial-gradient(ellipse at center, #FB1C2E 10%, #bb1724 100%);
}

.conex-empty {
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
</style>

<template>
    <div class="ConexTable">
        <div class="ConexTablHeader">
            <span>Mostrando Registros Disponibles</span>
            <label class="PorPagina">
                Resultados por página
                <select v-model.number="porPagina" data-cy="por-pagina">
                    <option v-for="n in OPCIONES_POR_PAGINA" :key="n" :value="n">{{ n }}</option>
                </select>
            </label>
        </div>
        <div v-if="isLoading" class="conex-empty">
            <div class="empty-box">Cargando conexiones...</div>
        </div>
        <div v-else-if="errorMsg" class="conex-empty">
            <div class="empty-box">{{ errorMsg }}</div>
        </div>
        <div v-else-if="conexiones.length === 0" class="conex-empty">
            <div class="empty-box">No se encontraron conexiones con los filtros seleccionados</div>
        </div>
        <div v-else class="HeadConexTabl">
            <table>
                <colgroup>
                    <col style="width: 25%;">
                    <col style="width: 35%;">
                    <col style="width: 24%;">
                    <col style="width: 16%;">
                </colgroup>
                <thead class="Conex">
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Fecha y Hora</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody class="bodyConex">
                    <tr v-for="c in conexiones" :key="c.id" data-cy="conexion">
                        <td class="UsuarioCell" :title="c.usuario">{{ c.usuario }}</td>
                        <td :title="c.nombre">{{ c.nombre }}</td>
                        <td>{{ formatFechaHora(c.fecha) }}</td>
                        <td>
                            <span class="TipoBox" :class="c.tipo">
                                <span class="material-icons">{{ c.tipo === 'Entrada' ? 'login' : 'logout' }}</span>
                                {{ c.tipo }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Paginacion
            v-if="!isLoading && !errorMsg && total > 0"
            v-model:pagina="pagina"
            :total="total"
            :por-pagina="porPagina"
            etiqueta="conexiones"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Paginacion from '../../Paginacion.vue'
import { getConexiones } from '../../../services/ConexionesServices'
import { parsearFechaUTC } from '../../../utils/formato'

const OPCIONES_POR_PAGINA = [10, 25, 50, 100]

const props = defineProps({
    filtros: { type: Object, default: () => ({}) },
})

const conexiones = ref([])
const total = ref(0)
const pagina = ref(1)
const porPagina = ref(10)
const isLoading = ref(false)
const errorMsg = ref(null)

let solicitud = 0

const cargarConexiones = async () => {
    // descarta respuestas de consultas anteriores que lleguen tarde
    const actual = ++solicitud
    isLoading.value = true
    errorMsg.value = null
    try {
        const respuesta = await getConexiones(props.filtros, pagina.value, porPagina.value)
        if (actual !== solicitud) return
        conexiones.value = respuesta.items
        total.value = respuesta.total
    } catch (error) {
        if (actual !== solicitud) return
        errorMsg.value = error.message
        conexiones.value = []
        total.value = 0
    } finally {
        if (actual === solicitud) isLoading.value = false
    }
}

const reiniciar = () => {
    if (pagina.value === 1) cargarConexiones()
    else pagina.value = 1
}

watch(() => props.filtros, reiniciar, { deep: true })
watch(porPagina, reiniciar)
watch(pagina, cargarConexiones, { immediate: true })

const pad = (n) => String(n).padStart(2, '0')

const formatFechaHora = (valor) => {
    const d = parsearFechaUTC(valor)
    if (!d) return '-'
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
</script>
