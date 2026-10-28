<style scoped>
.BusRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.BusRow2 {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.BusEtiqueta {
    width: 12%;
    font-size: 1.3rem;
    font-weight: 600;
    color: #130348;
}

.BusWrap {
    position: relative;
    width: 60%;
}

.BusInput {
    width: 100%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    box-sizing: border-box;
}

.BusResultados {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.BusItem {
    padding: 8px 18px;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
    color: #130348;
    font-size: 0.95rem;
}

.BusItem:last-child {
    border-bottom: none;
}

.BusItem:hover,
.BusItem.activo {
    background-color: #F5F5F5;
    font-weight: 600;
}

.BusItem.agregado {
    color: #999;
    cursor: default;
}

.BusVacio {
    padding: 10px 18px;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
}

.AgBut,
.ElBut {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15%;
    border-radius: 15px;
    padding: 2px;
    gap: 7%;
    font-size: .9rem;
    font-weight: 600;
    cursor: pointer;
}

.AgBut {
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border: 1px solid white;
    color: white;
}

.ElBut {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #130348;
    color: #130348;
}

.AgBut:disabled,
.ElBut:disabled {
    opacity: 0.45;
    cursor: default;
}

.ListaAplica {
    width: 60%;
    min-height: 120px;
    max-height: 220px;
    overflow-y: auto;
    border: 2px solid #FB1C2E;
    border-radius: 20px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    padding: 6px 0;
}

.AplicaItem {
    padding: 4px 16px;
    font-size: 1rem;
    color: #130348;
    cursor: pointer;
    user-select: none;
}

.AplicaItem:hover {
    background-color: rgba(19, 3, 72, 0.08);
}

.AplicaItem.seleccionado {
    background: radial-gradient(
        ellipse at center,
        #230097 10%,
        #130348 100%
    );
    color: white;
}

.AplicaVacio {
    padding: 8px 16px;
    font-size: 0.9rem;
    color: #6C757D;
    font-style: italic;
}

.BusError {
    width: 60%;
    margin: 4px auto 0;
    color: #FB1C2E;
    font-size: 0.9rem;
    font-weight: 600;
}
</style>

<template>
    <div class="BusRow">
        <span class="BusEtiqueta">{{ etiqueta }}</span>
        <div class="BusWrap">
            <input
                v-model="termino"
                class="BusInput"
                :placeholder="placeholder"
                autocomplete="off"
                data-cy="buscador-input"
                @input="onInput"
                @focus="termino.trim() && (abierto = true)"
                @keyup.enter="agregar"
            />
            <div v-if="abierto" class="BusResultados" data-cy="buscador-resultados">
                <div v-if="buscando" class="BusVacio">Buscando...</div>
                <div v-else-if="resultados.length === 0" class="BusVacio">Sin resultados</div>
                <div
                    v-for="r in resultados"
                    v-else
                    :key="r.id"
                    class="BusItem"
                    :class="{ activo: seleccionado?.id === r.id, agregado: yaAgregado(r) }"
                    :title="yaAgregado(r) ? 'Ya est\u00e1 en la lista' : ''"
                    @click="!yaAgregado(r) && elegir(r)"
                >{{ r.etiqueta }}</div>
            </div>
        </div>
        <button class="AgBut" :disabled="!seleccionado" data-cy="buscador-agregar" @click="agregar">
            Agregar
            <span class="material-icons" style="color:white; font-size:23px;">add</span>
        </button>
    </div>
    <div v-if="error" class="BusError">{{ error }}</div>
    <div class="BusRow2">
        <span class="BusEtiqueta">Aplica en</span>
        <div class="ListaAplica" data-cy="buscador-lista">
            <div v-if="modelValue.length === 0" class="AplicaVacio">{{ ayudaVacio }}</div>
            <div
                v-for="e in modelValue"
                :key="e.id"
                class="AplicaItem"
                :class="{ seleccionado: seleccionAplica.has(e.id) }"
                @click="alternar(e.id)"
            >{{ e.etiqueta }}</div>
        </div>
        <button class="ElBut" :disabled="!seleccionAplica.size" data-cy="buscador-eliminar" @click="eliminar">
            Eliminar
            <span class="material-icons" style="color:#130348; font-size:23px;">remove</span>
        </button>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
    etiqueta: { type: String, required: true },
    placeholder: { type: String, default: 'Buscar...' },
    ayudaVacio: { type: String, default: 'Sin elementos: aplica a todos' },
    // async (termino) => [{ id, etiqueta }]
    buscar: { type: Function, required: true },
    modelValue: { type: Array, required: true },
})

const emit = defineEmits(['agregar', 'eliminar'])

const termino = ref('')
const resultados = ref([])
const buscando = ref(false)
const abierto = ref(false)
const seleccionado = ref(null)
const error = ref(null)
const seleccionAplica = reactive(new Set())

const yaAgregado = (r) => props.modelValue.some(e => e.id === r.id)

let debounce = null
const onInput = () => {
    seleccionado.value = null
    error.value = null
    clearTimeout(debounce)
    if (!termino.value.trim()) {
        abierto.value = false
        resultados.value = []
        return
    }
    debounce = setTimeout(ejecutarBusqueda, 300)
}

const ejecutarBusqueda = async () => {
    const actual = termino.value.trim()
    buscando.value = true
    abierto.value = true
    try {
        const encontrados = await props.buscar(actual)
        // la b\u00fasqueda pudo cambiar mientras llegaba la respuesta
        if (actual === termino.value.trim()) resultados.value = encontrados
    } catch (e) {
        error.value = e.message
        resultados.value = []
    } finally {
        buscando.value = false
    }
}

const elegir = (r) => {
    seleccionado.value = r
    termino.value = r.etiqueta
    abierto.value = false
}

const agregar = () => {
    if (!seleccionado.value) return
    emit('agregar', seleccionado.value)
    seleccionado.value = null
    termino.value = ''
    resultados.value = []
}

const alternar = (id) => {
    if (seleccionAplica.has(id)) seleccionAplica.delete(id)
    else seleccionAplica.add(id)
}

const eliminar = () => {
    emit('eliminar', [...seleccionAplica])
    seleccionAplica.clear()
}
</script>
