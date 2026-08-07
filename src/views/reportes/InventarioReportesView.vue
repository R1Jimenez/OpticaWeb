<style scoped>
.InvReportesPrinc {
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

.InvReportesCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.InvReportesUsages {
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

.InvReportesEdsPrinc {
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

.EdsIRHeader {
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

.EdsIRHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FoGridIR {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
    margin-left: 30px;
}

.FoGridIR text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGridIR span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.rowforIR {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
}

.minrowforIR {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.chec9 {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.SectBoxIR {
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

.SectBoxIR.placeholder {
    color: #999;
}

.SubtituloIR {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
    padding-right: 50%;
    margin-top: 1%;
}

.CliBarsIR {
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

.DespButtonIR {
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

.DespButtonIR:hover {
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
    <div class="InvReportesPrinc">
        <Header />
        <div class="InvReportesCont">
            <NavBar />
            <div class="InvReportesUsages">
                <div class="InvReportesEdsPrinc">
                    <div class="EdsIRHeader">
                        <span>Reportes - Inventario</span>
                    </div>
                    <div class="FoGridIR">
                        <text>Formato:</text>
                        <div class="rowforIR">
                            <div class="minrowforIR">
                                <input
                                    type="radio"
                                    class="chec9"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Pantalla</span>
                            </div>
                            
                            <div class="minrowforIR">
                                <input
                                    type="radio"
                                    class="chec9"
                                    v-model="tipoSeleccionado"
                                >
                                <span>PDF</span>
                            </div>

                            <div class="minrowforIR">
                                <input
                                    type="radio"
                                    class="chec9"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Excel</span>
                            </div>
                            
                            <div class="minrowforIR">
                                <input
                                    type="radio"
                                    class="chec9"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Plano</span>
                            </div>
                        </div>

                        <text>Sucursales:</text>
                        <div class="SectBoxIR">
                            <span>
                                Sucursales
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>código:</text>
                        <input
                            type=string
                            placeholder="Ingresar Código"
                            class="CliBarsIR"
                            v-model="searchQuery"
                            autocomplete="off"
                        />

                        <text>Tipo de Producto:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Estatus del Producto:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Nivel de Producto:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <span class="SubtituloIR">
                        Atributos de Producto
                    </span>

                    <div class="FoGridIR">
                        <text>Tipo:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Marca:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Modelo:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Colores:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Tamaño:</text>
                        <div class="SectBoxIR">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>
                    
                    <button class="DespButtonIR">
                        Desplegar Reporte
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';



</script>