<style scoped>
.EdPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    padding: 1%;
    gap: 15px;
}

.EdRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.EdRow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.bar {
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

.BoxSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 10%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 15px;
}

.barr {
    width: 16%;
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
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="EdPrinc">
        <div class="EdRow">
            <text>
                Nombre: 
            </text>
            <input
                class="bar"
                :value="inputValue"
                v-on="inputEvents"
                placeholder="Ingresar Nombre"
                readonly
            />
            <text>
                Tipo: 
            </text>
            <div class="BoxSelect">
                <text>
                    Todas
                </text>
                <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
            </div>
        </div>
        <div class="EdRow">
            <text>
                Descuento(%):
            </text>
            <input
                class="barr"
                :value="inputValue"
                v-on="inputEvents"
                placeholder="Ingresar Descuento"
                readonly
            />
            <text>
                Desc. Vendedor(%):
            </text>
            <input
                class="barr"
                :value="inputValue"
                v-on="inputEvents"
                placeholder="Ingresar Descuento"
                readonly
            />
            <text>
                Estatus: 
            </text>
            <div class="BoxSelect">
                <text>
                    Vigentes
                </text>
                <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>