<style>
.ContenedorPrincipal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.prueba {
    font-size: 2.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #130348;
}

.logcontainer {
    width: 22%;
    height: 55%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border-radius: 20px;
    border: 4px solid #FB1C2E;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5%;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 5%;
}

.subtext {
    font-size: 1.2rem;
    font-weight: 500;
    color: #130348;
    padding-top: 2%;
}

.values {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 13px;
}

.inputwrapper {
    position: relative;
    width: 100%;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #130348;
    font-size: 1.5rem;
    pointer-events: none;
}

.entryvals {
    width: 100%;
    padding: 0.625rem 0.875rem 0.625rem 2.8rem;
    border: 2px solid #130348;
    border-radius: 20px;
    font-size: 1.5rem;
    transition: all 0.2s;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    padding-top: 3%;
}

.button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65%;
    height: 13%;
    border-radius: 2rem;
    background-color: #130348;
    color: white;
    font-size: 1.5rem;
    margin-top: 10%;
    cursor: pointer;
}
</style>

<template>
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<div class = 'ContenedorPrincipal'>
    <div class = 'logcontainer'>
        <div class = 'title'>
            <span class="material-icons" style="font-size: 90px; color: #130348;">
                remove_red_eye
            </span>
            <h1 class = 'prueba'>Visual Optics</h1>
            <text class = 'subtext'>Inicia sesión en tu cuenta</text>
        </div>
        <div class="values">
            <div class = "inputwrapper">
                <span class="material-icons input-icon">person</span>
                <input 
                  type="text"
                  placeholder="Nombre de usuario"
                  class="entryvals"
                />
            </div>
            <div class = "inputwrapper">
                <span class="material-icons input-icon">lock</span>
                <input 
                  type="text"
                  placeholder="Contraseña"
                  class="entryvals"
                />
            </div>
        </div>
        <div class="row">
            <text class="subtext">
                ¿Olvidaste tu contraseña?
            </text>
        </div>
        <div class="button" @click="handleSignup">
            Iniciar Sesión
        </div>
    </div>
</div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter()

const handleSignup = () => {
    router.push('/Home')
}

</script>