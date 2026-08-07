<style>
.VentPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    padding: .5%;
    padding-top: 1%;
    padding-bottom: 0%;
    gap: 1.5%;
}

.VentContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex: 1;
}

.VentUsages {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.fr {
    display: flex;
    flex-direction: row;
    justify-content: left;
    height: 33%;
    width: 100%;
    padding-left: 10%;
    padding-top: 7%;
}

.sr {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 33%;
    width: 100%;
}

.tr {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    height: 33%;
    width: 100%;
    padding-right: 12%;
    padding-bottom: 7%;
}

.element {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 12%;
    width: 17%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 30px;
    cursor: pointer
}

.element2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 45%;
    width: 21%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2.5px solid #FB1C2E;
    border-radius: 30px;
    cursor: pointer;
}

.element text {
    font-size: 2.3rem;
    font-weight: bold;
    color: #130348;
}

.element2 text {
    font-size: 2.3rem;
    font-weight: bold;
    color: #130348;
}
</style>

<template>
    <div class="VentPrinc">
        <Header />
        <div class="VentContenido">
            <NavBar />
            <div class="VentUsages">
                <div class="fr">
                    <div class="element" @click="handleCons">
                        <text>Consultas</text>
                    </div>
                </div>
                <div class="sr">
                    <div class="element2" @click="handleCot">
                        <text>Cotizacion</text>
                    </div>
                </div>
                <div class="tr">
                    <div class="element">
                        <text>Mostrador</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';

const router = useRouter()

const handleCons = () => {
    router.push('/Consultas')
}

const handleCot = () => {
    router.push('/Cotizacion')
}
</script>