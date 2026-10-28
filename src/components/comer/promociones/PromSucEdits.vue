<style scoped>
.SucRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5%;
    margin-top: 1%;
}

.SucRow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.bars {
    width: 70%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.bars2 {
    width: 100%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.SucRow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5%;
    margin-top: 1%;
}

.minrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    gap: 3%;
}

.minrow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    white-space: nowrap;
}

table text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    padding-right: 5px;
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

.SuCol {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 55%;
    padding-left: 1%;
}

.SubTitRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.SuCol text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.SuColRow {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-around;
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

.mincol1 {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 33%;
    padding-left: 1%;
}

.mincol1 text {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
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

.minButt:hover:not(:disabled) {
    filter: brightness(1.2);
}

.minButt:disabled {
    opacity: 0.4;
    cursor: default;
}

.SucItem {
    width: 100%;
    padding: 4px 12px;
    font-size: 1rem;
    color: #130348;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s;
}

.SucItem:hover {
    background-color: rgba(19, 3, 72, 0.08);
}

.SucItem.seleccionada {
    background: radial-gradient(
        ellipse at center,
        #230097 10%,
        #130348 100%
    );
    color: white;
}

.SucVacio {
    padding: 8px 12px;
    font-size: 0.9rem;
    color: #6C757D;
    font-style: italic;
}

.bars:disabled,
.bars2:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.check {
    accent-color: #130348;
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.AyudaSuc {
    font-size: 0.8rem;
    color: #6C757D;
    text-align: center;
    margin-top: 4px;
}
</style>

<template>
<div class="SucRow">
    <text>
        Nombre:
    </text>
    <input
        v-model="promo.nombre"
        type="text"
        maxlength="150"
        placeholder="Ingresar Nombre"
        class="bars"
        autocomplete="off"
        data-cy="promo-nombre"
    />
</div>
<div class="SucRow2">
    <div class="minrow">
        <text>
            Descuento (%)
        </text>
        <input
            v-model="promo.descuento"
            type="number"
            min="0"
            max="100"
            step="0.01"
            placeholder="Ingresar Descuento"
            class="bars"
            autocomplete="off"
            data-cy="promo-descuento"
        />
    </div>
    <div class="minrow">
        <text>
            Descuento Máx. Vendedor (%)
        </text>
        <input
            v-model="promo.descuentoMaxVendedor"
            type="number"
            min="0"
            max="100"
            step="0.01"
            placeholder="Ingresar Descuento"
            class="bars"
            autocomplete="off"
            data-cy="promo-descuento-vendedor"
        />
    </div>
</div>

<div class="SucRow2">
    <table>
        <tbody>
            <tr>
                <td>
                    <text>
                        Tipo:
                    </text>
                </td>
                <td>
                    <label class="tabrow">
                        <input
                            v-model="promo.acumulativa"
                            type="checkbox"
                            class="check"
                            data-cy="promo-acumulativa"
                        >
                        <span>Acumulativa</span>
                    </label>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <label class="tabrow">
                        <input
                            v-model="promo.permanente"
                            type="checkbox"
                            class="check"
                            data-cy="promo-permanente"
                        >
                        <span>Permanente</span>
                    </label>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="SuCol">
        <div class="SubTitRow">
            <text>
                Vigencia{{ promo.permanente ? ' (no aplica para promociones permanentes)' : '' }}
            </text>
        </div>
        <div class="SuColRow">
            <div class="mincol1">
                <text>
                    Inicio
                </text>
                <DatePicker
                    v-model="promo.fechaInicio"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :max-date="promo.fechaFin"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="bars2"
                            :value="promo.permanente ? '' : inputValue"
                            v-on="promo.permanente ? {} : inputEvents"
                            placeholder="dd/mm/aaaa"
                            :disabled="promo.permanente"
                            data-cy="promo-inicio"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
            <div class="mincol1">
                <text>
                    Fin
                </text>
                <DatePicker
                    v-model="promo.fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="promo.fechaInicio"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="bars2"
                            :value="promo.permanente ? '' : inputValue"
                            v-on="promo.permanente ? {} : inputEvents"
                            placeholder="dd/mm/aaaa"
                            :disabled="promo.permanente"
                            data-cy="promo-fin"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
        </div>
    </div>
</div>

<div class="ColSuc">
    <div class="rosu">
        <span>
            Sucursales
        </span>
    </div>
    <div class="rowcom">
        <div class="mincol">
            <text>
                Disponibles ({{ disponibles.length }})
            </text>
            <div class="sucspace" data-cy="suc-disponibles">
                <div v-if="cargando" class="SucVacio">Cargando sucursales...</div>
                <div v-else-if="errorSucursales" class="SucVacio">{{ errorSucursales }}</div>
                <div v-else-if="disponibles.length === 0" class="SucVacio">Todas las sucursales están agregadas</div>
                <div
                    v-for="s in disponibles"
                    :key="s.id"
                    class="SucItem"
                    :class="{ seleccionada: selDisponibles.has(s.id) }"
                    @click="alternar(selDisponibles, s.id)"
                    @dblclick="mover([s.id], true)"
                >{{ s.sucursal }}</div>
            </div>
        </div>

        <div class="mincolb">
            <button class="minButt" data-cy="suc-agregar" :disabled="!selDisponibles.size" @click="mover([...selDisponibles], true)">
                Agregar >
            </button>
            <button class="minButt" data-cy="suc-agregar-todas" :disabled="!disponibles.length" @click="mover(disponibles.map(s => s.id), true)">
                Agregar Todas >>
            </button>
            <button class="minButt" data-cy="suc-eliminar" :disabled="!selAplica.size" @click="mover([...selAplica], false)">
                < Eliminar
            </button>
            <button class="minButt" data-cy="suc-eliminar-todas" :disabled="!aplica.length" @click="mover(aplica.map(s => s.id), false)">
                << Eliminar Todas
            </button>
        </div>

        <div class="mincol">
            <text>
                Aplica en ({{ aplica.length }})
            </text>
            <div class="sucspace" data-cy="suc-aplica">
                <div v-if="!cargando && aplica.length === 0" class="SucVacio">Sin sucursales agregadas</div>
                <div
                    v-for="s in aplica"
                    :key="s.id"
                    class="SucItem"
                    :class="{ seleccionada: selAplica.has(s.id) }"
                    @click="alternar(selAplica, s.id)"
                    @dblclick="mover([s.id], false)"
                >{{ s.sucursal }}</div>
            </div>
        </div>
    </div>
    <div class="AyudaSuc">Haz clic para seleccionar o doble clic para mover una sucursal</div>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { DatePicker } from 'v-calendar'
import { usePromocionStore } from '../../../stores/promocion'
import { getSucursales } from '../../../services/SucursalesServices'

const promo = usePromocionStore()

const sucursales = ref([])
const cargando = ref(false)
const errorSucursales = ref(null)
const selDisponibles = reactive(new Set())
const selAplica = reactive(new Set())

const disponibles = computed(() => sucursales.value.filter(s => !promo.sucursalesIds.includes(s.id)))
const aplica = computed(() => sucursales.value.filter(s => promo.sucursalesIds.includes(s.id)))

const alternar = (seleccion, id) => {
    if (seleccion.has(id)) seleccion.delete(id)
    else seleccion.add(id)
}

const mover = (ids, agregar) => {
    if (agregar) {
        promo.sucursalesIds = [...promo.sucursalesIds, ...ids.filter(id => !promo.sucursalesIds.includes(id))]
    } else {
        promo.sucursalesIds = promo.sucursalesIds.filter(id => !ids.includes(id))
    }
    selDisponibles.clear()
    selAplica.clear()
}

onMounted(async () => {
    cargando.value = true
    try {
        sucursales.value = await getSucursales()
    } catch (e) {
        errorSucursales.value = e.message
    } finally {
        cargando.value = false
    }
})
</script>
