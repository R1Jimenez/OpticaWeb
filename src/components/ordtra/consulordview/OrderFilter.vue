<style scoped>
.OrdFilterPrinc {
    display: flex;
    flex-direction: column;
    height: 20%;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    gap: 7%;
    flex-shrink: 0;
}

.ConsFiltHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.ConsFiltHeader span {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
}

.FiltRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.RowData {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 33%;
}

.RowData text {
    font-size: 1.3rem;
    font-weight: 500;
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

.EstBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 27%;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    cursor: pointer;
}

.RowData2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 50%;
}

.RowData2 text {
    font-size: 1.3rem;
    font-weight: 500;
    color: #130348;
}

.RowData3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 20%;
}

.RowData3 text {
    font-size: 1.3rem;
    font-weight: 500;
    color: #130348;
}

.EstBox2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 47%;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    cursor: pointer;
}

.Consbtn {
    padding: 10px 35px;
    border: 1px solid #FFFFFF;
    border-radius: 15px;
    background-color: #130348;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 500;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="OrdFilterPrinc">
        <div class="ConsFiltHeader">
            <span>
                Consultar Ordenes de Trabajo
            </span>
        </div>
        <div class="FiltRow">
            <div class="RowData">
                <text>
                    Orden #
                </text>
                <input
                    type=int
                    placeholder="Numero de Orden"
                    class="bars"
                    v-model="searchQuery"
                    autocomplete="off"
                />
            </div>
            <div class="RowData">
                <text>
                    Presupuesto #
                </text>
                <input
                    type=int
                    placeholder="Ingresar Presupuesto"
                    class="bars"
                    v-model="searchQuery"
                    autocomplete="off"
                />
            </div>
            <div class="RowData">
                <text>
                    Estatus Óptica
                </text>
                <div class="EstBox">
                    <text>
                        Activo
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
        </div>
        <div class="FiltRow">
            <div class="RowData2">
                <text>
                    Nombre Cliente:
                </text>
                <ClienteBarSec />
            </div>
            <div class="RowData3">
                <text>
                    Sucursal
                </text>
                <div class="EstBox2">
                    <text>
                        Activo
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
            <button class="Consbtn">
                Consultar
            </button>
        </div>
    </div>
</template>

<script setup>
import ClienteBarSec from './ClienteBarSec.vue';


</script>