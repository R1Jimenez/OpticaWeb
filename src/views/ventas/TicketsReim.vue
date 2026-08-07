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
    overflow-y: hidden;
}
</style>

<template>
    <div class="TicketsPrincipal">
        <Header />
        <div class="TicketsContenido">
            <NavBar />
            <div class="TicketsUsages">
                <ClienteBar />
                <TicksFilter />
                <TicketsTable />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import ClienteBar from '../../components/CLienteBar.vue';
import TicksFilter from '../../components/vent/ticketsreimview/TicksFilter.vue';
import TicketsTable from '../../components/vent/ticketsreimview/TicketsTable.vue';


</script>