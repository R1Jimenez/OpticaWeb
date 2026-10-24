<style>
.TicketsPrincipal {
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

.TicketsContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.TicketsUsages {
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
    scrollbar-width: thin;
    scrollbar-color: #130348 #F0F0F0;
}

.TicketsUsages > * {
    flex-shrink: 0;
}
</style>

<template>
    <div class="TicketsPrincipal">
        <Header />
        <div class="TicketsContenido">
            <NavBar />
            <div class="TicketsUsages">
                <ClienteBar
                    :key="clienteBarKey"
                    @clienteSeleccionado="cliente = $event"
                    @busquedaLimpiada="cliente = null"
                />
                <TicksFilter @consultar="filtrosForm = $event" @limpiar="limpiar" />
                <TicketsTable :filtros="filtros" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import ClienteBar from '../../components/CLienteBar.vue';
import TicksFilter from '../../components/vent/ticketsreimview/TicksFilter.vue';
import TicketsTable from '../../components/vent/ticketsreimview/TicketsTable.vue';

const filtrosForm = ref({})
const cliente = ref(null)
const clienteBarKey = ref(0)

const filtros = computed(() => ({ ...filtrosForm.value, id_cliente: cliente.value?.id ?? null }))

const limpiar = () => {
    filtrosForm.value = {}
    cliente.value = null
    clienteBarKey.value++
}
</script>