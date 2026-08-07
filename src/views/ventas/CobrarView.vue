<style scoped>
.CobrarPrincipal {
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

.CobrarContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.CobrarUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: 1.5%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #130348 #F0F0F0;
    padding-bottom: 1%;
    box-sizing: border-box;
}

.CobrarUsages > * {
    flex-shrink: 0;
}

.CobrarUsages.scrollable {
    overflow-y: auto;
}
</style>

<template>
    <div class="CobrarPrincipal">
        <Header />
        <div class="CobrarContenido">
            <NavBar />
            <div class="CobrarUsages">
                <CLienteBar @clienteSeleccionado="onClienteSeleccionado"/>
                <CobrarOptions />
                <FormasPago />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CLienteBar from '../../components/CLienteBar.vue';
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import CobrarOptions from '../../components/vent/cobrarview/CobrarOptions.vue';
import FormasPago from '../../components/vent/cobrarview/FormasPago.vue'

const clienteSeleccionado = ref(null)
const pacienteSeleccionado = ref(null)

const onClienteSeleccionado = (cliente) => {
    clienteSeleccionado.value = cliente
    pacienteSeleccionado.value = null
    cargarPacientes(cliente.id)
}
</script>