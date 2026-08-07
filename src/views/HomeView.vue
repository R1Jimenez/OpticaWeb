<style scoped>
.HomePrincipal {
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

.Homecontenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}
.itemsmix {
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

.chess-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 45%;
}

.chess-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
}
</style>

<template>
    <div class = 'HomePrincipal'>
        <Header />
        <div class="Homecontenido">
            <NavBar />
            <div class="itemsmix">
                <div class="chess-row">
                    <div class="chess-cell">
                        <HomeItem name="Caja" icon="point_of_sale"/>
                    </div>
                <div class="chess-cell">
            </div>
            <div class="chess-cell">
                <HomeItem name="Ventas" icon="shopping_cart" @click="handleVen"/>
            </div>
            <div class="chess-cell">
        </div>
    </div>

    <!-- Fila 2: Espacio | Gerencia | Espacio | Optometria -->
    <div class="chess-row">
        <div class="chess-cell">
            <!-- Espacio vacío -->
        </div>
        <div class="chess-cell">
            <HomeItem name="Gerencia" icon="bar_chart" />
        </div>
        <div class="chess-cell">
            <!-- Espacio vacío -->
        </div>
        <div class="chess-cell">
            <HomeItem name="Optometria" icon="visibility" @click="handleOpt"/>
        </div>
    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import NavBar from '../components/NavBar.vue'
import HomeItem from '../components/HomeItem.vue'

const router = useRouter();

const handleOpt = () => {
    router.push('/Optometria')
}

const handleVen = () => {
    router.push('/Ventas')
}
</script>