<style scoped>
.PromoPrincipal {
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

.PromoContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.PromoUsages {
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

.TitRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 100%;
    padding-left: 3%;
}

.TitProm {
    font-size: 2rem;
    font-weight: 600;
    color: #F0F0F0;
}
</style>

<template>
    <div class="PromoPrincipal">
        <Header />
        <div class="PromoContenido">
            <NavBar />
            <div class="PromoUsages">
                <div class="TitRow">
                    <span class="TitProm">
                        Promociones
                    </span>
                </div>
                <PromConEdits />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import PromConEdits from '../../components/comer/promociones/PromConEdits.vue';


</script>