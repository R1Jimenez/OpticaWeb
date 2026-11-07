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
    margin-top: 10%;
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
    padding: 0.400rem 0.875rem 0.400rem 2.8rem;
    border: 2px solid #130348;
    border-radius: 20px;
    font-size: 1.2rem;
    transition: all 0.2s;
}

.entryvals.con-toggle {
    padding-right: 2.8rem;
}

.toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    padding: 2px;
    border: none;
    border-radius: 50%;
    background: none;
    color: #130348;
    cursor: pointer;
}

.toggle-password:hover {
    background-color: rgba(19, 3, 72, 0.08);
}

.toggle-password .material-icons {
    font-size: 1.4rem;
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
    transition: opacity 0.2s;
    margin-top: auto;
}

.button:hover { opacity: 0.85; }
.button.disabled { opacity: 0.6; cursor: not-allowed; }

.error-banner {
    width: 100%;
    margin-top: 4%;
    padding: 10px 14px;
    background: #FFF0F0;
    border: 1px solid #FB1C2E;
    border-radius: 8px;
    color: #FB1C2E;
    font-size: 0.95rem;
    text-align: center;
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
                  v-model="form.usuario"
                  @keyup.enter="handleLogin"
                />
            </div>
            <div class = "inputwrapper">
                <span class="material-icons input-icon">lock</span>
                <input 
                  :type="mostrarPassword ? 'text' : 'password'"
                  placeholder="Contraseña"
                  class="entryvals con-toggle"
                  autocomplete="current-password"
                  v-model="form.password"
                  @keyup.enter="handleLogin"
                />
                <button
                  type="button"
                  class="toggle-password"
                  :title="mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  :aria-label="mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  :aria-pressed="mostrarPassword"
                  data-cy="toggle-password"
                  @click="mostrarPassword = !mostrarPassword"
                >
                    <span class="material-icons">{{ mostrarPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
            </div>
        </div>
        <div class="row">
            <text class="subtext">
                ¿Olvidaste tu contraseña?
            </text>
        </div>
        <div class="button" :class="{ disabled: isLoading }" @click="handleLogin">
            {{ isLoading ? 'Ingresando...' : 'Iniciar Sesión' }}
        </div>
        <div v-if="loginError" class="error-banner">{{ loginError }}</div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../services/UserServices'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ usuario: '', password: '' })
const mostrarPassword = ref(false)
const isLoading = ref(false)
const loginError = ref(null)

const handleLogin = async () => {
    loginError.value = null

    if (!form.value.usuario.trim() || !form.value.password) {
        loginError.value = 'Ingresa tu usuario y contraseña'
        return
    }

    isLoading.value = true
    try {
        const user = await loginUser({
            usuario:  form.value.usuario.trim(),
            password: form.value.password,
        })
        authStore.setUser(user)
        router.push('/Home')
    } catch (e) {
        loginError.value = e.message
    } finally {
        isLoading.value = false
    }
}
</script>