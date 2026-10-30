<style scoped>
.TipCliPrincipal {
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

.TipCliContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.TipCliUsages {
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

/* padding-bottom no se respeta al final de un contenedor flex con scroll */
.TipCliUsages::after {
    content: '';
    flex-shrink: 0;
    height: 20px;
}

.toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    background-color: #2E8B57;
    color: white;
    font-size: 0.95rem;
    font-weight: 500;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>

<template>
    <div class="TipCliPrincipal">
        <Header />
        <div class="TipCliContenido">
            <NavBar />
            <div class="TipCliUsages">
                <TipCliFilt v-model:busqueda="busqueda" @agregar="abrir(null)" />
                <TipCliTabla
                    :tipos="tipos"
                    :busqueda="busqueda"
                    :is-loading="isLoading"
                    :error-msg="errorMsg"
                    @modificar="abrir($event)"
                    @eliminar="abrir($event, true)"
                />
            </div>
        </div>
        <TipCliModal
            v-if="modal"
            :tipo="modal.tipo"
            :eliminar="modal.eliminar"
            @cerrar="modal = null"
            @guardado="alGuardar"
            @eliminado="alEliminar"
        />
        <Transition name="toast">
            <div v-if="aviso" class="toast" data-cy="aviso">{{ aviso }}</div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '../../components/Header.vue'
import NavBar from '../../components/NavBar.vue'
import TipCliFilt from '../../components/sist/tiposclienteview/TipCliFilt.vue'
import TipCliTabla from '../../components/sist/tiposclienteview/TipCliTabla.vue'
import TipCliModal from '../../components/sist/tiposclienteview/TipCliModal.vue'
import { getTiposCliente } from '../../services/TipoClienteServices'

const tipos = ref([])
const busqueda = ref('')
const isLoading = ref(false)
const errorMsg = ref(null)
const modal = ref(null)
const aviso = ref(null)

let temporizador = null

const avisar = (texto) => {
    aviso.value = texto
    clearTimeout(temporizador)
    temporizador = setTimeout(() => { aviso.value = null }, 3000)
}

const cargar = async () => {
    isLoading.value = tipos.value.length === 0
    errorMsg.value = null
    try {
        tipos.value = await getTiposCliente()
    } catch (e) {
        errorMsg.value = e.message
    } finally {
        isLoading.value = false
    }
}

const abrir = (tipo, eliminar = false) => {
    modal.value = { tipo, eliminar }
}

const alGuardar = async (tipo) => {
    const nuevo = !modal.value.tipo
    modal.value = null
    avisar(`Tipo de cliente "${tipo.cliente}" ${nuevo ? 'creado' : 'actualizado'} correctamente`)
    await cargar()
}

const alEliminar = async (tipo) => {
    modal.value = null
    avisar(`Tipo de cliente "${tipo.cliente}" eliminado`)
    await cargar()
}

onMounted(cargar)
onBeforeUnmount(() => clearTimeout(temporizador))
</script>
