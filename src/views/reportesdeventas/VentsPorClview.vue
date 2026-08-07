<style scoped>
.VenPorCliPrinc {
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

.VenPorCliCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.VenPorCliUsages {
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

.VenPorCliEdsPrinc {
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

.EdsVPCHeader {
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

.EdsVPCHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FoGridVPC {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
    margin-left: 30px;
}

.FoGridVPC text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGridVPC span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.rowforVPC {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
}

.minrowforVPC {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.check4 {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.SectBoxVPC {
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

.SectBoxVPC.placeholder {
    color: #999;
}

.daterowVPC {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-top: 10px;
    margin-left: 30px;
    padding-right: 22%;
}

.daterowVPC span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.dateVPC {
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

.CliBarsVPC {
    width: 60%;
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

.DespButtonVPC {
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

.DespButtonVPC:hover {
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
    <div class="VenPorCliPrinc">
        <Header />
        <div class="VenPorCliCont">
            <NavBar />
            <div class="VenPorCliUsages">
                <div class="VenPorCliEdsPrinc">
                    <div class="EdsVPCHeader">
                        <span>Reportes - Ventas Por Cliente</span>
                    </div>
                    <div class="FoGridVPC">
                        <text>Formato:</text>
                        <div class="rowforVPC">
                            <div class="minrowforVPC">
                                <input
                                    type="radio"
                                    class="check4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Pantalla</span>
                            </div>
                            
                            <div class="minrowforVPC">
                                <input
                                    type="radio"
                                    class="check4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>PDF</span>
                            </div>

                            <div class="minrowforVPC">
                                <input
                                    type="radio"
                                    class="check4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Excel</span>
                            </div>
                            
                            <div class="minrowforVPC">
                                <input
                                    type="radio"
                                    class="check4"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Plano</span>
                            </div>
                        </div>

                        <text>Sucursales:</text>
                        <div class="SectBoxVPC">
                            <span>
                                Sucursales
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <div class="daterowVPC">
                        <span>Fecha Inicial:</span>
                        <DatePicker
                            v-model="fechaFin"
                            :masks="{ input: 'DD/MM/YYYY' }"
                            locale="es"
                            :min-date="fechaInicio"
                        >
                            <template #default="{ inputValue, inputEvents }">
                                <input
                                    class="dateVPC"
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
                                    class="dateVPC"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    placeholder="dd/mm/aaaa"
                                    readonly
                                />
                            </template>
                        </DatePicker>
                    </div>

                    <div class="FoGridVPC">
                        <text>Cliente:</text>
                        <input
                            type=string
                            placeholder="Ingresar Cliente"
                            class="CliBarsVPC"
                            v-model="searchQuery"
                            autocomplete="off"
                        />

                        <text>Tipo de Venta:</text>
                        <div class="SectBoxVPC">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Plazo:</text>
                        <div class="SectBoxVPC">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Estatus del Presupuesto:</text>
                        <div class="SectBoxVPC">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <button class="DespButtonVPC">
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