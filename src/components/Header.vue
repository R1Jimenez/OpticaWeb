<style>
.Principal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 98.5%;
    height: 10%;
    background-color: white;
    border: 2px solid #FB1C2E;
    border-radius: 30px;
    padding: .5%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    padding-left: 1.5%;
    padding-right: 1.5%;
}

.logobox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 12%;
    height: 100%;
    border: 1.5px solid #FB1C2E;
    border-radius: 20px;
    background: radial-gradient(
        ellipse at center,
        #130348 0%,
        #07072C 100%
    );
    cursor: pointer;
}

.logoheadimg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.Sucursalindicator {
    font-size: 3rem;
    line-height: 2rem;
    font-weight: 700;
    color: #130348;
}
</style>

<template>
    <div class="Principal">
        <div class="logobox" @click="handleHome">
            <img :src="logo" alt="logo" class="logoheadimg" />
        </div>
        <text class="Sucursalindicator">Sucursal: Central</text>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import logo from '../assets/logo.png'

const router = useRouter()

const handleHome = () => {
    router.push('/Home')
}
</script>