<style scoped>
.TrasPrincipal {
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

.TrasContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.TrasUsages {
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
</style>

<template>
    <div class="TrasPrincipal">
        <Header />
        <div class="TrasContenido">
            <NavBar />
            <div class="TrasUsages">
                <TraspFilt @abrirModal="modalAbierto = true" />
                <TraspTabl @abrirModaldet="moddetAbierto = true" @abrirModEdit="modedAbierto = true"/>
            </div>
        </div>
        <TraspCreate
            v-if="modalAbierto"
            @cerrar="modalAbierto = false"
        />
        <TraspDet
            v-if="moddetAbierto"
            @cerrarm="moddetAbierto = false"
        />
        <TraspCreate
            v-if="modedAbierto"
            @cerrar="modedAbierto = false"
        />    
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import TraspTabl from '../../components/inv/traspasosview/TraspTabl.vue';
import TraspFilt from '../../components/inv/traspasosview/TraspFilt.vue';
import TraspCreate from '../../components/inv/traspasosview/TraspCreate.vue';
import TraspDet from '../../components/inv/traspasosview/TraspDet.vue';

const modalAbierto = ref(false)
const moddetAbierto = ref(false)
const modedAbierto = ref(false)
</script>