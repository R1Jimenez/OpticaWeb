<style scoped>
.pacientes-wrapper {
    position: relative;
    width: 93%;
    margin-top: 20px;
}

.pacientes-container {
    background: linear-gradient(135deg, #F0F0F0, #F0F0F0);
    border: 2px solid #FB1C2E;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

/* ── Header ── */
.pacientes-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    border-bottom: 1px solid #BCBCBC;
    cursor: default;
    user-select: none;
}

.pacientes-header.clickable {
    cursor: pointer;
    transition: background 0.15s;
}

.pacientes-header.clickable:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.header-icon {
    color: #130348;
    font-size: 24px;
}

.header-title {
    flex: 1;
    font-size: 1.125rem;
    font-weight: 700;
    color: #130348;
}

.btn-nuevo {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background-color: #130348;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-nuevo:hover { opacity: 0.85; }

.btn-nuevo .material-icons { font-size: 18px; }

.chevron-icon {
    color: #130348;
    font-size: 28px;
    transition: transform 0.2s;
}

.chevron-icon.rotated { transform: rotate(180deg); }

/* ── Lista ── */
.pacientes-list {
    max-height: 250px;
    overflow-y: auto;
}

.paciente-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 24px;
    border-bottom: 1px solid #BCBCBC;
    cursor: pointer;
    transition: background 0.15s;
}

.paciente-item:last-child { border-bottom: none; }

.paciente-item:hover { background-color: rgba(0, 0, 0, 0.04); }

.paciente-item.selected { background-color: #E3F2FD; }

.paciente-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: #130348;
    flex-shrink: 0;
}

.paciente-item.selected .paciente-avatar {
    background-color: #4A90E2;
}

.paciente-avatar .material-icons {
    color: white;
    font-size: 20px;
}

.paciente-info { flex: 1; }

.paciente-nombre {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.paciente-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    flex-wrap: wrap;
}

.paciente-meta .material-icons {
    font-size: 12px;
    color: #6C757D;
}

.paciente-meta span {
    font-size: 0.75rem;
    color: #6C757D;
}

.meta-sep { margin: 0 8px; }

.check-icon {
    color: #28A745;
    font-size: 24px;
    flex-shrink: 0;
}

/* ── Empty state ── */
.pacientes-empty {
    padding: 16px 24px;
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

/* ── Modal overlay ── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-dialog {
    background: white;
    border-radius: 16px;
    padding: 28px 32px;
    min-width: 360px;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.modal-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #130348;
    margin-bottom: 20px;
}

.modal-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 14px;
}

.modal-field label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #130348;
}

.modal-field input {
    padding: 8px 10px;
    border: 1px solid #BCBCBC;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #130348;
    outline: none;
    transition: border-color 0.2s;
}

.modal-field input:focus {
    border-color: #130348;
    border-width: 2px;
}

.modal-row {
    display: flex;
    gap: 12px;
}

.modal-row .modal-field { flex: 1; }

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn:disabled { opacity: 0.6; cursor: not-allowed; }
.btn:not(:disabled):hover { opacity: 0.85; }
.btn .material-icons { font-size: 16px; }

.btn-primary { background-color: #130348; color: white; }
.btn-gray    { background-color: #6C757D; color: white; }

/* ── Toast ── */
.toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-size: 0.95rem;
    font-weight: 500;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.toast-success { background-color: #2e7d32; }
.toast-error   { background-color: #FB1C2E; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>

<template>
    <div class="pacientes-wrapper" v-if="clienteId != null">

        <div class="pacientes-container">

            <!-- Header -->
            <div
                class="pacientes-header"
                :class="{ clickable: pacienteSeleccionado != null }"
                @click="pacienteSeleccionado ? toggleExpanded() : null"
            >
                <span class="material-icons header-icon">people</span>

                <span class="header-title">
                    {{ pacienteSeleccionado && !isExpanded
                        ? `Paciente: ${pacienteSeleccionado.nombres} ${pacienteSeleccionado.apellidos}`
                        : 'Pacientes del Cliente' }}
                </span>

                <button class="btn-nuevo" @click.stop="showModal = true">
                    <span class="material-icons">add</span>
                    Nuevo Paciente
                </button>

                <span
                    v-if="pacienteSeleccionado"
                    class="material-icons chevron-icon"
                    :class="{ rotated: isExpanded }"
                >
                    keyboard_arrow_down
                </span>
            </div>

            <!-- Lista expandida -->
            <template v-if="isExpanded">

                <!-- Sin pacientes -->
                <div v-if="pacientes.length === 0" class="pacientes-empty">
                    <div class="empty-box">
                        No hay pacientes registrados para este cliente
                    </div>
                </div>

                <!-- Con pacientes -->
                <div v-else class="pacientes-list">
                    <div
                        v-for="paciente in pacientes"
                        :key="paciente.id"
                        class="paciente-item"
                        :class="{ selected: pacienteSeleccionado?.id === paciente.id }"
                        @click="seleccionarPaciente(paciente)"
                    >
                        <div class="paciente-avatar">
                            <span class="material-icons">person</span>
                        </div>

                        <div class="paciente-info">
                            <div class="paciente-nombre">
                                {{ paciente.nombres }} {{ paciente.apellidos }}
                            </div>
                            <div class="paciente-meta">
                                <span class="material-icons">cake</span>
                                <span>{{ paciente.edad }} años</span>
                                <template v-if="paciente.ocupacion">
                                    <span class="meta-sep"></span>
                                    <span class="material-icons">work</span>
                                    <span>{{ paciente.ocupacion }}</span>
                                </template>
                            </div>
                        </div>

                        <span
                            v-if="pacienteSeleccionado?.id === paciente.id"
                            class="material-icons check-icon"
                        >
                            check_circle
                        </span>
                    </div>
                </div>

            </template>
        </div>

        <!-- Modal nuevo paciente -->
        <div class="modal-overlay" v-if="showModal" @click.self="cerrarModal">
            <div class="modal-dialog">
                <div class="modal-title">Nuevo Paciente</div>

                <div class="modal-row">
                    <div class="modal-field">
                        <label>Nombres *</label>
                        <input v-model="newPaciente.nombres" placeholder="Nombres" />
                    </div>
                    <div class="modal-field">
                        <label>Apellidos *</label>
                        <input v-model="newPaciente.apellidos" placeholder="Apellidos" />
                    </div>
                </div>

                <div class="modal-row">
                    <div class="modal-field">
                        <label>Fecha de Nacimiento</label>
                        <input v-model="newPaciente.fechanacimiento" type="date" />
                    </div>
                    <div class="modal-field">
                        <label>Ocupación</label>
                        <input v-model="newPaciente.ocupacion" placeholder="Ocupación" />
                    </div>
                </div>

                <div class="modal-field">
                    <label>Teléfono</label>
                    <input v-model="newPaciente.telefono" placeholder="Teléfono" />
                </div>

                <div class="modal-buttons">
                    <button class="btn btn-gray" @click="cerrarModal" :disabled="isCreating">
                        <span class="material-icons">close</span>
                        Cancelar
                    </button>
                    <button class="btn btn-primary" @click="crearPaciente" :disabled="isCreating">
                        <span class="material-icons">{{ isCreating ? 'hourglass_empty' : 'save' }}</span>
                        {{ isCreating ? 'Guardando...' : 'Guardar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Toast -->
        <Transition name="toast">
            <div v-if="toast.visible" class="toast" :class="toast.isError ? 'toast-error' : 'toast-success'">
                {{ toast.message }}
            </div>
        </Transition>

    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { authHeaders } from '../../services/authHeader'

const props = defineProps({
    pacientes:            { type: Array,  default: () => [] },
    pacienteSeleccionado: { type: Object, default: null },
    clienteId:            { type: Number, default: null },
})

const emit = defineEmits(['pacienteSeleccionado', 'pacienteCreado'])

// ── State ──────────────────────────────────────────────
const isExpanded = ref(true)
const showModal  = ref(false)
const isCreating = ref(false)

const newPaciente = reactive({
    nombres: '', apellidos: '', fechanacimiento: '', ocupacion: '', telefono: ''
})

const toast = reactive({ visible: false, message: '', isError: false })

// ── Watchers ───────────────────────────────────────────
// Mirror Flutter's didUpdateWidget: collapse when a patient is picked, expand when cleared
watch(() => props.pacienteSeleccionado, (next, prev) => {
    if (next && next !== prev)  isExpanded.value = false
    if (!next && prev)          isExpanded.value = true
})

// ── Helpers ────────────────────────────────────────────
const toggleExpanded = () => { isExpanded.value = !isExpanded.value }

const seleccionarPaciente = (paciente) => {
    emit('pacienteSeleccionado', paciente)
}

const cerrarModal = () => {
    if (isCreating.value) return
    showModal.value = false
    Object.keys(newPaciente).forEach(k => newPaciente[k] = '')
}

const showToast = (message, isError = false) => {
    toast.message = message
    toast.isError = isError
    toast.visible = true
    setTimeout(() => { toast.visible = false }, 3000)
}

// ── Create patient ─────────────────────────────────────
const crearPaciente = async () => {
    if (!newPaciente.nombres || !newPaciente.apellidos) {
        showToast('Por favor complete al menos Nombres y Apellidos', true)
        return
    }

    isCreating.value = true
    try {
        const response = await fetch('http://127.0.0.1:8000/pacientes/create', {
            method: 'POST',
            headers: authHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ ...newPaciente, clienteid: props.clienteId })
        })

        if (!response.ok) {
            const err = await response.json()
            throw new Error(err.detail || 'Error al crear paciente')
        }

        showToast('Paciente creado exitosamente')
        cerrarModal()
        emit('pacienteCreado')
    } catch (e) {
        showToast(`Error: ${e.message}`, true)
    } finally {
        isCreating.value = false
    }
}
</script>