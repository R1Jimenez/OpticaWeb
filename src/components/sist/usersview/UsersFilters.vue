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
    gap: 20px;
    flex-shrink: 0;
}

/* ── Header ── */
.filters-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.filters-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #130348;
}

.btn-nuevo {
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

.btn-nuevo:hover { opacity: 0.85; }
.btn-nuevo .material-icons { font-size: 20px; }

/* ── Fields row ── */
.filters-row {
    display: flex;
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

/* Text input */
.filter-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.filter-input-wrapper .material-icons {
    position: absolute;
    left: 12px;
    color: #130348;
    font-size: 20px;
    pointer-events: none;
}

.filter-input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #130348;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
}

.filter-input:focus {
    border-color: #130348;
    border-width: 2px;
}

/* Select */
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
    box-sizing: border-box;
}

.filter-select:focus {
    border-color: #130348;
    border-width: 2px;
}

.filter-select:disabled { opacity: 0.6; }

/* ── Bottom row: estatus + buttons ── */
.filters-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.estatus-group {
    display: flex;
    align-items: center;
    gap: 12px;
}

.estatus-label {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.checkbox-wrapper input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #130348;
    cursor: pointer;
}

.checkbox-wrapper span {
    font-size: 1rem;
    color: #130348;
}

/* ── Action buttons ── */
.filters-actions {
    display: flex;
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

.btn-buscar {
    background-color: #FB1C2E;
    color: white;
    border: none;
}
</style>

<template>
    <div class="filters-container">

        <!-- Header -->
        <div class="filters-header">
            <span class="filters-title">Filtros</span>
            <button class="btn-nuevo" @click="$emit('nuevoUsuario')">
                <span class="material-icons">add</span>
                Nuevo Usuario
            </button>
        </div>

        <!-- Fields row: Usuario, Sucursal, Rol -->
        <div class="filters-row">

            <!-- Usuario -->
            <div class="filter-field">
                <label>Usuario</label>
                <div class="filter-input-wrapper">
                    <span class="material-icons">person</span>
                    <input
                        class="filter-input"
                        v-model="searchUsuario"
                        placeholder="Buscar usuario..."
                        @keyup.enter="aplicarFiltros"
                    />
                </div>
            </div>

            <!-- Sucursal -->
            <div class="filter-field">
                <label>Sucursales</label>
                <div class="filter-select-wrapper">
                    <span class="material-icons">store</span>
                    <select class="filter-select" v-model="selectedSucursal" :disabled="isLoading">
                        <option :value="null">{{ isLoading ? 'Cargando...' : 'Todas las sucursales' }}</option>
                        <option v-for="suc in sucursales" :key="suc.id" :value="suc.id">
                            {{ suc.sucursal }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Rol -->
            <div class="filter-field">
                <label>Roles</label>
                <div class="filter-select-wrapper">
                    <span class="material-icons">admin_panel_settings</span>
                    <select class="filter-select" v-model="selectedRol" :disabled="isLoading">
                        <option :value="null">{{ isLoading ? 'Cargando...' : 'Todos los roles' }}</option>
                        <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                            {{ rol.rol }}
                        </option>
                    </select>
                </div>
            </div>

        </div>

        <!-- Bottom: Estatus checkbox + action buttons -->
        <div class="filters-bottom">

            <div class="estatus-group">
                <span class="estatus-label">Estatus</span>
                <label class="checkbox-wrapper">
                    <input type="checkbox" v-model="soloActivos" />
                    <span>Solo Activos</span>
                </label>
            </div>

            <div class="filters-actions">
                <button class="btn btn-outline" @click="limpiarFiltros">
                    <span class="material-icons">clear</span>
                    Limpiar
                </button>
                <button class="btn btn-buscar" @click="aplicarFiltros">
                    <span class="material-icons">search</span>
                    Buscar
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['nuevoUsuario', 'filterApplied'])

// ── Catalog data ───────────────────────────────────────
const sucursales = ref([])
const roles      = ref([])
const isLoading  = ref(false)

onMounted(async () => {
    isLoading.value = true
    try {
        const [sucRes, rolesRes] = await Promise.all([
            fetch('http://127.0.0.1:8000/sucursales/all'),
            fetch('http://127.0.0.1:8000/users_roles/all'),
        ])
        if (!sucRes.ok || !rolesRes.ok) throw new Error('Error al cargar catálogos')
        sucursales.value = await sucRes.json()
        roles.value      = await rolesRes.json()
    } catch (e) {
        console.error('Error cargando catálogos:', e)
    } finally {
        isLoading.value = false
    }
})

// ── Filter state ───────────────────────────────────────
const searchUsuario   = ref('')
const selectedSucursal = ref(null)
const selectedRol     = ref(null)
const soloActivos     = ref(false)

// ── Actions ────────────────────────────────────────────
const aplicarFiltros = () => {
    emit('filterApplied', {
        usuario:    searchUsuario.value.trim() || null,
        sucursalId: selectedSucursal.value,
        rolId:      selectedRol.value,
        activos:    soloActivos.value ? true : null,
    })
}

const limpiarFiltros = () => {
    searchUsuario.value    = ''
    selectedSucursal.value = null
    selectedRol.value      = null
    soloActivos.value      = false
    emit('filterApplied', { usuario: null, sucursalId: null, rolId: null, activos: null })
}
</script>