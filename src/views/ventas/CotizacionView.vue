<style>
.CotPrincipal {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    padding: .5%;
    padding-top: 1%;
    padding-bottom: 0%;
    gap: 1.5%;
}

.CotContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.CotUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: 1.5%;
    overflow-y: auto;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <div class="CotPrincipal">
        <Header />
        <div class="CotContenido">
            <NavBar />
            <div class="CotUsages">
                <FiltCotiz />
                <ProdCotiz />
                <CotizEdits />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import CotizEdits from '../../components/vent/cotizacionview/CotizEdits.vue'
import FiltCotiz from '../../components/vent/cotizacionview/FiltCotiz.vue'
import ProdCotiz from '../../components/vent/cotizacionview/ProdCotiz.vue'

</script>