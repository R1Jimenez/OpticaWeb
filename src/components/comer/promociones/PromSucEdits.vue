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
}
</style>

<template>
<div class="SucRow">
    <text>
        Nombre:
    </text>
    <input
        type=int
        placeholder="Ingresar Nombre"
        class="bars"
        autocomplete="off"
    />
</div>
<div class="SucRow2">
    <div class="minrow">
        <text>
            Descuento (%)
        </text>
        <input
            type=int
            placeholder="Ingresar Descuento"
            class="bars"
            autocomplete="off"
        />
    </div>
    <div class="minrow">
        <text>
            Descuento Máx. Vendedor (%)
        </text>
        <input
            type=int
            placeholder="Ingresar Descuento"
            class="bars"
            autocomplete="off"
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
                    <div class="tabrow">
                        <input
                            type="checkbox"
                            class="check"
                            v-model="tipoSeleccionado"
                        >
                        <span>Acumulativa</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div class="tabrow">
                        <input
                            type="checkbox"
                            class="check"
                            v-model="tipoSeleccionado"
                        >
                        <span>Permanente</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="SuCol">
        <div class="SubTitRow">
            <text>
                Vigencia
            </text>
        </div>
        <div class="SuColRow">
            <div class="mincol1">
                <text>
                    Inicio
                </text>
                <DatePicker
                    v-model="fechaInicio"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="bars2"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
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
                    v-model="fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="fechaInicio"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="bars2"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
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
                Disponibles
            </text>
            <div class="sucspace">
                <div
                    v-for="op in opciones"
                    :key="op"
                    class="OpButton2"
                >
                    <text>{{ op }}</text>
                </div>
            </div>
        </div>

        <div class="mincolb">
            <button class="minButt">
                Agregar >
            </button>
            <button class="minButt">
                Agregar Todas >>
            </button>
            <button class="minButt">
                < Eliminar
            </button>
            <button class="minButt">
                << Eliminar Todas
            </button>
        </div>

        <div class="mincol">
            <text>
                Aplica en
            </text>
            <div class="sucspace">

            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'

const opciones = [
    'Almacen Central',
    'Jilotepec',
    'Plaza Juarez Mall',
    'Puntos Dumount',
    'Servicio a Industrias',
    'Smart La Cuesta',
    'Smart Torres Del Sur'
]

const selectedOp = ref(null)
const tipoSeleccionado = ref(false)
const fechaInicio = ref('')
const fechaFin = ref('')
</script>