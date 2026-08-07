<style scoped>
.dataclient-wrapper {
    position: relative;
    width: 93%;
    margin-top: 20px;
}

.dataclient-titulo {
    position: absolute;
    top: -14px;
    left: 120px;
    font-size: 1.6rem;
    font-weight: bold;
    background: linear-gradient(to bottom, #FB1C2E, #130348);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: 1;
}

.dataclient-container {
    background: linear-gradient(135deg, #F0F0F0, #F0F0F0);
    border: 2px solid #FB1C2E;
    border-radius: 16px;
    padding: 28px 24px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.dataclient-row {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
}

.dataclient-field {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;
}

.dataclient-field label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #130348;
}

.dataclient-field input {
    padding: 7px 10px;
    border: 1px solid #BCBCBC;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #130348;
    background: white;
    transition: border-color 0.2s;
    outline: none;
}

.dataclient-field input:focus {
    border-color: #130348;
    border-width: 2px;
}

.dataclient-field input.blocked {
    background-color: #E0E0E0;
    color: #555;
}

/* Botones */
.dataclient-buttons {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 8px;
    flex: 1;
    padding-top: 18px;
}

.btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn .material-icons {
    font-size: 16px;
}

.btn-primary { background-color: #130348; color: white; }
.btn-danger  { background-color: #FB1C2E; color: white; }
.btn-blue    { background-color: #4A90E2; color: white; }
.btn-gray    { background-color: #6C757D; color: white; }

.btn:not(:disabled):hover {
    opacity: 0.85;
}

/* Confirm dialog */
.confirm-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.confirm-dialog {
    background: white;
    border-radius: 12px;
    padding: 28px 32px;
    min-width: 320px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.confirm-dialog h3 {
    color: #130348;
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.confirm-dialog p {
    color: #555;
    margin-bottom: 20px;
}

.confirm-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

/* Toast */
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
    <div class="dataclient-wrapper">

        <!-- Título flotante -->
        <div class="dataclient-titulo">Cliente</div>

        <!-- Contenedor principal -->
        <div class="dataclient-container">

            <!-- Fila 1: Nombres, Apellidos, RFC -->
            <div class="dataclient-row">
                <div class="dataclient-field">
                    <label>Nombres</label>
                    <input v-model="form.nombres" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>Apellidos</label>
                    <input v-model="form.apellidos" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>RFC</label>
                    <input v-model="form.rfc" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
            </div>

            <!-- Fila 2: Email, Teléfono, Contacto -->
            <div class="dataclient-row">
                <div class="dataclient-field">
                    <label>Email</label>
                    <input v-model="form.email" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>Teléfono</label>
                    <input v-model="form.telefono" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>Contacto</label>
                    <input v-model="form.contacto" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
            </div>

            <!-- Fila 3: Calle, Colonia, Ciudad -->
            <div class="dataclient-row">
                <div class="dataclient-field">
                    <label>Calle</label>
                    <input v-model="form.calle" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>Colonia</label>
                    <input v-model="form.colonia" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>Ciudad</label>
                    <input v-model="form.ciudad" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
            </div>

            <!-- Fila 4: Estado, Código Postal, Botones -->
            <div class="dataclient-row">
                <div class="dataclient-field">
                    <label>Estado</label>
                    <input v-model="form.estado" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>
                <div class="dataclient-field">
                    <label>Código Postal</label>
                    <input v-model="form.codigopostal" :disabled="hasClient && !isEditing" :class="{ blocked: hasClient && !isEditing }" />
                </div>

                <!-- Botones -->
                <div class="dataclient-buttons">

                    <!-- Sin cliente: Agregar + Cancelar -->
                    <template v-if="!hasClient">
                        <button class="btn btn-primary" @click="handleAgregar" :disabled="isLoading">
                            <span class="material-icons">{{ isLoading ? 'hourglass_empty' : 'add' }}</span>
                            {{ isLoading ? 'Agregando...' : 'Agregar' }}
                        </button>
                        <button class="btn btn-gray" @click="handleCancelar" :disabled="isLoading">
                            <span class="material-icons">close</span>
                            Cancelar
                        </button>
                    </template>

                    <!-- Con cliente, modo vista: Limpiar + Modificar + Borrar -->
                    <template v-else-if="!isEditing">
                        <button class="btn btn-blue" @click="handleLimpiar" :disabled="isLoading">
                            <span class="material-icons">cleaning_services</span>
                            Limpiar
                        </button>
                        <button class="btn btn-primary" @click="handleIniciarEdicion" :disabled="isLoading">
                            <span class="material-icons">edit</span>
                            Modificar
                        </button>
                        <button class="btn btn-danger" @click="handleBorrar" :disabled="isLoading">
                            <span class="material-icons">delete</span>
                            Borrar
                        </button>
                    </template>

                    <!-- Con cliente, modo edición: Guardar + Cancelar -->
                    <template v-else>
                        <button class="btn btn-primary" @click="handleModificar" :disabled="isLoading">
                            <span class="material-icons">{{ isLoading ? 'hourglass_empty' : 'save' }}</span>
                            {{ isLoading ? 'Guardando...' : 'Guardar' }}
                        </button>
                        <button class="btn btn-gray" @click="handleCancelar" :disabled="isLoading">
                            <span class="material-icons">close</span>
                            Cancelar
                        </button>
                    </template>

                </div>
            </div>

        </div>

        <!-- Dialog de confirmación -->
        <div class="confirm-overlay" v-if="showConfirm">
            <div class="confirm-dialog">
                <h3>Confirmar eliminación</h3>
                <p>¿Está seguro de que desea eliminar este cliente?</p>
                <div class="confirm-buttons">
                    <button class="btn btn-gray" @click="showConfirm = false">Cancelar</button>
                    <button class="btn btn-danger" @click="confirmDelete">Eliminar</button>
                </div>
            </div>
        </div>

        <!-- Notificación -->
        <Transition name="toast">
            <div v-if="toast.visible" class="toast" :class="toast.isError ? 'toast-error' : 'toast-success'">
                {{ toast.message }}
            </div>
        </Transition>

    </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'

const props = defineProps({
    cliente: { type: Object, default: null }
})

const emit = defineEmits(['clienteActualizado', 'clienteEliminado', 'limpiarBusqueda'])

const hasClient = ref(false)
const isLoading = ref(false)
const isEditing = ref(false)
const showConfirm = ref(false)
const toast = reactive({ visible: false, message: '', isError: false })

const form = reactive({
    nombres: '', apellidos: '', rfc: '', email: '',
    telefono: '', contacto: '', calle: '', numero: '',
    colonia: '', ciudad: '', estado: '', codigopostal: ''
})

const cargarCliente = (cliente) => {
    form.nombres      = cliente.nombres      || ''
    form.apellidos    = cliente.apellidos    || ''
    form.rfc          = cliente.rfc          || ''
    form.email        = cliente.email        || ''
    form.telefono     = cliente.telefono     || ''
    form.contacto     = cliente.contacto     || ''
    form.calle        = cliente.calle        || ''
    form.numero       = cliente.numero       || ''
    form.colonia      = cliente.colonia      || ''
    form.ciudad       = cliente.ciudad       || ''
    form.estado       = cliente.estado       || ''
    form.codigopostal = cliente.codigopostal || ''
    hasClient.value   = true
    isEditing.value   = false
}

const limpiarCampos = () => {
    Object.keys(form).forEach(k => form[k] = '')
    hasClient.value = false
    isEditing.value = false
}

const showToast = (message, isError = false) => {
    toast.message = message
    toast.isError = isError
    toast.visible = true
    setTimeout(() => { toast.visible = false }, 3000)
}

const handleAgregar = async () => {
    if (!form.nombres || !form.apellidos) {
        showToast('Por favor complete al menos Nombres y Apellidos', true)
        return
    }
    isLoading.value = true
    try {
        const response = await fetch('http://127.0.0.1:8000/cliente/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, tipocliente: 1 })
        })
        if (!response.ok) {
            const err = await response.json()
            throw new Error(err.detail || 'Error al crear cliente')
        }
        const nuevoCliente = await response.json()
        hasClient.value = true
        showToast('Cliente agregado exitosamente')
        emit('clienteActualizado', nuevoCliente)
    } catch (e) {
        showToast(`Error: ${e.message}`, true)
    } finally {
        isLoading.value = false
    }
}

const handleModificar = async () => {
    if (!props.cliente) return
    if (!form.nombres || !form.apellidos) {
        showToast('Por favor complete al menos Nombres y Apellidos', true)
        return
    }
    isLoading.value = true
    try {
        const response = await fetch(`http://127.0.0.1:8000/cliente/update/${props.cliente.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, tipocliente: props.cliente.tipocliente ?? 1 })
        })
        if (!response.ok) {
            const err = await response.json()
            throw new Error(err.detail || 'Error al modificar cliente')
        }
        const clienteActualizado = await response.json()
        isEditing.value = false
        showToast('Cliente modificado exitosamente')
        emit('clienteActualizado', clienteActualizado)
    } catch (e) {
        showToast(`Error: ${e.message}`, true)
    } finally {
        isLoading.value = false
    }
}

const handleBorrar = () => {
    if (!props.cliente) return
    showConfirm.value = true
}

const confirmDelete = async () => {
    showConfirm.value = false
    isLoading.value = true
    try {
        const response = await fetch(`http://127.0.0.1:8000/cliente/delete/${props.cliente.id}`, {
            method: 'DELETE'
        })
        if (!response.ok) throw new Error('Error al eliminar cliente')
        showToast('Cliente eliminado exitosamente')
        limpiarCampos()
        emit('clienteEliminado')
    } catch (e) {
        showToast(`Error: ${e.message}`, true)
    } finally {
        isLoading.value = false
    }
}

const handleIniciarEdicion = () => { isEditing.value = true }

const handleCancelar = () => {
    if (hasClient.value && isEditing.value) {
        isEditing.value = false
        cargarCliente(props.cliente)
    } else {
        limpiarCampos()
        emit('clienteEliminado')
    }
}

const handleLimpiar = () => {
    limpiarCampos()
    emit('clienteEliminado')
    emit('limpiarBusqueda')
}

// ✅ watch al final, después de que todas las funciones están definidas
watch(() => props.cliente, (nuevoCliente) => {
    if (nuevoCliente) {
        cargarCliente(nuevoCliente)
    } else {
        limpiarCampos()
    }
}, { immediate: true })
</script>