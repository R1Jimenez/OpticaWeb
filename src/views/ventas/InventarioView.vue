<style scoped>
.InventPrincipal {
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

.InventContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.InventUsages {
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
    <div class="InventPrincipal">
        <Header />
        <div class="InventContenido">
            <NavBar />
            <div class="InventUsages">
                <ProductSearch />
                <ProductTable />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductTable from '../../components/vent/inventarioview/ProductTable.vue';
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import ProductSearch from '../../components/vent/inventarioview/ProductSearch.vue';


</script>