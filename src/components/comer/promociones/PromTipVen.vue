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
}
</style>

<template>
  
        <div class="rowtip">
            <table class="PromtipVentable">
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 50%;">
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <text>
                                Tipo:
                            </text>
                        </td>
                        <td>
                            <div class="tabrow2">
                                <input
                                    type="radio"
                                    class="check"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Por Tipo de Venta</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div class="tabrow">
                                <input
                                    type="radio"
                                    class="check"
                                    v-model="tipoSeleccionado"
                                >
                                <span>Por Plazo</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="ColSuc">
            <div class="rosu">
                <span>
                    Tipos de Venta
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

</script>