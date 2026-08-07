<style scoped>
.PrincRow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.PrinColumn {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 50%;
    padding-top: 5%;
    gap: 10px;
}

.PrinColumnRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    padding-left: 30px;
    width: 100%;
}

.PrinColumnRow span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.ProvSpace {
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: 85%;
    width: 90%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
}

.ProvSpace2 {
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: 75%;
    width: 90%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
}

.CliBarsProv {
    width: 90%;
    padding: 5px 1rem;
    border: 2px solid #130348;
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
    <div class="PrincRow">
        <div class="PrinColumn">
            <div class="PrinColumnRow">
                <span>Proveedores asociados</span>
            </div>
            <div class="ProvSpace">

            </div>
        </div>
        <div class="PrinColumn">
            <div class="PrinColumnRow">
                <span>Agregar Proveedor</span>
            </div>
            <input
                type=string
                placeholder="Ingresar Código"
                class="CliBarsProv"
                v-model="searchQuery"
                autocomplete="off"
            />

            <div class="ProvSpace2">

            </div>
        </div>
    </div>
</template>

<script setup>

</script>