<style scoped>
.barra {
    position: relative;
    width: 70%;
    height: 100%;
}

.clientebar {
    width: 100%;
    height: 50%;
    padding: 0.625rem 0.1rem 0.425rem 2.8rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.input-icon-client {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #130348;
    pointer-events: none;
}

.consultarbutton {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #130348;
    width: 10%;
    height: 55%;
    border-radius: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding-left: 1%;
    padding-right: 1%;
    cursor: pointer;
}

.consultarbutton text {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
}

.input-icon-consul {
    left: 15px;
    top: 50%;
    color: white;
    font-size: 1.5rem;
    pointer-events: none;
}

.dropdownresultados {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.itemresultado {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;
    gap: 12px;
    transition: background 0.15s;
    border-bottom: 1px solid #f0f0f0;
}

.itemresultado:last-child {
    border-bottom: none;
}

.itemresultado:hover {
    background-color: #f5f5f5;
}

.nombreresultado {
    font-size: 1.1rem;
    font-weight: 600;
    color: #130348;
}

.sinresultados {
    padding: 16px 20px;
    color: #888;
    font-size: 1rem;
    text-align: center;
}

.loadingtext {
    padding: 16px 20px;
    color: #130348;
    font-size: 1rem;
    text-align: center;
}
</style>

<template>
    <div class = "barra">
        <span class="material-icons input-icon-client">person_search</span>
        <input 
          type="text"
          placeholder="Consultar Cliente"
          class="clientebar"
          v-model="searchQuery"
          @input="onInput"
          @keyup.enter="buscar"
          autocomplete="off"
        />

        <div class="dropdownresultados" v-if="mostrarDropdown">
            <div v-if="loading" class="loadingtext">Buscando...</div>
            <div v-else-if="resultados.length === 0" class="sinresultados">
                No se encontraron clientes
            </div>
            <div
                v-else
                v-for="cliente in resultados"
                :key="cliente.id"
                class="itemresultado"
                @click="seleccionarCliente(cliente)"
            >
                <span class="material-icons" style="color: #130348;">person</span>
                <div>
                    <div class="nombreresultado">{{ cliente.nombres }} {{ cliente.apellidos }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const resultados = ref([])
const loading = ref(false)
const mostrarDropdown = ref(false)

let debounceTimer = null

const emit = defineEmits(['clienteSeleccionado'])

const onInput = () => {
    clearTimeout(debounceTimer)

    if (searchQuery.value.trim().length === 0) {
        mostrarDropdown.value = false
        resultados.value = []
        return
    }

    // Espera 400ms después de que el usuario deja de escribir
    debounceTimer = setTimeout(() => {
        buscar()
    }, 400)
}

const buscar = async () => {
    if (searchQuery.value.trim().length === 0) return

    loading.value = true
    mostrarDropdown.value = true

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/cliente/search?cliente=${encodeURIComponent(searchQuery.value)}`
        )
        const data = await response.json()
        resultados.value = data
    } catch (error) {
        console.error('Error al buscar clientes:', error)
        resultados.value = []
    } finally {
        loading.value = false
    }
}

const seleccionarCliente = (cliente) => {
    searchQuery.value = `${cliente.nombres} ${cliente.apellidos}`
    mostrarDropdown.value = false
    emit('clienteSeleccionado', cliente)  // Emite el cliente seleccionado al padre
}
</script>