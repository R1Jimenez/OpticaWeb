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
    align-items: center;
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

.modal-breadcrumb a { color: #BCBCBC; text-decoration: underline; cursor: pointer; }
.modal-breadcrumb .current { color: #63B3ED; }

.modal-header-actions { display: flex; align-items: center; gap: 10px; }

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

.btn-change-pw {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: transparent;
    color: #CCCCCC;
    border: 1px solid #CCCCCC;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
}
.btn-change-pw:hover { background: rgba(255,255,255,0.1); }
.btn-change-pw .material-icons { font-size: 16px; }

.btn-save {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 18px;
    background-color: #28A745;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}
.btn-save:hover:not(:disabled) { opacity: 0.85; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-save .spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Body ── */
.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 28px;
}

/* ── Section title ── */
.section-title {
    padding: 10px 14px;
    background-color: #130348;
    color: white;
    font-size: 0.95rem;
    font-weight: 700;
    border-radius: 4px;
    margin: 0 0 16px;
}

/* ── Form ── */
.form-row { display: flex; gap: 16px; }
.form-row + .form-row { margin-top: 14px; }

.form-field {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 6px;
}

.form-field label { font-size: 0.875rem; font-weight: 600; color: #333333; }
.form-field label .req { color: #FB1C2E; }

.form-input, .form-select {
    padding: 10px 14px;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #333333;
    background: #F5F5F5;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
    width: 100%;
}
.form-input:focus, .form-select:focus { border-color: #130348; border-width: 2px; }
.form-input.error, .form-select.error { border-color: #FB1C2E; }

.field-error { font-size: 0.75rem; color: #FB1C2E; }

/* ── Two-column section layout ── */
.two-col { display: flex; gap: 24px; align-items: flex-start; }
.two-col > * { flex: 1; }

/* ── Chips ── */
.chips-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
    background: #F5F5F5;
    border: 1px solid #CCCCCC;
    border-radius: 6px;
    min-height: 56px;
}

/* selected chips (active items) */
.chip-active {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: #4A90E2;
    color: white;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}
.chip-active button {
    background: none; border: none; color: white;
    cursor: pointer; padding: 0; display: flex; align-items: center;
}
.chip-active .material-icons { font-size: 14px; }

/* available chips (inactive / not selected) */
.chip-option {
    padding: 4px 12px;
    background: #E0E0E0;
    color: #333333;
    border: none;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
}
.chip-option:hover { background: #BCBCBC; }

.chips-counter {
    font-size: 0.78rem;
    color: #666666;
    margin-top: 6px;
}

/* ── Error banner ── */
.error-banner {
    padding: 10px 16px;
    background: #FFF0F0;
    border: 1px solid #FB1C2E;
    border-radius: 6px;
    color: #FB1C2E;
    font-size: 0.875rem;
}

/* ────────────────────────────────
   Change-password nested modal
   ──────────────────────────────── */
.pw-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
}

.pw-dialog {
    width: 420px;
    background: linear-gradient(135deg, #F0F0F0, #BCBCBC);
    border: 2px solid #FB1C2E;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.pw-header {
    padding: 14px 18px;
    background: #130348;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pw-header span { color: white; font-size: 1rem; font-weight: 700; }

.pw-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.pw-actions {
    padding: 12px 20px;
    background: #E8E8E8;
    border-top: 1px solid #CCCCCC;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn-cancel {
    padding: 7px 16px;
    background: transparent;
    color: #130348;
    border: 2px solid #130348;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
}

.pw-wrapper { position: relative; display: flex; align-items: center; }
.pw-wrapper .form-input { padding-right: 40px; }
.btn-toggle-pw {
    position: absolute; right: 10px;
    background: none; border: none; cursor: pointer;
    color: #666; display: flex; align-items: center; padding: 0;
}
.btn-toggle-pw .material-icons { font-size: 20px; }
</style>

<template>
    <Teleport to="body">
        <div class="modal-overlay" @click.self="$emit('close')">
            <div class="modal-dialog">

                <!-- Header -->
                <div class="modal-header">
                    <div class="modal-header-left">
                        <h2 class="modal-title">Editar usuario</h2>
                        <div class="modal-breadcrumb">
                            <a>Inicio</a>
                            <span class="material-icons" style="font-size:12px">chevron_right</span>
                            <a>Usuarios</a>
                            <span class="material-icons" style="font-size:12px">chevron_right</span>
                            <span class="current">{{ usuario.usuario }}</span>
                        </div>
                    </div>
                    <div class="modal-header-actions">
                        <button class="btn-change-pw" @click="showChangePw = true">
                            <span class="material-icons">lock</span>
                            Cambiar contraseña
                        </button>
                        <button class="btn-save" :disabled="isLoading" @click="handleSubmit">
                            <span v-if="isLoading" class="spinner"></span>
                            <span v-else class="material-icons">save</span>
                            {{ isLoading ? 'Guardando...' : 'Guardar' }}
                        </button>
                        <button class="btn-close" @click="$emit('close')">
                            <span class="material-icons">close</span>
                        </button>
                    </div>
                </div>

                <!-- Body -->
                <div class="modal-body">

                    <div v-if="globalError" class="error-banner">{{ globalError }}</div>

                    <!-- Cuenta -->
                    <section>
                        <p class="section-title">Cuenta</p>
                        <div class="form-row">
                            <div class="form-field">
                                <label>Nombre(s) <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.nombres }" v-model="form.nombres" />
                                <span v-if="errors.nombres" class="field-error">{{ errors.nombres }}</span>
                            </div>
                            <div class="form-field">
                                <label>Usuario <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.usuario }" v-model="form.usuario" />
                                <span v-if="errors.usuario" class="field-error">{{ errors.usuario }}</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-field">
                                <label>Apellido(s) <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.apellidos }" v-model="form.apellidos" />
                                <span v-if="errors.apellidos" class="field-error">{{ errors.apellidos }}</span>
                            </div>
                            <div class="form-field">
                                <label>Correo electrónico <span class="req">*</span></label>
                                <input class="form-input" type="email" :class="{ error: errors.email }" v-model="form.email" />
                                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-field" style="max-width: 50%;">
                                <label>Teléfono <span class="req">*</span></label>
                                <input class="form-input" :class="{ error: errors.telefono }" v-model="form.telefono" />
                                <span v-if="errors.telefono" class="field-error">{{ errors.telefono }}</span>
                            </div>
                        </div>
                    </section>

                    <!-- Sucursales + Roles side by side -->
                    <div class="two-col">

                        <!-- Sucursales -->
                        <section>
                            <p class="section-title">Sucursales</p>

                            <div class="form-field" style="margin-bottom: 16px;">
                                <label>Sucursal predeterminada <span class="req">*</span></label>
                                <select class="form-select" :class="{ error: errors.sucursal }" v-model="form.sucursal" :disabled="catalogLoading">
                                    <option :value="null">Seleccionar...</option>
                                    <option v-for="suc in allSucursales" :key="suc.id" :value="suc.id">
                                        {{ suc.sucursal }}
                                    </option>
                                </select>
                                <span v-if="errors.sucursal" class="field-error">{{ errors.sucursal }}</span>
                            </div>

                            <label style="font-size:0.875rem; font-weight:600; color:#333; margin-bottom:6px; display:block;">
                                Con acceso
                            </label>

                            <!-- Active chips (selected) -->
                            <div class="chips-box">
                                <span
                                    v-for="id in form.sucursalesAcceso"
                                    :key="id"
                                    class="chip-active"
                                >
                                    {{ getSucursalNombre(id) }}
                                    <button @click="toggleSucursal(id)">
                                        <span class="material-icons">close</span>
                                    </button>
                                </span>
                                <span v-if="form.sucursalesAcceso.length === 0" style="color:#999; font-size:0.82rem;">
                                    Ninguna seleccionada
                                </span>
                            </div>
                            <p class="chips-counter">
                                {{ form.sucursalesAcceso.length }} de {{ allSucursales.length }} sucursales
                            </p>

                            <!-- Available chips (not yet selected) -->
                            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">
                                <button
                                    v-for="suc in availableSucursales"
                                    :key="suc.id"
                                    type="button"
                                    class="chip-option"
                                    @click="toggleSucursal(suc.id)"
                                >{{ suc.sucursal }}</button>
                            </div>
                            <span v-if="errors.sucursalesAcceso" class="field-error">{{ errors.sucursalesAcceso }}</span>
                        </section>

                        <!-- Roles -->
                        <section>
                            <p class="section-title">Roles</p>
                            <p class="chips-counter" style="margin-bottom:10px;">
                                {{ form.roles.length }} de {{ allRoles.length }} roles seleccionados
                            </p>

                            <!-- Active chips -->
                            <div class="chips-box">
                                <span
                                    v-for="id in form.roles"
                                    :key="id"
                                    class="chip-active"
                                >
                                    {{ getRolNombre(id) }}
                                    <button @click="toggleRol(id)">
                                        <span class="material-icons">close</span>
                                    </button>
                                </span>
                                <span v-if="form.roles.length === 0" style="color:#999; font-size:0.82rem;">
                                    Ninguno seleccionado
                                </span>
                            </div>

                            <!-- Available chips -->
                            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:10px;">
                                <button
                                    v-for="rol in availableRoles"
                                    :key="rol.id"
                                    type="button"
                                    class="chip-option"
                                    @click="toggleRol(rol.id)"
                                >{{ rol.rol }}</button>
                            </div>
                            <span v-if="errors.roles" class="field-error">{{ errors.roles }}</span>
                        </section>

                    </div>
                </div>
            </div>
        </div>

        <!-- ── Change password nested modal ── -->
        <div v-if="showChangePw" class="pw-overlay" @click.self="showChangePw = false">
            <div class="pw-dialog">
                <div class="pw-header">
                    <span>Cambiar contraseña — {{ usuario.usuario }}</span>
                    <button class="btn-close" @click="showChangePw = false">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                <div class="pw-body">
                    <div v-if="pwError" class="error-banner">{{ pwError }}</div>
                    <div class="form-field">
                        <label>Nueva contraseña <span class="req">*</span></label>
                        <div class="pw-wrapper">
                            <input
                                class="form-input"
                                :type="showPw1 ? 'text' : 'password'"
                                v-model="pwForm.password"
                                placeholder="Mínimo 6 caracteres"
                            />
                            <button class="btn-toggle-pw" type="button" @click="showPw1 = !showPw1">
                                <span class="material-icons">{{ showPw1 ? 'visibility_off' : 'visibility' }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="form-field">
                        <label>Confirmar contraseña <span class="req">*</span></label>
                        <div class="pw-wrapper">
                            <input
                                class="form-input"
                                :type="showPw2 ? 'text' : 'password'"
                                v-model="pwForm.confirm"
                                placeholder="Repetir contraseña"
                            />
                            <button class="btn-toggle-pw" type="button" @click="showPw2 = !showPw2">
                                <span class="material-icons">{{ showPw2 ? 'visibility_off' : 'visibility' }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="pw-actions">
                    <button class="btn-cancel" @click="showChangePw = false">Cancelar</button>
                    <button class="btn-save" :disabled="pwLoading" @click="handleChangePw">
                        <span v-if="pwLoading" class="spinner"></span>
                        <span v-else class="material-icons">lock_reset</span>
                        {{ pwLoading ? 'Guardando...' : 'Cambiar' }}
                    </button>
                </div>
            </div>
        </div>

    </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    usuario: { type: Object, required: true }
})

const emit = defineEmits(['close', 'updated'])

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

// ── Helpers ────────────────────────────────────────────
const getSucursalNombre = (id) => allSucursales.value.find(s => s.id === id)?.sucursal ?? 'N/A'
const getRolNombre      = (id) => allRoles.value.find(r => r.id === id)?.rol ?? 'Desconocido'

const availableSucursales = computed(() =>
    allSucursales.value.filter(s => !form.value.sucursalesAcceso.includes(s.id))
)
const availableRoles = computed(() =>
    allRoles.value.filter(r => !form.value.roles.includes(r.id))
)

// ── Form — pre-filled from prop ────────────────────────
const form = ref({
    nombres:          props.usuario.nombres,
    apellidos:        props.usuario.apellidos,
    usuario:          props.usuario.usuario,
    email:            props.usuario.email,
    telefono:         props.usuario.telefono,
    sucursal:         props.usuario.Sucursal,
    sucursalesAcceso: [...(props.usuario.sucursal_acces ?? [])],
    roles:            [...(props.usuario.roles ?? [])],
})

const errors      = ref({})
const globalError = ref(null)
const isLoading   = ref(false)

// ── Toggle helpers ─────────────────────────────────────
const toggleSucursal = (id) => {
    const idx = form.value.sucursalesAcceso.indexOf(id)
    if (idx === -1) form.value.sucursalesAcceso.push(id)
    else            form.value.sucursalesAcceso.splice(idx, 1)
}

const toggleRol = (id) => {
    const idx = form.value.roles.indexOf(id)
    if (idx === -1) form.value.roles.push(id)
    else            form.value.roles.splice(idx, 1)
}

// ── Validation ─────────────────────────────────────────
const validate = () => {
    const e = {}
    if (!form.value.nombres.trim())   e.nombres   = 'Campo requerido'
    if (!form.value.apellidos.trim()) e.apellidos = 'Campo requerido'
    if (!form.value.usuario.trim())   e.usuario   = 'Campo requerido'
    if (!form.value.email.trim())     e.email     = 'Campo requerido'
    else if (!form.value.email.includes('@')) e.email = 'Email inválido'
    if (!form.value.telefono.trim())  e.telefono  = 'Campo requerido'
    if (!form.value.sucursal)         e.sucursal  = 'Selecciona una sucursal predeterminada'
    if (form.value.sucursalesAcceso.length === 0) e.sucursalesAcceso = 'Selecciona al menos una sucursal'
    if (form.value.roles.length === 0)            e.roles            = 'Selecciona al menos un rol'
    errors.value = e
    return Object.keys(e).length === 0
}

// ── Submit ─────────────────────────────────────────────
const handleSubmit = async () => {
    globalError.value = null
    if (!validate()) return
    isLoading.value = true
    try {
        const res = await fetch(`http://127.0.0.1:8000/users/update/${props.usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombres:        form.value.nombres,
                apellidos:      form.value.apellidos,
                usuario:        form.value.usuario,
                email:          form.value.email,
                telefono:       form.value.telefono,
                Sucursal:       form.value.sucursal,
                sucursal_acces: form.value.sucursalesAcceso,
                roles:          form.value.roles,
            }),
        })
        if (!res.ok) {
            const data = await res.json()
            globalError.value = data.detail ?? 'Error al actualizar usuario'
            return
        }
        emit('updated')
        emit('close')
    } catch (e) {
        globalError.value = `Error de conexión: ${e.message}`
    } finally {
        isLoading.value = false
    }
}

// ── Change password ────────────────────────────────────
const showChangePw = ref(false)
const pwForm   = ref({ password: '', confirm: '' })
const pwError  = ref(null)
const pwLoading = ref(false)
const showPw1  = ref(false)
const showPw2  = ref(false)

const handleChangePw = async () => {
    pwError.value = null
    if (!pwForm.value.password || pwForm.value.password.length < 6) {
        pwError.value = 'La contraseña debe tener al menos 6 caracteres'; return
    }
    if (pwForm.value.password !== pwForm.value.confirm) {
        pwError.value = 'Las contraseñas no coinciden'; return
    }
    pwLoading.value = true
    try {
        const res = await fetch(`http://127.0.0.1:8000/users/update/${props.usuario.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pwForm.value.password }),
        })
        if (!res.ok) {
            const data = await res.json()
            pwError.value = data.detail ?? 'Error al cambiar contraseña'
            return
        }
        showChangePw.value = false
        pwForm.value = { password: '', confirm: '' }
    } catch (e) {
        pwError.value = `Error de conexión: ${e.message}`
    } finally {
        pwLoading.value = false
    }
}
</script>