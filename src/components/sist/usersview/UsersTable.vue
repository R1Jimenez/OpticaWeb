<style scoped>
.table-container {
    width: 98%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    flex-shrink: 0;
    margin-top: 1%;
}

/* ── Header ── */
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

/* ── Feedback ── */
.table-feedback {
    padding: 40px 16px;
    text-align: center;
    color: #6C757D;
    font-size: 0.95rem;
    font-style: italic;
}

.table-feedback.error { color: #FB1C2E; }

/* ── Table ── */
.table-scroll {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead tr { background-color: #F5F5F5; }

thead th {
    padding: 12px 16px;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 700;
    color: #333333;
    white-space: nowrap;
    border-bottom: 1px solid #BCBCBC;
}

tbody tr {
    border-bottom: 1px solid #E0E0E0;
    transition: background 0.15s;
    background: white;
}

tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background-color: #FAFAFA; }

tbody td {
    padding: 12px 16px;
    font-size: 1rem;
    color: #333333;
    vertical-align: middle;
}

/* ── Active icon ── */
.status-icon { font-size: 22px; }
.status-icon.activo   { color: #28A745; }
.status-icon.inactivo { color: #FB1C2E; }

/* ── Sucursal chips ── */
.chips-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.chip {
    padding: 3px 10px;
    background-color: #130348;
    color: white;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    white-space: nowrap;
}

/* ── Roles list ── */
.roles-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 70px;
    overflow-y: auto;
}

.roles-list span {
    font-size: 0.875rem;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ── Edit button ── */
.btn-editUs {
    background: none;
    border: none;
    cursor: pointer;
    color: #666666;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    margin: 0 auto;  
}

thead th:last-child,
tbody td:last-child {
    width: 60px;
    min-width: 60px;
    max-width: 60px;
    text-align: center;
    padding: 8px 7px;
}

.btn-editUs:hover { background-color: #E3F2FD; }
.btn-editUs .material-icons { font-size: 25px; }
</style>

<template>
    <div class="table-container">

        <!-- Header -->
        <div class="table-header">
            <span v-if="isLoading">Cargando usuarios...</span>
            <span v-else-if="errorMessage">{{ errorMessage }}</span>
            <span v-else>
                Mostrando {{ usuariosFiltrados.length }} de {{ usuarios.length }} registros disponibles
            </span>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="table-feedback">Cargando...</div>

        <!-- Error -->
        <div v-else-if="errorMessage" class="table-feedback error">{{ errorMessage }}</div>

        <!-- Empty -->
        <div v-else-if="usuariosFiltrados.length === 0" class="table-feedback">
            No hay usuarios para mostrar
        </div>

        <!-- Table -->
        <div v-else class="table-scroll">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Activo</th>
                        <th>Sucursal</th>
                        <th>Roles</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
                        <!-- Nombre completo -->
                        <td>{{ usuario.nombres }} {{ usuario.apellidos }}</td>

                        <!-- Usuario -->
                        <td>{{ usuario.usuario }}</td>

                        <!-- Activo -->
                        <td>
                            <span
                                class="material-icons status-icon"
                                :class="isUserActive(usuario) ? 'activo' : 'inactivo'"
                            >
                                {{ isUserActive(usuario) ? 'check' : 'close' }}
                            </span>
                        </td>

                        <!-- Sucursales (chips) -->
                        <td>
                            <div class="chips-wrap">
                                <span
                                    v-for="sucId in usuario.sucursal_acces"
                                    :key="sucId"
                                    class="chip"
                                >
                                    {{ getSucursalNombre(sucId) }}
                                </span>
                            </div>
                        </td>

                        <!-- Roles -->
                        <td>
                            <div class="roles-list">
                                <span v-for="rolId in usuario.roles.slice(0, 3)" :key="rolId">
                                    {{ getRolNombre(rolId) }}
                                </span>
                                <span v-if="usuario.roles.length > 3" style="color: #6C757D; font-size: 0.75rem;">
                                    +{{ usuario.roles.length - 3 }} más
                                </span>
                            </div>
                        </td>

                        <!-- Email -->
                        <td>{{ usuario.email }}</td>

                        <!-- Teléfono -->
                        <td>{{ usuario.telefono }}</td>

                        <!-- Edit button -->
                        <td>
                            <!--
                            <button>
                                <span class="material-icons">edit_outlined</span>
                            </button>
                            -->
                            <button class="btn-editUs" @click="$emit('edit', usuario)" title="Editar usuario">
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
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
    filters: {
        type: Object,
        default: () => ({ usuario: null, sucursalId: null, rolId: null, activos: null })
    }
})

defineEmits(['edit'])

const usuarios   = ref([])
const sucursales = ref([])
const roles      = ref([])
const isLoading  = ref(false)
const errorMessage = ref(null)

// ── Fetch all data on mount ────────────────────────────
onMounted(async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const [usersRes, sucRes, rolesRes] = await Promise.all([
            fetch('http://127.0.0.1:8000/users/all'),
            fetch('http://127.0.0.1:8000/sucursales/all'),
            fetch('http://127.0.0.1:8000/users_roles/all'),
        ])
        if (!usersRes.ok || !sucRes.ok || !rolesRes.ok) throw new Error('Error al cargar datos')
        usuarios.value   = await usersRes.json()
        sucursales.value = await sucRes.json()
        roles.value      = await rolesRes.json()
    } catch (e) {
        errorMessage.value = `Error al cargar usuarios: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
})

// ── Helpers ────────────────────────────────────────────
const getSucursalNombre = (sucId) => {
    const suc = sucursales.value.find(s => s.id === sucId)
    return suc?.sucursal ?? 'N/A'
}

const getRolNombre = (rolId) => {
    const rol = roles.value.find(r => r.id === rolId)
    return rol?.rol ?? 'Desconocido'
}

// A user is active if at least one of their roles has is_active = true
const isUserActive = (usuario) => {
    return usuario.roles.some(rolId => {
        const rol = roles.value.find(r => r.id === rolId)
        return rol?.is_active === true
    })
}

// ── Filtered list ──────────────────────────────────────
const usuariosFiltrados = computed(() => {
    let result = usuarios.value

    if (props.filters.usuario) {
        const q = props.filters.usuario.toLowerCase()
        result = result.filter(u =>
            u.usuario.toLowerCase().includes(q) ||
            u.nombres.toLowerCase().includes(q) ||
            u.apellidos.toLowerCase().includes(q)
        )
    }

    if (props.filters.sucursalId != null) {
        result = result.filter(u => u.sucursal_acces.includes(props.filters.sucursalId))
    }

    if (props.filters.rolId != null) {
        result = result.filter(u => u.roles.includes(props.filters.rolId))
    }

    if (props.filters.activos) {
        result = result.filter(u => isUserActive(u))
    }

    return result
})

// ── Expose reload ──────────────────────────────────────
const reload = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const res = await fetch('http://127.0.0.1:8000/users/all')
        if (!res.ok) throw new Error('Error al recargar')
        usuarios.value = await res.json()
    } catch (e) {
        errorMessage.value = e.message
    } finally {
        isLoading.value = false
    }
}

defineExpose({ reload })
</script>