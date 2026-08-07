<style scoped>
.table-container {
    width: 98%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    margin-top: 1%;
    flex-shrink: 0;
}

.table-header {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.table-header span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.table-feedback {
    padding: 40px 16px;
    text-align: center;
    color: #6C757D;
    font-size: 0.95rem;
    font-style: italic;
}

.table-feedback.error { color: #FB1C2E; }

.table-scroll {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead tr {
    background-color: #F5F5F5;
}

thead th {
    padding: 9px 16px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    white-space: nowrap;
    border-bottom: 1px solid #BCBCBC;
}

tbody tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background-color: #FAFAFA; }

tbody td {
 padding: 10px 16px;
    font-size: 1rem;
    color: #333;
    white-space: nowrap;   
}

td.razon-social {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.status-icon {
    font-size: 20px;
}

.status-icon.activo   { color: #28A745; }
.status-icon.inactivo { color: #FB1C2E; }

.btn-edit {
    background: none;
    border: none;
    cursor: pointer;
    color: #130348;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.15s;
    display: flex;
    align-items: center;
}

.btn-edit:hover { background-color: #E3F2FD; }
.btn-edit .material-icons { font-size: 20px; }
</style>

<template>
    <div class="table-container">

        <div class="table-header">
            <span v-if="isLoading">Cargando sucursales...</span>
            <span v-else-if="errorMessage">{{ errorMessage }}</span>
            <span v-else>
                Mostrando {{ sucursalesFiltradas.length }} de {{ sucursales.length }} registros disponibles
            </span>
        </div>

        <div v-if="isLoading" class="table-feedback">
            Cargando...
        </div>

        <div v-else-if="errorMessage" class="table-feedback error">
            {{ errorMessage }}
        </div>

        <div v-else-if="sucursalesFiltradas.length === 0" class="table-feedback">
            No hay sucursales para mostrar
        </div>

        <div v-else class="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Sucursal</th>
                        <th>Tipo de Sucursal</th>
                        <th>Depende de</th>
                        <th>Tipo de Moneda</th>
                        <th>Razón Social</th>
                        <th>Estatus</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sucursal in sucursalesFiltradas" :key="sucursal.id">
                        <td>{{ sucursal.sucursal }}</td>
                        <td>{{ getTipoNombre(sucursal.tipo_sucursal_id) }}</td>
                        <td>{{ sucursal.dependencia }}</td>
                        <td>{{ sucursal.mondeda }}</td>
                        <td class="razon-social">{{ sucursal.razon_social }}</td>
                        <td>
                            <span
                                class="material-icons status-icon"
                                :class="isActivo(sucursal.estado_sucursal_id) ? 'activo' : 'inactivo'"
                            >
                                {{ isActivo(sucursal.estado_sucursal_id) ? 'check_circle' : 'cancel' }}
                            </span>
                        </td>
                        <td>
                            <button class="btn-edit" @click="$emit('edit', sucursal)" title="Editar sucursal">
                                <span class="material-icons">edit</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getSucursales, getCatalogos } from '../../../services/SucursalesServices'

const props = defineProps({
    filters: {
        type: Object,
        default: () => ({ tipoSucursalId: null, estadoSucursalId: null })
    }
})

defineEmits(['edit'])

const sucursales      = ref([])
const tiposSucursal   = ref([])
const estadosSucursal = ref([])
const isLoading       = ref(false)
const errorMessage    = ref(null)

const cargarTodo = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const [suc, { tiposSucursal: tipos, estadosSucursal: estados }] = await Promise.all([
            getSucursales(),
            getCatalogos(),
        ])
        sucursales.value      = suc
        tiposSucursal.value   = tipos
        estadosSucursal.value = estados
    } catch (e) {
        errorMessage.value = `Error al cargar sucursales: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(cargarTodo)

const getTipoNombre = (tipoId) => {
    const tipo = tiposSucursal.value.find(t => t.id === tipoId)
    return tipo?.tipo ?? 'N/A'
}

const isActivo = (estadoId) => estadoId === 1

const sucursalesFiltradas = computed(() => {
    let result = sucursales.value
    if (props.filters.tipoSucursalId != null) {
        result = result.filter(s => s.tipo_sucursal_id === props.filters.tipoSucursalId)
    }
    if (props.filters.estadoSucursalId != null) {
        result = result.filter(s => s.estado_sucursal_id === props.filters.estadoSucursalId)
    }
    return result
})

const reload = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        sucursales.value = await getSucursales()
    } catch (e) {
        errorMessage.value = e.message
    } finally {
        isLoading.value = false
    }
}

defineExpose({ reload })
</script>