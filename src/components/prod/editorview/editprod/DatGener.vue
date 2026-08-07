<style scoped>
.FoGridDatGen {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-left: 30px;
}

.FoGridDatGen text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGridDatGen span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.CliBarsDatGen {
    width: 90%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.SectBoxDatGen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
    box-sizing: border-box;
}

.SectBoxDatGen.placeholder {
    color: #999;
}

.DropWrapperDat {
    position: relative;
    width: 90%;
}

.DropOpcionesDat {
    position: absolute;
    top: 100%;
    left: 0;
    width: 90%;
    background: radial-gradient(ellipse at bottom, #F0F0F0 50%, #BCBCBC 150%);
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    overflow-y: auto;
    max-height: 150px;
    z-index: 100;
    margin-top: 4px;
}

.OpcionItemDat {
    padding: 6px 1rem;
    cursor: pointer;
    font-size: 0.95rem;
    color: #130348;
}

.OpcionItemDat:hover {
    background: radial-gradient(ellipse at left, #BCBCBC 10%, #F0F0F0 100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.25s ease;
    max-height: 150px;
    overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>

<template>
    <div class="FoGridDatGen">
        <text>Nombre</text>
        <span>{{ nombreMostrar }}</span>

        <text>Código</text>
        <span>{{ codigoMostrar }}</span>

        <text>Código externo</text>
        <input
            type="text"
            placeholder="Ingresar Código Externo"
            class="CliBarsDatGen"
            v-model="store.codigoExterno"
            autocomplete="off"
        />

        <text>Descripción</text>
        <input
            type="text"
            placeholder="Ingresar Descripción"
            class="CliBarsDatGen"
            v-model="store.descripcion"
            autocomplete="off"
        />

        <template v-for="(ops, campo) in opciones" :key="campo">
            <text>{{ etiquetas[campo] }}</text>
            <div class="DropWrapperDat">
                <div class="SectBoxDatGen" @click="toggleDropdown(campo)">
                    <span :class="{ placeholder: !campos[campo].value }">
                        {{ campos[campo].value?.label || 'Seleccionar' }}
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
                <transition name="dropdown">
                    <div v-if="dropdownAbierto === campo" class="DropOpcionesDat">
                        <div
                            v-for="op in ops"
                            :key="op.id"
                            class="OpcionItemDat"
                            @click="seleccionar(campo, op)"
                        >
                            {{ op.label }}
                        </div>
                    </div>
                </transition>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductoEditorStore } from '../../../../stores/productoeditor'

const store = useProductoEditorStore()
const { estatus, tipo, generaOrden, unidad, tipoIva } = storeToRefs(store)

const dropdownAbierto = ref(null)

const toggleDropdown = (campo) => {
    dropdownAbierto.value = dropdownAbierto.value === campo ? null : campo
}

const seleccionar = (campo, op) => {
    campos[campo].value = op
    dropdownAbierto.value = null
}

const nombreMostrar = computed(() => {
    return store.nombreGenerado || store.nombre || '—'
})

const codigoMostrar = computed(() => {
    return store.codigoGenerado || store.codigo || '—'
})

const campos = { estatus, tipo, generaOrden, unidad, tipoIva }

const etiquetas = {
    estatus: 'Estatus',
    tipo: 'Tipo',
    generaOrden: 'Genera Orden',
    unidad: 'Unidad',
    tipoIva: 'Tipo IVA'
}

const opciones = {
    estatus: [
        { id: 1, label: 'Activo' },
        { id: 2, label: 'Inactivo' }
    ],
    tipo: [
        { id: 1, label: 'Producto' },
        { id: 2, label: 'Servicio' }
    ],
    generaOrden: [
        { id: 1, label: 'Si' },
        { id: 0, label: 'No' }
    ],
    unidad: [
        { id: 'Pieza', label: 'Pieza' }
    ],
    tipoIva: [
        { id: 1, label: 'Normal' },
        { id: 2, label: 'Exento' }
    ]
}
</script>