<style scoped>
.ConsulOrdPrincipal {
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

.ConsulOrdContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.ConsulOrdUsages {
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
.ConsulOrdUsages::after {
    content: '';
    flex-shrink: 0;
    height: 20px;
}
</style>

<template>
    <div class="ConsulOrdPrincipal">
        <Header />
        <div class="ConsulOrdContenido">
            <NavBar />
            <div class="ConsulOrdUsages">
                <OrderFilter @consultar="filtros = $event" />
                <OrderTable :filtros="filtros" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import OrderFilter from '../../components/ordtra/consulordview/OrderFilter.vue';
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import OrderTable from '../../components/ordtra/consulordview/OrderTable.vue'

const filtros = ref({})
</script>