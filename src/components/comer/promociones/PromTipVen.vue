<style scoped>
.rowtip {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 1.5%;
}

.PromtipVentable text {
    font-size: 1.2rem;
    color: #130348;
}

.tabrow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3%;
    white-space: nowrap;
}

.tabrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3%;
}

.check {
    border: 1px solid #FB1C2E;
    border-radius: 15px;
}

.mincol {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.ColSuc {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: .5%;
}

.rosu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 1%;
}

.rosu span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.rowcom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.mincol {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 20%;
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
    overflow: hidden;
    width: 100%;
    min-height: 140px;
}

.OpButton2 {
    width: auto;
    height: 80%;
    padding: 1px 7px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    cursor: pointer;
}

.OpButton2:Hover {
    background: radial-gradient(
        ellipse at bottom,
        #230097 0%,
        #130348 100%
    );
}

.OpButton2 text:Hover {
    color: white;
}

.OpButton2.active {
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
}

.OpButton2 text {
    font-size: 1.1rem;
    color: #130348;
}

.OpButton2.active text {
    color: white;
}

.mincolb {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    padding-top: 1.5%;
    gap: 3px;
}

.minButt {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
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
    <PromCriterio
        grupo="venta"
        :opciones="[
            { categoria: 'tipos_venta', etiqueta: 'Por Tipo de Venta' },
            { categoria: 'plazos', etiqueta: 'Por Plazo' },
        ]"
    />
    <div class="ColSuc">
        <div class="rosu">
            <span>{{ esPlazo ? 'Plazos' : 'Tipos de Venta' }}</span>
        </div>
        <div class="rowcom">
            <div class="mincol">
                <text>Disponibles ({{ disponibles.length }})</text>
                <div class="sucspace" data-cy="venta-disponibles">
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
                <button class="minButt" data-cy="venta-agregar" :disabled="!selDisponibles.size" @click="agregar(disponibles.filter(o => selDisponibles.has(o.id)))">
                    Agregar >
                </button>
                <button class="minButt" :disabled="!disponibles.length" @click="agregar(disponibles)">
                    Agregar Todas >>
                </button>
                <button class="minButt" :disabled="!selAplica.size" @click="quitar([...selAplica])">
                    &lt; Eliminar
                </button>
                <button class="minButt" :disabled="!aplica.length" @click="quitar(aplica.map(o => o.id))">
                    &lt;&lt; Eliminar Todas
                </button>
            </div>
            <div class="mincol">
                <text>Aplica en ({{ aplica.length }})</text>
                <div class="sucspace" data-cy="venta-aplica">
                    <div v-if="aplica.length === 0" class="ListaVacia">
                        Sin selección: aplica a {{ esPlazo ? 'todos los plazos' : 'todos los tipos de venta' }}
                    </div>
                    <div
                        v-for="op in aplica"
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
import { ref, reactive, computed, watch, onMounted } from 'vue'
import PromCriterio from './PromCriterio.vue'
import { usePromocionStore } from '../../../stores/promocion'
import { TipoVentaService } from '../../../services/TipoVentaServices'
import { PlazoService } from '../../../services/PlazoServices'

const promo = usePromocionStore()

const tiposVenta = ref([])
const plazos = ref([])
const cargando = ref(false)
const error = ref(null)
const selDisponibles = reactive(new Set())
const selAplica = reactive(new Set())

const esPlazo = computed(() => promo.criterios.venta === 'plazos')
const categoria = computed(() => promo.criterios.venta)
const catalogo = computed(() => (esPlazo.value ? plazos.value : tiposVenta.value))
const aplica = computed(() => promo.condiciones[categoria.value])
const disponibles = computed(() => catalogo.value.filter(o => !aplica.value.some(a => a.id === o.id)))

const limpiarSeleccion = () => {
    selDisponibles.clear()
    selAplica.clear()
}

watch(categoria, limpiarSeleccion)

const alternar = (seleccion, id) => {
    if (seleccion.has(id)) seleccion.delete(id)
    else seleccion.add(id)
}

const agregar = (opciones) => {
    opciones.forEach(o => promo.agregarCondicion(categoria.value, o))
    limpiarSeleccion()
}

const quitar = (ids) => {
    promo.quitarCondiciones(categoria.value, ids)
    limpiarSeleccion()
}

onMounted(async () => {
    cargando.value = true
    try {
        const [tv, pl] = await Promise.all([TipoVentaService.getAll(), PlazoService.getAll()])
        tiposVenta.value = tv.map(t => ({ id: t.id, etiqueta: t.venta }))
        const nombreTipo = Object.fromEntries(tv.map(t => [t.id, t.venta]))
        plazos.value = pl.map(p => ({
            id: p.id,
            etiqueta: nombreTipo[p.tipo_venta_id] ? `${p.plazo} (${nombreTipo[p.tipo_venta_id]})` : p.plazo,
        }))
    } catch (e) {
        error.value = e.message
    } finally {
        cargando.value = false
    }
})
</script>