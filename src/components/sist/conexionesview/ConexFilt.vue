<style scoped>
.ConexFiltPrinc {
    display: flex;
    flex-direction: column;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #FB1C2E;
    border-radius: 18px;
    overflow: visible;
    flex-shrink: 0;
    box-sizing: border-box;
}

.ConexFiltHeader {
    padding: 7px 20px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid #FB1C2E;
    background: radial-gradient(
        ellipse at left,
        #130348 10%,
        #07072C 100%
    );
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
}

.ConexFiltBody {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px 32px;
    padding: 12px 20px;
}

.ModoSwitch {
    display: flex;
    flex-direction: row;
    padding: 2px;
    border: 1px solid #130348;
    border-radius: 10px;
    background: white;
}

.ModoBtn {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 4px 14px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #130348;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
}

.ModoBtn .material-icons {
    font-size: 18px;
}

.ModoBtn.activo {
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    color: white;
}

.ConexCampo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

.ConexCampo > text {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.ConexCampo.Usuario .DropWrap,
.ConexCampo.Usuario .DateWrap {
    width: 280px;
}

.ConexCampo.Tipo .DropWrap {
    width: 140px;
}

.ConexSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 2px 2px 2px 12px;
    font-size: 1rem;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
    color: #130348;
    cursor: pointer;
    box-sizing: border-box;
}

.ConexSelect text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.DropWrap {
    position: relative;
}

.DropMenu {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    min-width: 220px;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 280px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.DropBuscar {
    position: sticky;
    top: 0;
    padding: 8px;
    background: white;
    border-bottom: 1px solid #F0F0F0;
}

.DropBuscar input {
    width: 100%;
    padding: 5px 12px;
    border: 1px solid #BCBCBC;
    border-radius: 10px;
    color: #130348;
    font-size: 0.95rem;
    outline: none;
    box-sizing: border-box;
}

.DropBuscar input:focus {
    border-color: #130348;
}

.DropItem {
    display: flex;
    flex-direction: column;
    padding: 6px 14px;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
    color: #130348;
    font-size: 0.95rem;
    transition: background 0.15s;
}

.DropItem:last-child {
    border-bottom: none;
}

.DropItem small {
    color: #6C757D;
    font-size: 0.8rem;
}

.DropItem:hover,
.DropItem.activo {
    background-color: #F5F5F5;
    font-weight: 600;
}

.DropVacio {
    padding: 12px 18px;
    color: #6C757D;
    font-style: italic;
}

.DateInput {
    width: 100%;
    padding: 4px 12px;
    border: 1px solid #130348;
    border-radius: 10px;
    font-size: 1rem;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    color: #130348;
    cursor: pointer;
    box-sizing: border-box;
}

.ConexError {
    width: 100%;
    text-align: center;
    color: #FB1C2E;
    font-size: 0.85rem;
    font-weight: 600;
}
</style>

<template>
    <div ref="raiz" class="ConexFiltPrinc">
        <div class="ConexFiltHeader">Historial de Accesos</div>

        <div class="ConexFiltBody">
            <div class="ModoSwitch">
                <button
                    class="ModoBtn"
                    :class="{ activo: modo === 'usuario' }"
                    data-cy="modo-usuario"
                    @click="cambiarModo('usuario')"
                >
                    <span class="material-icons">person</span>
                    Por Usuario
                </button>
                <button
                    class="ModoBtn"
                    :class="{ activo: modo === 'dia' }"
                    data-cy="modo-dia"
                    @click="cambiarModo('dia')"
                >
                    <span class="material-icons">today</span>
                    Por Día
                </button>
            </div>

            <div v-if="modo === 'usuario'" class="ConexCampo Usuario">
                <text>Usuario:</text>
                <div class="DropWrap">
                    <div class="ConexSelect" data-cy="filtro-usuario" @click="toggleMenu('usuario')">
                        <text>{{ usuario ? `${usuario.usuario} — ${nombreCompleto(usuario)}` : 'Todos' }}</text>
                        <span class="material-icons" style="font-size:22px;">arrow_drop_down</span>
                    </div>
                    <div v-if="menuAbierto === 'usuario'" class="DropMenu" data-cy="usuarios-opciones">
                        <div class="DropBuscar">
                            <input
                                ref="inputBuscar"
                                v-model="busqueda"
                                placeholder="Buscar por usuario o nombre"
                                autocomplete="off"
                                data-cy="buscar-usuario"
                            />
                        </div>
                        <div class="DropItem" :class="{ activo: !usuario }" @click="seleccionarUsuario(null)">Todos</div>
                        <div
                            v-for="u in usuariosFiltrados"
                            :key="u.id"
                            class="DropItem"
                            :class="{ activo: usuario?.id === u.id }"
                            @click="seleccionarUsuario(u)"
                        >
                            {{ u.usuario }}
                            <small>{{ nombreCompleto(u) }}</small>
                        </div>
                        <div v-if="usuariosFiltrados.length === 0" class="DropVacio">Sin coincidencias</div>
                    </div>
                </div>
            </div>

            <div v-else class="ConexCampo Usuario">
                <text>Día:</text>
                <DatePicker
                    v-model="dia"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :max-date="hoy"
                    class="DateWrap"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="DateInput"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            data-cy="filtro-dia"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>

            <div class="ConexCampo Tipo">
                <text>Tipo:</text>
                <div class="DropWrap">
                    <div class="ConexSelect" data-cy="filtro-tipo" @click="toggleMenu('tipo')">
                        <text>{{ tipo ?? 'Todos' }}</text>
                        <span class="material-icons" style="font-size:22px;">arrow_drop_down</span>
                    </div>
                    <div v-if="menuAbierto === 'tipo'" class="DropMenu">
                        <div class="DropItem" :class="{ activo: !tipo }" @click="seleccionarTipo(null)">Todos</div>
                        <div
                            v-for="t in TIPOS"
                            :key="t"
                            class="DropItem"
                            :class="{ activo: tipo === t }"
                            @click="seleccionarTipo(t)"
                        >{{ t }}</div>
                    </div>
                </div>
            </div>

            <div v-if="error" class="ConexError">{{ error }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { DatePicker } from 'v-calendar'
import { getUsers } from '../../../services/UserServices'

const TIPOS = ['Entrada', 'Salida']

const emit = defineEmits(['filtrar'])

const hoy = new Date(new Date().setHours(0, 0, 0, 0))

const raiz = ref(null)
const inputBuscar = ref(null)
const modo = ref('usuario')
const usuarios = ref([])
const usuario = ref(null)
const busqueda = ref('')
const dia = ref(hoy)
const tipo = ref(null)
const menuAbierto = ref(null)
const error = ref(null)

const nombreCompleto = (u) => `${u.nombres} ${u.apellidos}`.trim()

const usuariosFiltrados = computed(() => {
    const q = busqueda.value.trim().toLowerCase()
    if (!q) return usuarios.value
    return usuarios.value.filter(u =>
        u.usuario.toLowerCase().includes(q) || nombreCompleto(u).toLowerCase().includes(q)
    )
})

const toggleMenu = async (menu) => {
    menuAbierto.value = menuAbierto.value === menu ? null : menu
    if (menuAbierto.value === 'usuario') {
        busqueda.value = ''
        await nextTick()
        inputBuscar.value?.focus()
    }
}

const emitir = () => {
    const filtros = { tipo: tipo.value }
    if (modo.value === 'usuario') {
        filtros.usuario_id = usuario.value?.id ?? null
    } else if (dia.value) {
        // limites del dia local; el backend los convierte a UTC
        const d = new Date(dia.value)
        filtros.desde = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString()
        filtros.hasta = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString()
    }
    emit('filtrar', filtros)
}

const cambiarModo = (nuevo) => {
    if (modo.value === nuevo) return
    modo.value = nuevo
    menuAbierto.value = null
    if (nuevo === 'dia' && !dia.value) dia.value = hoy
    emitir()
}

const seleccionarUsuario = (u) => {
    usuario.value = u
    menuAbierto.value = null
    emitir()
}

const seleccionarTipo = (t) => {
    tipo.value = t
    menuAbierto.value = null
    emitir()
}

const cerrarAlClicFuera = (evento) => {
    if (menuAbierto.value && raiz.value && !raiz.value.contains(evento.target)) menuAbierto.value = null
}

watch(dia, emitir)

onMounted(async () => {
    document.addEventListener('click', cerrarAlClicFuera)
    try {
        const lista = await getUsers()
        usuarios.value = [...lista].sort((a, b) => a.usuario.localeCompare(b.usuario))
    } catch (e) {
        error.value = e.message
    }
})

onBeforeUnmount(() => document.removeEventListener('click', cerrarAlClicFuera))
</script>
