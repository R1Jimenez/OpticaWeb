<style>
.OptometriaPrincipal {
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

.Optometriacontenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.OptometriaUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: .5%;
    overflow-y: hidden;
}

.OptometriaUsages.scrollable {
    overflow-y: auto;
}

.OptoTituloRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 7%;
    padding-left: 1%;
}

.TextoTituloOP {
    font-size: 2.7rem;
    font-weight: 900;
    color: white;
}
</style>

<template>
    <div class = 'OptometriaPrincipal'>
        <Header />
        <div class="Optometriacontenido">
            <NavBar />
            <div class="OptometriaUsages" :class="{ scrollable: pacienteSeleccionado }">
                <div class="OptoTituloRow">
                    <h1 class="TextoTituloOP">
                        Expediente de Optometria
                    </h1>
                </div>

                <ClienteBar @clienteSeleccionado="onClienteSeleccionado" />
                <DataClient
                    :cliente="clienteSeleccionado"
                    @clienteActualizado="onClienteActualizado"
                    @clienteEliminado="onClienteEliminado"
                    @limpiarBusqueda="onLimpiarBusqueda"
                />

                <div v-if="isLoadingPacientes" style="color:white; text-align:center; padding: 20px">
                    Cargando Pacientes...
                </div>
                <PacientesListComponent 
                    v-else-if="clienteSeleccionado"
                    :pacientes="pacientes"
                    :paciente-seleccionado="pacienteSeleccionado"
                    :cliente-id="clienteSeleccionado?.id"
                    @paciente-seleccionado="pacienteSeleccionado = $event"
                    @paciente-creado="cargarPacientes(clienteSeleccionado.id)"
                />
                <NotebookComponent
                    v-if="pacienteSeleccionado"
                    :paciente="pacienteSeleccionado"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { authHeaders } from '../services/authHeader'
import Header from '../components/Header.vue'
import NavBar from '../components/NavBar.vue'
import ClienteBar from '../components/CLienteBar.vue'
import DataClient from '../components/optometriaview/DataClient.vue'
import PacientesListComponent from '../components/optometriaview/PacientesList.vue'
import NotebookComponent from '../components/optometriaview/NotebookClient.vue'

const clienteSeleccionado = ref(null)
const pacientes = ref([])
const pacienteSeleccionado = ref(null)
const isLoadingPacientes = ref(false)

const onClienteSeleccionado = (cliente) => {
    clienteSeleccionado.value = cliente
    pacienteSeleccionado.value = null
    cargarPacientes(cliente.id)
}

const onClienteActualizado = (cliente) => {
    clienteSeleccionado.value = cliente
}

const onClienteEliminado = () => {
    clienteSeleccionado.value = null
    pacientes.value = []
    pacienteSeleccionado.value = null
}

const onLimpiarBusqueda = () => {
    clienteSeleccionado.value = null
}

const cargarPacientes = async (clienteId) => {
    isLoadingPacientes.value = true
    try {
        const res = await fetch(`http://127.0.0.1:8000/pacientes/cliente/${clienteId}`, { headers: authHeaders() })
        pacientes.value = await res.json()
    } catch (e) {
        pacientes.value = []
    } finally {
        isLoadingPacientes.value = false
    }
}


</script>