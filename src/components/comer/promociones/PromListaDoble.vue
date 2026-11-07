<style scoped>
.ColSuc {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: .5%;
}

.rowcom {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
    padding-top: 1%;
}

.mincol {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 34%;
}

.mincol text {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.sucspace {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: left;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 1px solid #FB1C2E;
    border-radius: 15px;
    overflow-y: auto;
    width: 100%;
    height: 260px;
    scrollbar-width: thin;
    scrollbar-color: #130348 transparent;
}

.mincolb {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 16%;
    padding-top: 1.5%;
    gap: 3px;
}

.minButt {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #230097 50%,
        #130348 100%
    );
    border: 1px solid #FB1C2E;
    border-radius: 15px;
    font-size: 1rem;
    color: white;
    padding: .3rem;
    cursor: pointer;
}

.minButt:disabled {
    opacity: 0.4;
    cursor: default;
}

.ListaItem {
    width: 100%;
    padding: 4px 12px;
    font-size: 1rem;
    color: #130348;
    cursor: pointer;
    user-select: none;
}

.ListaItem:hover {
    background-color: rgba(19, 3, 72, 0.08);
}

.ListaItem.seleccionada {
    background: radial-gradient(ellipse at center, #230097 10%, #130348 100%);
    color: white;
}

.ListaVacia {
    padding: 8px 12px;
    font-size: 0.9rem;
    color: #6C757D;
    font-style: italic;
}

.Ayuda {
    font-size: 0.8rem;
    color: #6C757D;
    text-align: center;
    margin-top: 4px;
}
</style>

<template>
    <div class="ColSuc">
        <div class="rowcom">
            <div class="mincol">
                <text>{{ titulo }} ({{ disponibles.length }})</text>
                <div class="sucspace" :data-cy="`${cy}-disponibles`">
                    <div v-if="cargando" class="ListaVacia">Cargando...</div>
                    <div v-else-if="error" class="ListaVacia">{{ error }}</div>
                    <div v-else-if="disponibles.length === 0" class="ListaVacia">No hay más opciones</div>
                    <div
                        v-for="op in disponibles"
                        :key="op.id"
                        class="ListaItem"
                        :class="{ seleccionada: selDisponibles.has(op.id) }"
                        @click="alternar(selDisponibles, op.id)"
                        @dblclick="agregar([op])"
                    >{{ op.etiqueta }}</div>
                </div>
            </div>
            <div class="mincolb">
                <button
                    class="minButt"
                    :data-cy="`${cy}-agregar`"
                    :disabled="!selDisponibles.size"
                    @click="agregar(disponibles.filter(o => selDisponibles.has(o.id)))"
                >Agregar &gt;</button>
                <button class="minButt" :disabled="!disponibles.length" @click="agregar(disponibles)">
                    Agregar Todos &gt;&gt;
                </button>
                <button class="minButt" :disabled="!selAplica.size" @click="quitar([...selAplica])">
                    &lt; Eliminar
                </button>
                <button class="minButt" :disabled="!modelValue.length" @click="quitar(modelValue.map(o => o.id))">
                    &lt;&lt; Eliminar Todos
                </button>
            </div>
            <div class="mincol">
                <text>Solo aplica en ({{ modelValue.length }})</text>
                <div class="sucspace" :data-cy="`${cy}-aplica`">
                    <div v-if="modelValue.length === 0" class="ListaVacia">{{ textoVacio }}</div>
                    <div
                        v-for="op in modelValue"
                        :key="op.id"
                        class="ListaItem"
                        :class="{ seleccionada: selAplica.has(op.id) }"
                        @click="alternar(selAplica, op.id)"
                        @dblclick="quitar([op.id])"
                    >{{ op.etiqueta }}</div>
                </div>
            </div>
        </div>
        <div class="Ayuda">Haz clic para seleccionar o doble clic para mover</div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
    titulo: { type: String, required: true },
    // catálogo completo [{ id, etiqueta }]
    opciones: { type: Array, required: true },
    // elementos en los que aplica [{ id, etiqueta }]
    modelValue: { type: Array, required: true },
    textoVacio: { type: String, default: 'Sin selección: aplica a todos' },
    cargando: { type: Boolean, default: false },
    error: { type: String, default: null },
    // prefijo de data-cy
    cy: { type: String, default: 'lista' },
})

const emit = defineEmits(['agregar', 'quitar'])

const selDisponibles = reactive(new Set())
const selAplica = reactive(new Set())

const disponibles = computed(() => props.opciones.filter(o => !props.modelValue.some(a => a.id === o.id)))

const alternar = (seleccion, id) => {
    if (seleccion.has(id)) seleccion.delete(id)
    else seleccion.add(id)
}

const agregar = (opciones) => {
    emit('agregar', opciones)
    selDisponibles.clear()
}

const quitar = (ids) => {
    emit('quitar', ids)
    selAplica.clear()
}
</script>
