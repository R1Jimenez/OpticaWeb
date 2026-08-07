<style scoped>
.PromConsPrinc {
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

.PromConsCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.PromConsUsages {
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
    <div class="PromConsPrinc">
        <Header />
        <div class="PromConsCont">
            <NavBar />
            <div class="PromConsUsages">
                <ConsPromsEdits />
                <ConsPromTab />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import ConsPromTab from '../../components/comer/promconsview/ConsPromTab.vue';
import ConsPromsEdits from '../../components/comer/promconsview/ConsPromsEdits.vue';

</script>