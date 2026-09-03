<style scoped>
.SalirModal {
    display: flex;
    flex-direction: column;
    gap: 5%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 15%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    gap: 20px;
}

.modal-content h2 {
    font-size: 1.5rem;
    font-weight: 550;
    color: #130348;
}

.modal-buttons {
    display: flex;
    gap: 20px;
}

.cancelar {
    padding: 8px 16px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 20px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
}

.cancelar:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    color: #130348;
    border: solid 2px #130348;
}

.salir {
    padding: 8px 16px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #A70F1A 100%
    );
    border: 2px solid white;
    border-radius: 20px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
}

.salir:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    color: #FB1C2E;
    border: solid 2px #FB1C2E;
}
</style>

<template>
    <div class="SalirModal" @click.self="$emit('cerrar')">
        <div class="modal-content">
            <h2>¿Estás seguro de que deseas salir?</h2>
            <div class="modal-buttons">
                <button class="cancelar" @click="confirmarSalida">Cancelar</button>
                <button class="salir" @click="salir">Salir</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['cerrar'])
const router = useRouter()
const authStore = useAuthStore()

const cancelarSalida = () => {
    emit('cerrar')
}

const confirmarSalida = () => {
    emit('cerrar')
}

const salir = async () => {
    authStore.logout()

    // Cleanup possible standalone token keys used by mobile/web flows.
    localStorage.removeItem('token_movil')
    localStorage.removeItem('tokenMovil')
    localStorage.removeItem('token')

    emit('cerrar')
    await router.push('/')
}
</script>