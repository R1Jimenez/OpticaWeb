<style scoped>
.EnEspTable {
    width: 100%;
    border-collapse: collapse;
}

.EnEspTable thead th {
    padding: 10px 14px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 2px solid #130348;
    white-space: nowrap;
}

.EnEspTable tbody td {
    padding: 8px 14px;
    font-size: 0.95rem;
    color: #130348;
    border-bottom: 1px solid #BCBCBC;
    vertical-align: middle;
}

.EnEspTable th:nth-child(1),
.EnEspTable th:nth-child(2) {
    width: 12%;
}

.EnEspNombre {
    color: #337AB7;
    cursor: pointer;
}

.EnEspNombre:hover {
    text-decoration: underline;
}

.EnEspMensaje {
    padding: 16px;
    text-align: center;
    color: #130348;
    font-size: 1rem;
}
</style>

<template>
    <div v-if="!sucursalId" class="EnEspMensaje">Seleccione una sucursal</div>
    <div v-else-if="cargando" class="EnEspMensaje">Cargando...</div>
    <div v-else-if="error" class="EnEspMensaje">{{ error }}</div>
    <div v-else-if="cotizaciones.length === 0" class="EnEspMensaje">
        No hay clientes en espera
    </div>
    <table v-else class="EnEspTable">
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cotizacion in cotizaciones" :key="cotizacion.id">
                <td>{{ formatearFecha(cotizacion.fecha) }}</td>
                <td>{{ formatearHora(cotizacion.fecha) }}</td>
                <td>
                    <span class="EnEspNombre" @click="emit('clienteSeleccionado', cotizacion.cliente)">
                        {{ cotizacion.cliente.nombres }} {{ cotizacion.cliente.apellidos }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSucursalStore } from '../../../../stores/sucursal'
import { getCotizacionesEnEspera } from '../../../../services/CotizacionServices'
import { parsearFechaUTC } from '../../../../utils/formato'

const emit = defineEmits(['clienteSeleccionado'])

const sucursalStore = useSucursalStore()
const sucursalId = computed(() => sucursalStore.sucursalSeleccionada?.id ?? null)

const cotizaciones = ref([])
const cargando = ref(false)
const error = ref('')

function formatearFecha(fecha) {
    const d = parsearFechaUTC(fecha)
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = d.toLocaleDateString('es-MX', { month: 'short' }).replace('.', '')
    return `${dia}-${mes}-${d.getFullYear()}`
}

function formatearHora(fecha) {
    return parsearFechaUTC(fecha).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

async function cargarCotizaciones() {
    if (!sucursalId.value) {
        cotizaciones.value = []
        return
    }
    cargando.value = true
    error.value = ''
    try {
        cotizaciones.value = await getCotizacionesEnEspera(sucursalId.value)
    } catch (e) {
        error.value = e.message
        cotizaciones.value = []
    } finally {
        cargando.value = false
    }
}

watch(sucursalId, cargarCotizaciones, { immediate: true })
</script>
