<style scoped>
.AtrRow {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
    padding-top: 1.5%;
}

.AtrCol {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 46%;
}

.AtrTitulo {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.AtrGrid {
    display: grid;
    grid-template-columns: minmax(110px, 30%) 1fr;
    align-items: center;
    row-gap: 10px;
    column-gap: 14px;
    max-height: 300px;
    padding: 4px 6px 4px 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #130348 transparent;
}

.AtrNombre {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.DropWrap {
    position: relative;
}

.SelectBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 100%;
    padding: 3px 4px 3px 12px;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 0.95rem;
    cursor: pointer;
    box-sizing: border-box;
}

.SelectBox .Texto {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.SelectBox .Texto.todos {
    color: #6C757D;
}

.Conteo {
    margin-left: auto;
    padding: 0 7px;
    border-radius: 8px;
    background: #130348;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
}

.DropMenu {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    max-height: 240px;
    overflow-y: auto;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
}

.DropBuscar {
    position: sticky;
    top: 0;
    padding: 6px;
    background: white;
    border-bottom: 1px solid #F0F0F0;
}

.DropBuscar input {
    width: 100%;
    padding: 4px 10px;
    border: 1px solid #BCBCBC;
    border-radius: 10px;
    color: #130348;
    font-size: 0.9rem;
    outline: none;
    box-sizing: border-box;
}

.DropItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-bottom: 1px solid #F0F0F0;
    color: #130348;
    font-size: 0.95rem;
    cursor: pointer;
}

.DropItem:last-child {
    border-bottom: none;
}

.DropItem:hover {
    background-color: #F5F5F5;
}

.DropItem.marcado {
    font-weight: 600;
}

.DropItem .material-icons {
    font-size: 18px;
}

.DropVacio {
    padding: 10px 12px;
    color: #6C757D;
    font-size: 0.9rem;
    font-style: italic;
}

.ListaAplica {
    height: 260px;
    overflow-y: auto;
    border: 1px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    scrollbar-width: thin;
    scrollbar-color: #130348 transparent;
}

.AplicaItem {
    padding: 4px 12px;
    font-size: 1rem;
    color: #130348;
    cursor: pointer;
    user-select: none;
}

.AplicaItem:hover {
    background-color: rgba(19, 3, 72, 0.08);
}

.AplicaItem.seleccionado {
    background: radial-gradient(ellipse at center, #230097 10%, #130348 100%);
    color: white;
}

.AplicaVacio,
.AtrEstado {
    padding: 8px 12px;
    font-size: 0.9rem;
    color: #6C757D;
    font-style: italic;
}

.BtnRow {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 8px;
}

.minButt {
    padding: 3px 14px;
    background: radial-gradient(
        ellipse at center,
        #230097 50%,
        #130348 100%
    );
    border: 1px solid #FB1C2E;
    border-radius: 15px;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
}

.minButt:disabled {
    opacity: 0.4;
    cursor: default;
}

.Ayuda {
    font-size: 0.8rem;
    color: #6C757D;
    text-align: center;
    margin-top: 4px;
}
</style>

<template>
    <div ref="raiz" class="AtrRow">
        <div class="AtrCol">
            <span class="AtrTitulo">Atributos de Producto</span>
            <div v-if="cargando" class="AtrEstado">Cargando atributos...</div>
            <div v-else-if="error" class="AtrEstado">{{ error }}</div>
            <div v-else-if="atributos.length === 0" class="AtrEstado">No hay atributos registrados</div>
            <div v-else class="AtrGrid">
                <template v-for="a in atributos" :key="a.id">
                    <span class="AtrNombre" :title="a.atributo">{{ a.atributo }}</span>
                    <div class="DropWrap">
                        <div class="SelectBox" :data-cy="`atributo-${a.id}`" @click="toggleMenu(a.id)">
                            <span class="Texto" :class="{ todos: !marcadosDe(a).length }">
                                {{ marcadosDe(a).length ? marcadosDe(a).map(v => v.descripcion).join(', ') : 'Todos' }}
                            </span>
                            <span v-if="marcadosDe(a).length" class="Conteo">{{ marcadosDe(a).length }}</span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                        <div v-if="menuAbierto === a.id" class="DropMenu" :data-cy="`atributo-${a.id}-valores`">
                            <div v-if="a.valores.length > 8" class="DropBuscar">
                                <input v-model="filtro" :placeholder="`Buscar ${a.atributo.toLowerCase()}`" autocomplete="off" />
                            </div>
                            <div v-if="a.valores.length === 0" class="DropVacio">Sin valores registrados</div>
                            <div
                                v-for="v in valoresFiltrados(a)"
                                :key="v.id"
                                class="DropItem"
                                :class="{ marcado: estaMarcado(v.id) }"
                                @click="alternarValor(a, v)"
                            >
                                <span class="material-icons">{{ estaMarcado(v.id) ? 'check_box' : 'check_box_outline_blank' }}</span>
                                {{ v.descripcion }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="AtrCol">
            <span class="AtrTitulo">Solo aplica en ({{ modelValue.length }})</span>
            <div class="ListaAplica" data-cy="atributos-aplica">
                <div v-if="modelValue.length === 0" class="AplicaVacio">Sin atributos: aplica a todos los productos</div>
                <div
                    v-for="e in modelValue"
                    :key="e.id"
                    class="AplicaItem"
                    :class="{ seleccionado: seleccion.has(e.id) }"
                    @click="alternarSeleccion(e.id)"
                    @dblclick="quitar([e.id])"
                >{{ e.etiqueta }}</div>
            </div>
            <div class="BtnRow">
                <button class="minButt" :disabled="!seleccion.size" @click="quitar([...seleccion])">&lt; Eliminar</button>
                <button class="minButt" :disabled="!modelValue.length" @click="quitar(modelValue.map(e => e.id))">&lt;&lt; Eliminar Todos</button>
            </div>
        </div>
    </div>
    <div class="Ayuda">El producto recibe la promoción si tiene cualquiera de los valores seleccionados</div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { AtributosService } from '../../../services/AtributosService'
import { AtributosValoresService } from '../../../services/AtributosValoresServices'

const props = defineProps({
    // valores de atributo en los que aplica [{ id, etiqueta }]
    modelValue: { type: Array, required: true },
})

const emit = defineEmits(['agregar', 'quitar'])

const raiz = ref(null)
const atributos = ref([])
const cargando = ref(false)
const error = ref(null)
const menuAbierto = ref(null)
const filtro = ref('')
const seleccion = reactive(new Set())

const estaMarcado = (valorId) => props.modelValue.some(e => e.id === valorId)
const marcadosDe = (a) => a.valores.filter(v => estaMarcado(v.id))

const valoresFiltrados = (a) => {
    const q = filtro.value.trim().toLowerCase()
    return q ? a.valores.filter(v => v.descripcion.toLowerCase().includes(q)) : a.valores
}

const toggleMenu = (id) => {
    menuAbierto.value = menuAbierto.value === id ? null : id
    filtro.value = ''
}

const alternarValor = (a, v) => {
    if (estaMarcado(v.id)) emit('quitar', [v.id])
    else emit('agregar', { id: v.id, etiqueta: `${a.atributo}: ${v.descripcion}` })
}

const alternarSeleccion = (id) => {
    if (seleccion.has(id)) seleccion.delete(id)
    else seleccion.add(id)
}

const quitar = (ids) => {
    emit('quitar', ids)
    seleccion.clear()
}

const cerrarAlClicFuera = (evento) => {
    if (menuAbierto.value !== null && raiz.value && !raiz.value.contains(evento.target)) menuAbierto.value = null
}

onMounted(async () => {
    document.addEventListener('click', cerrarAlClicFuera)
    cargando.value = true
    try {
        const [lista, valores] = await Promise.all([AtributosService.getAll(), AtributosValoresService.getAll()])
        atributos.value = lista.map(a => ({
            id: a.id,
            atributo: a.atributo,
            valores: valores
                .filter(v => v.atributo_id === a.id)
                .sort((x, y) => x.descripcion.localeCompare(y.descripcion, 'es', { numeric: true })),
        }))
    } catch (e) {
        error.value = e.message
    } finally {
        cargando.value = false
    }
})

onBeforeUnmount(() => document.removeEventListener('click', cerrarAlClicFuera))
</script>
