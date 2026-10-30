<style scoped>
.ConexPrincipal {
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

.ConexContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.ConexUsages {
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

/* padding-bottom no se respeta al final de un contenedor flex con scroll */
.ConexUsages::after {
    content: '';
    flex-shrink: 0;
    height: 20px;
}
</style>

<template>
    <div class="ConexPrincipal">
        <Header />
        <div class="ConexContenido">
            <NavBar />
            <div class="ConexUsages">
                <ConexFilt @filtrar="filtros = $event" />
                <ConexTabla :filtros="filtros" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import NavBar from '../../components/NavBar.vue'
import ConexFilt from '../../components/sist/conexionesview/ConexFilt.vue'
import ConexTabla from '../../components/sist/conexionesview/ConexTabla.vue'

const filtros = ref({})
</script>
