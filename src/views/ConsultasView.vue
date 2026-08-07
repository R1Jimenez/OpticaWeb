<style>
.ConsPrincipal {
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

.ConsContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.ConsUsages {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>

<template>
    <div class="ConsPrincipal">
        <Header />
        <div class="ConsContenido">
            <NavBar />
            <div class="ConsUsages">
                <ConsultData />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';
import ConsultData from '../components/consultasview/ConsultData.vue';


</script>