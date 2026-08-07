<style scoped>
/* ── Overlay ── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

/* ── Dialog ── */
.modal-dialog {
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #F0F0F0, #BCBCBC);
    border: 2px solid #FB1C2E;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    overflow: hidden;
}

/* ── Header ── */
.modal-header {
    padding: 16px 20px;
    background-color: #130348;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-shrink: 0;
}

.modal-header-left { display: flex; flex-direction: column; gap: 4px; }

.modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin: 0;
}

.modal-breadcrumb {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: #BCBCBC;
}

.modal-breadcrumb a {
    color: #BCBCBC;
    text-decoration: underline;
    cursor: pointer;
}

.modal-breadcrumb span { color: white; }

.btn-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
}

.btn-close:hover { background: rgba(255,255,255,0.1); }

/* ── Actions bar ── */
.modal-actions-bar {
    padding: 10px 24px;
    background: #E8E8E8;
    border-bottom: 1px solid #CCCCCC;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
}

.btn-save {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background-color: #28A745;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-save:hover:not(:disabled) { opacity: 0.85; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-save .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Scrollable body ── */
.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 28px;
}

/* ── Sections ── */
.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #130348;
    margin: 0 0 16px;
    padding-bottom: 6px;
    border-bottom: 2px solid #130348;
}

/* ── Form grid ── */
.form-row {
    display: flex;
    gap: 16px;
}

.form-field {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 6px;
}

.form-field label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #333333;
}

.form-field label .req { color: #FB1C2E; }

.form-input, .form-select {
    padding: 10px 14px;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #333333;
    background: white;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
}

.form-input:focus, .form-select:focus {
    border-color: #130348;
    border-width: 2px;
}

.form-input.error, .form-select.error { border-color: #FB1C2E; }

.field-error {
    font-size: 0.75rem;
    color: #FB1C2E;
}

/* Password wrapper */
.pw-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.pw-wrapper .form-input { padding-right: 40px; }

.btn-toggle-pw {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    padding: 0;
}

.btn-toggle-pw .material-icons { font-size: 20px; }

/* ── Chips grid ── */
.chips-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    min-height: 52px;
}

.chip-option {
    padding: 5px 14px;
    border-radius: 20px;
    border: 2px solid #BCBCBC;
    background: white;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    color: #333333;
}

.chip-option:hover { border-color: #130348; color: #130348; }

.chip-option.selected {
    background-color: #130348;
    border-color: #130348;
    color: white;
}

/* ── Global error banner ── */
.error-banner {
    padding: 10px 16px;
    background: #FFF0F0;
    border: 1px solid #FB1C2E;
    border-radius: 6px;
    color: #FB1C2E;
    font-size: 0.875rem;
}
</style>

<template>
    <Teleport to="body">
        <div class="modal-overlay" @click.self="$emit('close')">
            <div class="modal-dialog">

                <!-- Header -->
                <div class="modal-header">
                    <div class="modal-header-left">
                        <h2 class="modal-title">Crear nuevo usuario</h2>
                        <div class="modal-breadcrumb">
                            <a>Inicio</a>
                            <span class="material-icons" style="font-size:12px">chevron_right</span>
                            <a>Usuarios</a>
                            <span class="material-icons" style="font-size:12px">chevron_right</span>
                            <span>Crear usuario</span>
                        </div>
                    </div>
                    <button class="btn-close" @click="$emit('close')">
                        <span class="material-icons">close</span>
                    </button>
                </div>

                <!-- Actions bar -->
                <div class="modal-actions-bar">
                    <button class="btn-save" :disabled="isLoading" @click="handleSubmit">
                        <span v-if="isLoading" class="spinner"></span>
                        <span v-else class="material-icons">save</span>
                        {{ isLoading ? 'Guardando...' : 'Crear Usuario' }}
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">

                    <!-- Global error -->
                    <div v-if="globalError" class="error-banner">{{ globalError }}</div>

                    <!-- Cuenta -->
                    <section>
                        <p class="section-title">Cuenta</p>
                        <div class="form-row">
                            <div class="form-field">
                                <label>Nombres <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.nombres }" v-model="form.nombres" placeholder="Nombres" />
                                <span v-if="errors.nombres" class="field-error">{{ errors.nombres }}</span>
                            </div>
                            <div class="form-field">
                                <label>Apellidos <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.apellidos }" v-model="form.apellidos" placeholder="Apellidos" />
                                <span v-if="errors.apellidos" class="field-error">{{ errors.apellidos }}</span>
                            </div>
                        </div>
                        <div class="form-row" style="margin-top: 14px;">
                            <div class="form-field">
                                <label>Usuario <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.usuario }" v-model="form.usuario" placeholder="Nombre de usuario" />
                                <span v-if="errors.usuario" class="field-error">{{ errors.usuario }}</span>
                            </div>
                            <div class="form-field">
                                <label>Correo electrónico <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.email }" v-model="form.email" placeholder="correo@ejemplo.com" type="email" />
                                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                            </div>
                        </div>
                        <div class="form-row" style="margin-top: 14px;">
                            <div class="form-field">
                                <label>Teléfono</label>
                                <input class="form-input" v-model="form.telefono" placeholder="Teléfono" />
                            </div>
                            <!-- spacer -->
                            <div class="form-field" style="visibility: hidden;" aria-hidden="true"></div>
                        </div>
                        <div class="form-row" style="margin-top: 14px;">
                            <div class="form-field">
                                <label>Contraseña <span class="req">*</span></label>
                                <div class="pw-wrapper">
                                    <input
                                        class="form-input"
                                        :class="{ error: errors.password }"
                                        v-model="form.password"
                                        :type="showPassword ? 'text' : 'password'"
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <button class="btn-toggle-pw" type="button" @click="showPassword = !showPassword">
                                        <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                                    </button>
                                </div>
                                <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
                            </div>
                            <div class="form-field">
                                <label>Confirmar contraseña <span class="req">*</span></label>
                                <div class="pw-wrapper">
                                    <input
                                        class="form-input"
                                        :class="{ error: errors.confirmPassword }"
                                        v-model="form.confirmPassword"
                                        :type="showConfirmPassword ? 'text' : 'password'"
                                        placeholder="Repetir contraseña"
                                    />
                                    <button class="btn-toggle-pw" type="button" @click="showConfirmPassword = !showConfirmPassword">
                                        <span class="material-icons">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
                                    </button>
                                </div>
                                <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
                            </div>
                        </div>
                    </section>

                    <!-- Sucursales -->
                    <section>
                        <p class="section-title">Sucursales</p>
                        <div class="form-field" style="margin-bottom: 14px;">
                            <label>Sucursal predeterminada <span class="req">*</span></label>
                            <select class="form-select" :class="{ error: errors.sucursal }" v-model="form.sucursal" :disabled="catalogLoading">
                                <option :value="null">{{ catalogLoading ? 'Cargando...' : 'Seleccionar sucursal predeterminada' }}</option>
                                <option
                                    v-for="suc in sucursalesDisponibles"
                                    :key="suc.id"
                                    :value="suc.id"
                                >{{ suc.sucursal }}</option>
                            </select>
                            <span v-if="errors.sucursal" class="field-error">{{ errors.sucursal }}</span>
                        </div>
                        <div class="form-field">
                            <label>Sucursales de acceso <span class="req">*</span></label>
                            <div class="chips-grid">
                                <button
                                    v-for="suc in allSucursales"
                                    :key="suc.id"
                                    type="button"
                                    class="chip-option"
                                    :class="{ selected: form.sucursalesAcceso.includes(suc.id) }"
                                    @click="toggleSucursal(suc.id)"
                                >{{ suc.sucursal }}</button>
                            </div>
                            <span v-if="errors.sucursalesAcceso" class="field-error">{{ errors.sucursalesAcceso }}</span>
                        </div>
                    </section>

                    <!-- Roles -->
                    <section>
                        <p class="section-title">Roles</p>
                        <div class="form-field">
                            <div class="chips-grid">
                                <button
                                    v-for="rol in allRoles"
                                    :key="rol.id"
                                    type="button"
                                    class="chip-option"
                                    :class="{ selected: form.roles.includes(rol.id) }"
                                    @click="toggleRol(rol.id)"
                                >{{ rol.rol }}</button>
                            </div>
                            <span v-if="errors.roles" class="field-error">{{ errors.roles }}</span>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['close', 'created'])

// ── Catalogs ───────────────────────────────────────────
const allSucursales  = ref([])
const allRoles       = ref([])
const catalogLoading = ref(false)

onMounted(async () => {
    catalogLoading.value = true
    try {
        const [sucRes, rolesRes] = await Promise.all([
            fetch('http://127.0.0.1:8000/sucursales/all'),
            fetch('http://127.0.0.1:8000/users_roles/all'),
        ])
        allSucursales.value = await sucRes.json()
        allRoles.value      = await rolesRes.json()
    } catch (e) {
        console.error('Error cargando catálogos:', e)
    } finally {
        catalogLoading.value = false
    }
})

// Only sucursales already selected for access can be set as default
const sucursalesDisponibles = computed(() =>
    allSucursales.value.filter(s => form.value.sucursalesAcceso.includes(s.id))
)

// ── Form state ─────────────────────────────────────────
const form = ref({
    nombres:          '',
    apellidos:        '',
    usuario:          '',
    email:            '',
    telefono:         '',
    password:         '',
    confirmPassword:  '',
    sucursal:         null,
    sucursalesAcceso: [],
    roles:            [],
})

const errors        = ref({})
const globalError   = ref(null)
const isLoading     = ref(false)
const showPassword        = ref(false)
const showConfirmPassword = ref(false)

// ── Toggle helpers ─────────────────────────────────────
const toggleSucursal = (id) => {
    const idx = form.value.sucursalesAcceso.indexOf(id)
    if (idx === -1) {
        form.value.sucursalesAcceso.push(id)
    } else {
        form.value.sucursalesAcceso.splice(idx, 1)
        // Clear default if it was this one
        if (form.value.sucursal === id) form.value.sucursal = null
    }
}

const toggleRol = (id) => {
    const idx = form.value.roles.indexOf(id)
    if (idx === -1) form.value.roles.push(id)
    else            form.value.roles.splice(idx, 1)
}

// ── Validation ─────────────────────────────────────────
const validate = () => {
    const e = {}
    if (!form.value.nombres.trim())        e.nombres        = 'Campo requerido'
    if (!form.value.apellidos.trim())      e.apellidos      = 'Campo requerido'
    if (!form.value.usuario.trim())        e.usuario        = 'Campo requerido'
    if (!form.value.email.trim())          e.email          = 'Campo requerido'
    else if (!form.value.email.includes('@')) e.email       = 'Email inválido'
    if (!form.value.password)              e.password       = 'Campo requerido'
    else if (form.value.password.length < 6) e.password     = 'Mínimo 6 caracteres'
    if (!form.value.confirmPassword)       e.confirmPassword = 'Campo requerido'
    else if (form.value.password !== form.value.confirmPassword)
                                           e.confirmPassword = 'Las contraseñas no coinciden'
    if (form.value.sucursalesAcceso.length === 0) e.sucursalesAcceso = 'Selecciona al menos una sucursal'
    if (!form.value.sucursal)             e.sucursal        = 'Selecciona la sucursal predeterminada'
    if (form.value.roles.length === 0)    e.roles           = 'Selecciona al menos un rol'
    errors.value = e
    return Object.keys(e).length === 0
}

// ── Submit ─────────────────────────────────────────────
const handleSubmit = async () => {
    globalError.value = null
    if (!validate()) return

    isLoading.value = true
    try {
        const res = await fetch('http://127.0.0.1:8000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombres:         form.value.nombres,
                apellidos:       form.value.apellidos,
                usuario:         form.value.usuario,
                email:           form.value.email,
                telefono:        form.value.telefono,
                password:        form.value.password,
                Sucursal:        form.value.sucursal,
                sucursal_acces:  form.value.sucursalesAcceso,
                roles:           form.value.roles,
            }),
        })

        if (!res.ok) {
            const data = await res.json()
            globalError.value = data.detail ?? 'Error al crear el usuario'
            return
        }

        emit('created')
        emit('close')
    } catch (e) {
        globalError.value = `Error de conexión: ${e.message}`
    } finally {
        isLoading.value = false
    }
}
</script>