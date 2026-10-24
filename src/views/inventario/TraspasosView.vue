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

/* padding-bottom no se respeta al final de un contenedor flex con scroll */
.TrasUsages::after {
    content: '';
    flex-shrink: 0;
    height: 20px;
}
</style>

<template>
    <div class="TrasPrincipal">
        <Header />
        <div class="TrasContenido">
            <NavBar />
            <div class="TrasUsages">
                <TraspFilt @abrirModal="abrirEdicion(null)" @filtrar="filtros = $event" />
                <TraspTabl
                    :filtros="filtros"
                    :recarga="recarga"
                    @ver="traspasoDetalle = $event"
                    @editar="abrirEdicion($event)"
                />
            </div>
        </div>
        <TraspCreate
            v-if="edicionAbierta"
            :traspaso-id="traspasoEdicion"
            @cerrar="edicionAbierta = false"
            @guardado="recarga++"
        />
        <TraspDet
            v-if="traspasoDetalle != null"
            :traspaso-id="traspasoDetalle"
            @cerrarm="traspasoDetalle = null"
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

const filtros = ref({})
const recarga = ref(0)
const edicionAbierta = ref(false)
const traspasoEdicion = ref(null)
const traspasoDetalle = ref(null)

const abrirEdicion = (id) => {
    traspasoEdicion.value = id
    edicionAbierta.value = true
}
</script>