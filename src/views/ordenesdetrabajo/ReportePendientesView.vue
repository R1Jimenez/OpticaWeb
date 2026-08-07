<style scoped>
.ReportePendientesPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: .5%;
    padding-top: 1%;
    padding-bottom: 0%;
    gap: 1.5%;
}

.ReportePendientesCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.ReportePendientesUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: 1.5%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #130348 #F0F0F0;
    padding-bottom: 1%;
    box-sizing: border-box;
}

.ReportePendientesEdsPrinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    padding-bottom: 16px;
    overflow: hidden;
}

.EdsRPenHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 5px 16px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
}

.EdsRPenHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FoGridRPen {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
    margin-left: 30px;
}

.FoGridRPen text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGridRPen span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.rowforRPen {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
}

.minrowforRPen {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.chec4 {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.SectBoxRPen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
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

.SectBoxRPen.placeholder {
    color: #999;
}

.daterowRPen {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-top: 10px;
    margin-left: 30px;
    padding-right: 22%;
}

.daterowRPen span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.daterowRePen {
    width: 30%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    color: #130348;
}

.DespButtonRPen {
    margin-top: 2%;
    padding: 7px 1rem;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 22px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.DespButtonRPen:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    color: #130348;
}
</style>

<template>
    <div class="ReportePendientesPrinc">
        <Header />
        <div class="ReportePendientesCont">
            <NavBar />
            <div class="ReportePendientesUsages">
                <div class="ReportePendientesEdsPrinc">
                    <div class="EdsRPenHeader">
                        <span>Reportes - Ordenes de Trabajo Pendientes</span>
                    </div>
                    <div class="FoGridRPen">
                        <text>Formato:</text>
                        <div class="rowforRPen">
                            <div class="minrowforRPen">
                                <input
                                    type="radio"
                                    class="chec4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Pantalla</span>
                            </div>
                            
                            <div class="minrowforRPen">
                                <input
                                    type="radio"
                                    class="chec4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>PDF</span>
                            </div>

                            <div class="minrowforRPen">
                                <input
                                    type="radio"
                                    class="chec4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Excel</span>
                            </div>
                            
                            <div class="minrowforRPen">
                                <input
                                    type="radio"
                                    class="chec4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Plano</span>
                            </div>
                        </div>

                        <text>Sucursales:</text>
                        <div class="SectBoxRPen">
                            <span>
                                Sucursales
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <div class="daterowRPen">
                        <span>Fecha Inicial:</span>
                        <DatePicker
                            v-model="fechaFin"
                            :masks="{ input: 'DD/MM/YYYY' }"
                            locale="es"
                            :min-date="fechaInicio"
                        >
                            <template #default="{ inputValue, inputEvents }">
                                <input
                                    class="daterowRePen"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    placeholder="dd/mm/aaaa"
                                    readonly
                                />
                            </template>
                        </DatePicker>

                        <span>Fecha Final:</span>
                        <DatePicker
                            v-model="fechaFin"
                            :masks="{ input: 'DD/MM/YYYY' }"
                            locale="es"
                            :min-date="fechaInicio"
                        >
                            <template #default="{ inputValue, inputEvents }">
                                <input
                                    class="daterowRePen"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    placeholder="dd/mm/aaaa"
                                    readonly
                                />
                            </template>
                        </DatePicker>
                    </div>

                    <button class="DespButtonRPen">
                        Desplegar Reporte
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DatePicker } from 'v-calendar'
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';



</script>