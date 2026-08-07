<style scoped>
.rowtip {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 1.5%;
}

.PromClitable text {
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

.check {
    border: 1px solid #FB1C2E;
    border-radius: 15px;
}

.ProdRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.ProdRow2 {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.ProdRow text{
    font-size: 1.3rem;
    font-weight: 600;
    color: #130348;
}

.ProdRow2 text{
    font-size: 1.3rem;
    font-weight: 600;
    color: #130348;
}

.bars3 {
    width: 60%;
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

.bars4 {
    width: 60%;
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
    resize: none;
    font-family: inherit;
    min-height: 2.2rem;   
}

.AgBut {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15%;
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: .2%;
    gap: 7%;
    color: white;
    font-size: .9rem;
    font-weight: 600;
}

.ElBut {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #130348;
    border-radius: 15px;
    padding: .1%;
    gap: 7%;
    color: #130348;
    font-size: .9rem;
    font-weight: 600;
}
</style>

<template>
    <div class="rowtip">
        <table class="PromClitable">
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
                                <span>Por Cliente especifico</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="tabrow2">
                            <input
                                type="radio"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                                <span>Por Tipo de Cliente</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="ProdRow">
        <text>
            Cliente
        </text>
        <input
            class="bars3"
            :value="inputValue"
            v-on="inputEvents"
            placeholder="Ingresar Cliente"
            readonly
        />
        <button class="AgBut">
            Agregar
            <span class="material-icons" style="color:white; font-size:23px;">add</span>
        </button>
    </div>
    <div class="ProdRow2">
        <text>
            Aplica en
        </text>
        <textarea
            class="bars4"
            :value="inputValue"
            v-on="inputEvents"
            placeholder=""
            readonly
            rows="5"
        ></textarea>
        <button class="ElBut">
            Eliminar
            <span class="material-icons" style="color:#130348; font-size:23px;">remove</span>
        </button>
    </div>
</template>

<script setup>

</script>