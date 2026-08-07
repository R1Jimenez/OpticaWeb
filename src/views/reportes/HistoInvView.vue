<style scoped>
.HistoInvPrinc {
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

.HistoInvCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.HistoInvUsages {
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

.HistoInvEdsPrinc {
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

.EdsHIHeader {
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

.EdsHIHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FoGridHI {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
    margin-left: 30px;
}

.FoGridHI text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGridHI span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.rowforHI {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
}

.minrowforHI {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.chec12 {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.SectBoxHI {
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

.SectBoxHI.placeholder {
    color: #999;
}

.SubtituloHI {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
    padding-right: 50%;
    margin-top: 1%;
}

.daterowHI {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-top: 10px;
    margin-left: 30px;
    padding-right: 22%;
}

.daterowHI span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.daterowHIN {
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

.CliBarsHI {
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

.DespButtonHI {
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

.DespButtonHI:hover {
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
    <div class="HistoInvPrinc">
        <Header />
        <div class="HistoInvCont">
            <NavBar />
            <div class="HistoInvUsages">
                <div class="HistoInvEdsPrinc">
                    <div class="EdsHIHeader">
                        <span>Reportes - Valor Historico de Inventario</span>
                    </div>
                    <div class="FoGridHI">
                        <text>Formato:</text>
                        <div class="rowforHI">
                            <div class="minrowforHI">
                                <input
                                    type="radio"
                                    class="chec12"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Pantalla</span>
                            </div>
                            
                            <div class="minrowforHI">
                                <input
                                    type="radio"
                                    class="chec12"
                                    v-model="tipoSeleccionado"
                                >
                                <span>PDF</span>
                            </div>

                            <div class="minrowforHI">
                                <input
                                    type="radio"
                                    class="chec12"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Excel</span>
                            </div>
                            
                            <div class="minrowforHI">
                                <input
                                    type="radio"
                                    class="chec12"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Plano</span>
                            </div>
                        </div>

                        <text>Sucursales:</text>
                        <div class="SectBoxHI">
                            <span>
                                Sucursales
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <div class="daterowHI">
                        <span>Fecha Inicial:</span>
                        <DatePicker
                            v-model="fechaFin"
                            :masks="{ input: 'DD/MM/YYYY' }"
                            locale="es"
                            :min-date="fechaInicio"
                        >
                            <template #default="{ inputValue, inputEvents }">
                                <input
                                    class="daterowHIN"
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
                                    class="daterowHIN"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    placeholder="dd/mm/aaaa"
                                    readonly
                                />
                            </template>
                        </DatePicker>
                    </div>
                    
                    <div class="FoGridHI">
                        <text>Categorías:</text>
                        <div class="SectBoxHI">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <span class="SubtituloHI">
                        Atributos de Producto
                    </span>

                    <div class="FoGridHI">
                        <text>Tipo:</text>
                        <div class="SectBoxHI">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Marca:</text>
                        <div class="SectBoxHI">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Modelo:</text>
                        <div class="SectBoxHI">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Colores:</text>
                        <div class="SectBoxHI">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Tamaño:</text>
                        <div class="SectBoxHI">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>
                    
                    <button class="DespButtonHI">
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