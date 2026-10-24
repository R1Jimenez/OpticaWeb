<style scoped>
.TicksFilterPrinc {
    display: flex;
    flex-direction: column;
    height: 15%;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
}

.CliBar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    width: 100%;
}

.CliBar2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    width: 100%;
    padding-right: 10%;
}

.MinCliRows {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    height: 100%;
}

.MinCliRows text{
    font-size: 1rem;
    color: #130348;
    font-weight: 600;
}

.FechasInp {
    width: 50%;
    height: 50%;
    padding: 0.625rem 0.1rem 0.625rem 1rem;
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

.ConsTicks {
    padding: 10px 35px;
    border: 1px solid #FFFFFF;
    border-radius: 15px;
    background-color: #130348;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
}

.ConsTicks:hover {
    background-color: #230097;
}

.ConsTicks.secundario {
    padding: 10px 20px;
    background-color: transparent;
    border: 1.5px solid #130348;
    color: #130348;
}

.ConsTicks.secundario:hover {
    background-color: #F0F0F0;
}

.BtnGroup {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.DateWrap {
    width: 50%;
}

.DateWrap .FechasInp {
    width: 100%;
    height: auto;
}
</style>

<template>
    <div class="TicksFilterPrinc">
        <div class="CliBar">
            <div class="MinCliRows">
                <text>
                    Fecha Inicial:
                </text>
                <DatePicker
                    v-model="fechaInicio"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :max-date="fechaFin"
                    class="DateWrap"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="FechasInp"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
            <div class="MinCliRows">
                <text>
                    Fecha Final:
                </text>
                <DatePicker
                    v-model="fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="fechaInicio"
                    class="DateWrap"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="FechasInp"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
        </div>
        <div class="CliBar2">
            <div class="MinCliRows">
                <text>
                    Folio:
                </text>
                <input 
                    type="number"
                    min="1"
                    placeholder="Consultar Folio"
                    class="FechasInp"
                    v-model="folio"
                    autocomplete="off"
                    @keyup.enter="consultar"
                />
            </div>
            <div class="BtnGroup">
                <button class="ConsTicks secundario" @click="limpiar">
                    Limpiar
                </button>
                <button class="ConsTicks" @click="consultar">
                    Consultar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'

const emit = defineEmits(['consultar', 'limpiar'])

const fechaInicio = ref(null)
const fechaFin = ref(null)
const folio = ref('')

// Rango en hora local: desde el inicio del día inicial hasta el inicio del día siguiente al final
const inicioDelDia = (fecha, diasExtra = 0) => {
    if (!fecha) return null
    const d = new Date(fecha)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + diasExtra)
    return d.toISOString()
}

const consultar = () => {
    emit('consultar', {
        folio: folio.value || null,
        desde: inicioDelDia(fechaInicio.value),
        hasta: inicioDelDia(fechaFin.value, 1),
    })
}

const limpiar = () => {
    fechaInicio.value = null
    fechaFin.value = null
    folio.value = ''
    emit('limpiar')
}
</script>