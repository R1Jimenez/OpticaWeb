<style scoped>
.PrecExPrinc {
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

.PrecExCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.PrecExUsages {
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

.PrecExEdsPrinc {
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

.EdsPEXHeader {
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

.EdsPEXHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FoGridPEX {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
    margin-left: 30px;
}

.FoGridPEX text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGridPEX span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.rowforPEX {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 100%;
}

.minrowforPEX {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.chec8 {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.SectBoxPEX {
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

.SectBoxPEX.placeholder {
    color: #999;
}

.SubtituloPEX {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
    padding-right: 50%;
    margin-top: 1%;
}

.DespButtonPEX {
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

.DespButtonPEX:hover {
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
    <div class="PrecExPrinc">
        <Header />
        <div class="PrecExCont">
            <NavBar />
            <div class="PrecExUsages">
                <div class="PrecExEdsPrinc">
                    <div class="EdsPEXHeader">
                        <span>Reportes - Precios y Existencias</span>
                    </div>
                    <div class="FoGridPEX">
                        <text>Formato:</text>
                        <div class="rowforPEX">
                            <div class="minrowforPEX">
                                <input
                                    type="radio"
                                    class="chec8"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Pantalla</span>
                            </div>
                            
                            <div class="minrowforPEX">
                                <input
                                    type="radio"
                                    class="chec8"
                                    v-model="tipoSeleccionado"
                                >
                                <span>PDF</span>
                            </div>

                            <div class="minrowforPEX">
                                <input
                                    type="radio"
                                    class="chec8"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Excel</span>
                            </div>
                            
                            <div class="minrowforPEX">
                                <input
                                    type="radio"
                                    class="chec8"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Plano</span>
                            </div>
                        </div>

                        <text>Sucursales:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Sucursales
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Condicion:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Nivel:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Costo y Precio Venta
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>

                    <span class="SubtituloPEX">
                        Atributos de Producto
                    </span>

                    <div class="FoGridPEX">
                        <text>Tipo:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Marca:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Modelo:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Colores:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>

                        <text>Tamaño:</text>
                        <div class="SectBoxPEX">
                            <span>
                                Todos
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                    </div>
                    
                    <button class="DespButtonPEX">
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