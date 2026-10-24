<style scoped>
.MovTable {
    width: 98%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 5%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    flex-shrink: 0;
}

.MovTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.MovTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadMovTabl {
    width: 100%;
    overflow-x: auto;
}

.movs-empty {
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

.Movs tr {
    background-color: #F5F5F5;
}

.Movs th {
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

.bodyMovs tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyMovs tr:hover { background-color: #FAFAFA; }

.bodyMovs td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.bodyMovs td:nth-child(1) {
    text-align: left;
}

.bodyMovs td:nth-child(4) {
    text-align: left;
    white-space: nowrap;
}

.producto-wrapper {
    overflow: hidden;
    width: 100%;
}

.producto-text {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
}

.producto-text.is-scrolling {
    max-width: none;
    text-overflow: clip;
}
</style>

<template>
    <div class="MovTable">
        <div class="MovTablHeader">
            <span>
                Mostrando Movimientos de Inventario
            </span>
        </div>
        <div v-if="isLoading" class="movs-empty">
            <div class="empty-box">Cargando movimientos de inventario...</div>
        </div>
        <div v-else-if="errorMsg" class="movs-empty">
            <div class="empty-box">{{ errorMsg }}</div>
        </div>
        <div v-else-if="movimientos.length === 0" class="movs-empty">
            <div class="empty-box">No se encontraron movimientos con los filtros seleccionados</div>
        </div>
        <div v-else class="HeadMovTabl">
            <table>
                <colgroup>
                    <col style="width: 9%;">
                    <col style="width: 8%;">
                    <col style="width: 15.5%;">
                    <col style="width: 27%;">
                    <col style="width: 10%;">
                    <col style="width: 9.8%;">
                    <col style="width: 10%;">
                    <col style="width: 6%;">
                    <col style="width: 5.5%;">
                    <col style="width: 5.5%;">
                    <col style="width: 5%;">
                </colgroup>
                <thead class="Movs">
                    <tr>
                        <th>Sucursal</th>
                        <th>Fecha</th>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Referencia</th>
                        <th>Usuario</th>
                        <th>Existencia Anterior</th>
                        <th>Entradas</th>
                        <th>Salidas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody class="bodyMovs">
                    <tr v-for="mov in movimientos" :key="mov.id">
                        <td>{{ mov.sucursal }}</td>
                        <td>{{ formatFecha(mov.fecha) }}</td>
                        <td>{{ mov.codigo }}</td>
                        <td>
                            <div class="producto-wrapper" @mouseenter="onProductoHover" @mouseleave="onProductoLeave">
                                <span class="producto-text">{{ mov.producto }}</span>
                            </div>
                        </td>
                        <td>{{ mov.tipo }}</td>
                        <td>{{ mov.referencia ?? '-' }}</td>
                        <td>{{ mov.usuario ?? '-' }}</td>
                        <td>{{ mov.existencia_anterior }}</td>
                        <td>{{ mov.entradas }}</td>
                        <td>{{ mov.salidas }}</td>
                        <td>{{ mov.saldo }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Paginacion
            v-if="!isLoading && !errorMsg && total > 0"
            v-model:pagina="pagina"
            :total="total"
            :por-pagina="POR_PAGINA"
            etiqueta="movimientos"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Paginacion from '../../Paginacion.vue'
import { getMovimientos } from '../../../services/InventarioServices'
import { parsearFechaUTC } from '../../../utils/formato'

const POR_PAGINA = 10

const props = defineProps({
    filtros: { type: Object, default: () => ({}) },
})

const movimientos = ref([])
const total = ref(0)
const pagina = ref(1)
const isLoading = ref(false)
const errorMsg = ref(null)

let solicitud = 0

const cargarMovimientos = async () => {
    // descarta respuestas de consultas anteriores que lleguen tarde
    const actual = ++solicitud
    isLoading.value = true
    errorMsg.value = null
    try {
        const respuesta = await getMovimientos(props.filtros, pagina.value, POR_PAGINA)
        if (actual !== solicitud) return
        movimientos.value = respuesta.items
        total.value = respuesta.total
    } catch (error) {
        if (actual !== solicitud) return
        errorMsg.value = error.message
        movimientos.value = []
        total.value = 0
    } finally {
        if (actual === solicitud) isLoading.value = false
    }
}

watch(() => props.filtros, () => {
    if (pagina.value === 1) cargarMovimientos()
    else pagina.value = 1
}, { deep: true })

watch(pagina, cargarMovimientos, { immediate: true })

const onProductoHover = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.classList.add('is-scrolling')

    const overflow = text.scrollWidth - wrapper.clientWidth
    if (overflow > 0) {
        const duration = Math.max(1, overflow / 40)
        text.style.transition = `transform ${duration}s linear`
        text.style.transform = `translateX(-${overflow}px)`
    } else {
        text.classList.remove('is-scrolling')
    }
}

const onProductoLeave = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.style.transform = 'translateX(0)'
    text.addEventListener('transitionend', () => {
        text.classList.remove('is-scrolling')
        text.style.transition = ''
    }, { once: true })
}

const formatFecha = (fecha) => {
    const d = parsearFechaUTC(fecha)
    if (!d) return '-'
    const dia = d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
    const hora = d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    return `${dia} ${hora}`
}
</script>