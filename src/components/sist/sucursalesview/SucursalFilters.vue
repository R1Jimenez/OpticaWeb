<style scoped>
.filters-container {
    width: 98%;
    padding: 24px;
    background: linear-gradient(135deg, #F0F0F0, #F0F0F0);
    border: 2px solid #FB1C2E;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-shrink: 0;
}

.filters-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.filters-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #130348;
}

.btn-nueva-sucursal {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background-color: #130348;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-nueva-sucursal:hover { opacity: 0.85; }
.btn-nueva-sucursal .material-icons { font-size: 20px; }

.filters-row {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
}

.filter-field {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 8px;
}

.filter-field label {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.filter-select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.filter-select-wrapper .material-icons {
    position: absolute;
    left: 12px;
    color: #130348;
    font-size: 20px;
    pointer-events: none;
}

.filter-select {
    width: 100%;
    padding: 12px 16px 12px 40px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #130348;
    appearance: none;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
}

.filter-select:focus {
    border-color: #130348;
    border-width: 2px;
}

/* ── Action buttons ── */
.filters-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
}

.btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn:hover { opacity: 0.85; }
.btn .material-icons { font-size: 18px; }

.btn-outline {
    background: transparent;
    color: #130348;
    border: 2px solid #130348;
}

.btn-consultar {
    background-color: #FB1C2E;
    color: white;
    border: none;
}
</style>

<template>
    <div class="filters-container">

        <div class="filters-header">
            <span class="filters-title">Filtros</span>
            <button class="btn-nueva-sucursal" @click="$emit('nuevaSucursal')">
                <span class="material-icons">add</span>
                Nueva Sucursal
            </button>
        </div>

        <div class="filters-row">

            <div class="filter-field">
                <label>Tipo de Sucursal</label>
                <div class="filter-select-wrapper">
                    <span class="material-icons">business</span>
                    <select class="filter-select" v-model="selectedTipo" :disabled="isLoading">
                        <option :value="null">{{ isLoading ? 'Cargando...' : 'Todos los tipos' }}</option>
                        <option
                            v-for="tipo in tiposSucursal"
                            :key="tipo.id"
                            :value="tipo.id"
                        >
                            {{ tipo.tipo }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="filter-field">
                <label>Estatus</label>
                <div class="filter-select-wrapper">
                    <span class="material-icons">check_circle</span>
                    <select class="filter-select" v-model="selectedEstado" :disabled="isLoading">
                        <option :value="null">{{ isLoading ? 'Cargando...' : 'Todos los estados' }}</option>
                        <option
                            v-for="estado in estadosSucursal"
                            :key="estado.id"
                            :value="estado.id"
                        >
                            {{ estado.estado }}
                        </option>
                    </select>
                </div>
            </div>

        </div>

        <div class="filters-actions">
            <button class="btn btn-outline" @click="limpiarFiltros">
                <span class="material-icons">clear</span>
                Limpiar
            </button>
            <button class="btn btn-consultar" @click="aplicarFiltros">
                <span class="material-icons">search</span>
                Consultar
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCatalogos } from '../../../services/SucursalesServices'

const emit = defineEmits(['nuevaSucursal', 'filterApplied'])

const tiposSucursal   = ref([])
const estadosSucursal = ref([])
const selectedTipo    = ref(null)
const selectedEstado  = ref(null)
const isLoading       = ref(false)

onMounted(async () => {
    isLoading.value = true
    try {
        const { tiposSucursal: tipos, estadosSucursal: estados } = await getCatalogos()
        tiposSucursal.value   = tipos
        estadosSucursal.value = estados
    } catch (e) {
        console.error('Error cargando filtros:', e)
    } finally {
        isLoading.value = false
    }
})

const aplicarFiltros = () => {
    emit('filterApplied', {
        tipoSucursalId:   selectedTipo.value,
        estadoSucursalId: selectedEstado.value,
    })
}

const limpiarFiltros = () => {
    selectedTipo.value   = null
    selectedEstado.value = null
    emit('filterApplied', { tipoSucursalId: null, estadoSucursalId: null })
}
</script>