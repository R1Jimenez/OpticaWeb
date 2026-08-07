<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-dialog {
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #F0F0F0, #BCBCBC);
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background-color: #130348;
    border-radius: 23px 23px 0 0;
    flex-shrink: 0;
}

.header-left { display: flex; flex-direction: column; gap: 4px; }

.header-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: #BCBCBC;
}

.breadcrumb .current { color: white; }

.btn-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: background 0.15s;
}

.btn-close:hover { background: rgba(255,255,255,0.15); }
.btn-close .material-icons { font-size: 22px; }

.modal-actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px 24px;
    background-color: #E8E8E8;
    border-bottom: 1px solid #CCCCCC;
    flex-shrink: 0;
}

.btn-crear {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    background-color: #28A745;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-crear:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-crear:not(:disabled):hover { opacity: 0.85; }
.btn-crear .material-icons { font-size: 18px; }

.modal-content {
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #130348;
    margin-bottom: 4px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-field label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #130348;
}

.form-field input,
.form-field select {
    padding: 10px 12px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #130348;
    outline: none;
    transition: border-color 0.2s;
}

.form-field input:focus,
.form-field select:focus {
    border-color: #130348;
    border-width: 2px;
}

.form-field input.error,
.form-field select.error {
    border-color: #FB1C2E;
}

.field-error {
    font-size: 0.75rem;
    color: #FB1C2E;
}

.form-row {
    display: flex;
    gap: 16px;
}

.form-row .form-field { flex: 1; }

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
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.toast-success { background-color: #2e7d32; }
.toast-error   { background-color: #FB1C2E; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>

<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-dialog">

            <div class="modal-header">
                <div class="header-left">
                    <span class="header-title">Nueva Sucursal</span>
                    <div class="breadcrumb">
                        <span>Inicio</span>
                        <span>/</span>
                        <span>Sucursales</span>
                        <span>/</span>
                        <span class="current">Nueva Sucursal</span>
                    </div>
                </div>
                <button class="btn-close" @click="$emit('close')">
                    <span class="material-icons">close</span>
                </button>
            </div>

            <div class="modal-actions">
                <button class="btn-crear" @click="crearSucursal" :disabled="isLoading">
                    <span class="material-icons">{{ isLoading ? 'hourglass_empty' : 'add' }}</span>
                    {{ isLoading ? 'Creando...' : 'Crear' }}
                </button>
            </div>

            <div class="modal-content">
                <div class="section-title">Información General</div>

                <div class="form-field">
                    <label>Nombre de Sucursal *</label>
                    <input
                        v-model="form.sucursal"
                        placeholder="Nombre de Sucursal"
                        :class="{ error: errors.sucursal }"
                    />
                    <span v-if="errors.sucursal" class="field-error">{{ errors.sucursal }}</span>
                </div>

                <div class="form-row">
                    <div class="form-field">
                        <label>Tipo de Sucursal *</label>
                        <select v-model="form.tipo_sucursal_id" :class="{ error: errors.tipo_sucursal_id }">
                            <option :value="null" disabled>Seleccionar tipo...</option>
                            <option v-for="tipo in tiposSucursal" :key="tipo.id" :value="tipo.id">
                                {{ tipo.tipo }}
                            </option>
                        </select>
                        <span v-if="errors.tipo_sucursal_id" class="field-error">{{ errors.tipo_sucursal_id }}</span>
                    </div>
                    <div class="form-field">
                        <label>Estado *</label>
                        <select v-model="form.estado_sucursal_id" :class="{ error: errors.estado_sucursal_id }">
                            <option :value="null" disabled>Seleccionar estado...</option>
                            <option v-for="estado in estadosSucursal" :key="estado.id" :value="estado.id">
                                {{ estado.estado }}
                            </option>
                        </select>
                        <span v-if="errors.estado_sucursal_id" class="field-error">{{ errors.estado_sucursal_id }}</span>
                    </div>
                </div>

                <div class="form-field">
                    <label>Dependencia *</label>
                    <input
                        v-model="form.dependencia"
                        placeholder="Dependencia"
                        :class="{ error: errors.dependencia }"
                    />
                    <span v-if="errors.dependencia" class="field-error">{{ errors.dependencia }}</span>
                </div>

                <div class="form-row">
                    <div class="form-field">
                        <label>Tipo de Moneda *</label>
                        <input
                            v-model="form.mondeda"
                            placeholder="Ej. MXN, USD"
                            :class="{ error: errors.mondeda }"
                        />
                        <span v-if="errors.mondeda" class="field-error">{{ errors.mondeda }}</span>
                    </div>
                    <div class="form-field">
                        <label>Razón Social *</label>
                        <input
                            v-model="form.razon_social"
                            placeholder="Razón Social"
                            :class="{ error: errors.razon_social }"
                        />
                        <span v-if="errors.razon_social" class="field-error">{{ errors.razon_social }}</span>
                    </div>
                </div>
            </div>

        </div>

        <Transition name="toast">
            <div v-if="toast.visible" class="toast" :class="toast.isError ? 'toast-error' : 'toast-success'">
                {{ toast.message }}
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCatalogos, createSucursal } from '../../../services/SucursalesServices'

const emit = defineEmits(['close', 'sucursalCreada'])

const tiposSucursal   = ref([])
const estadosSucursal = ref([])

onMounted(async () => {
    try {
        const { tiposSucursal: tipos, estadosSucursal: estados } = await getCatalogos()
        tiposSucursal.value   = tipos
        estadosSucursal.value = estados
    } catch (e) {
        console.error('Error cargando catálogos:', e)
    }
})

const form = reactive({
    sucursal:          '',
    tipo_sucursal_id:  null,
    estado_sucursal_id: null,
    dependencia:       '',
    mondeda:           '',
    razon_social:      '',
})

const errors    = reactive({})
const isLoading = ref(false)
const toast     = reactive({ visible: false, message: '', isError: false })

const validate = () => {
    Object.keys(errors).forEach(k => delete errors[k])
    if (!form.sucursal)           errors.sucursal          = 'Campo requerido'
    if (!form.tipo_sucursal_id)   errors.tipo_sucursal_id  = 'Debe seleccionar un tipo'
    if (!form.estado_sucursal_id) errors.estado_sucursal_id = 'Debe seleccionar un estado'
    if (!form.dependencia)        errors.dependencia        = 'Campo requerido'
    if (!form.mondeda)            errors.mondeda            = 'Campo requerido'
    if (!form.razon_social)       errors.razon_social       = 'Campo requerido'
    return Object.keys(errors).length === 0
}

const showToast = (message, isError = false) => {
    toast.message = message
    toast.isError = isError
    toast.visible = true
    setTimeout(() => { toast.visible = false }, 3000)
}

const crearSucursal = async () => {
    if (!validate()) return

    isLoading.value = true
    try {
        await createSucursal({ ...form })
        showToast('Sucursal creada exitosamente')
        setTimeout(() => {
            emit('sucursalCreada')
            emit('close')
        }, 1000)
    } catch (e) {
        showToast(`Error: ${e.message}`, true)
    } finally {
        isLoading.value = false
    }
}
</script>