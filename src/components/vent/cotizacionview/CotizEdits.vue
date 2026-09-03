<style scoped>
.CotizEditsPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98%;
    height: auto;
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: solid 2px #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeaderCotiz {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 16px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
    gap: 10px;
    flex-shrink: 0;
}

.HeaderCotiz span {
    font-size: 1.3rem;
    font-weight: 550;
    color: white;
}

.pacienteDropdownWrap {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.HeaderCotiz .material-icons.arrow-paciente {
    cursor: pointer;
}

.HeaderCotiz .material-icons.arrow-paciente.disabled {
    cursor: default;
    opacity: 0.4;
}

.dropdownPacientes {
    position: absolute;
    top: 130%;
    left: 0;
    width: max-content;
    min-width: 220px;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 260px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.itemPaciente {
    display: flex;
    align-items: center;
    padding: 10px 18px;
    cursor: pointer;
    gap: 10px;
    transition: background 0.15s;
    border-bottom: 1px solid #f0f0f0;
}

.itemPaciente:last-child {
    border-bottom: none;
}

.itemPaciente:hover {
    background-color: #f5f5f5;
}

.nombrePaciente {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.sinPacientes, .loadingPacientes {
    padding: 14px 18px;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead tr {
    background-color: #F5F5F5;
}

thead th {
    padding: 9px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-bottom: 1px solid #130348;
}

tbody tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
    cursor: pointer;
}

.TablaProductos tbody tr:first-child td {text-align: left;}
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background-color: #FAFAFA; }

tbody td {
    padding: 10px;
    font-size: 1rem;
    font-weight: 550;
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;
    text-align: center;
}

.TablaProductos tbody td:nth-child(2) {
    text-align: left;
}

.Eliminar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: #FB1C2E;
    border: 1px solid white;
    border-radius: 15px;
    padding: 3px 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.Eliminar:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
}

.accept {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: 3px 7px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.accept:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    color: #130348;
}

.Cobr {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #2E8B57 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: 1px 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.Cobr:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
    color: #58B358;
}

.CliBarEdInv {
    width: 100%;
    padding: 3px 5px 3px 5px;
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
</style>

<template>
    <div class="CotizEditsPrinc">
        <div class="HeaderCotiz">
            <span>Cotizacion: </span>
            <span>{{ nombreCliente }}</span>
            <div class="pacienteDropdownWrap">
                <span
                    class="material-icons arrow-paciente"
                    :class="{ disabled: !cotizacionStore.clienteSeleccionado }"
                    @click="toggleDropdownPacientes"
                >arrow_right</span>
                <span>{{ nombrePaciente }}</span>
                <div class="dropdownPacientes" v-if="mostrarDropdownPacientes">
                    <div v-if="isLoadingPacientes" class="loadingPacientes">Cargando...</div>
                    <div v-else-if="pacientes.length === 0" class="sinPacientes">
                        No hay pacientes registrados
                    </div>
                    <div
                        v-else
                        v-for="paciente in pacientes"
                        :key="paciente.id"
                        class="itemPaciente"
                        @click="seleccionarPaciente(paciente)"
                    >
                        <span class="material-icons" style="color: #130348;">person</span>
                        <span class="nombrePaciente" style="color: #130348;">{{ paciente.nombres }} {{ paciente.apellidos }}</span>
                    </div>
                </div>
            </div>
        </div>
        <table class="TablaProductos">
            <colgroup>
                <col style="width: 73.5%;">
                <col style="width: 7%;">
                <col style="width: 4%;">
                <col style="width: 8%;">
                <col style="width: 7.5%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Venta</th>
                    <th>Piezas</th>
                    <th>Total Producto</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>OFTALMICO N/A CRISTAL MONOFOCAL FOTOCROMATICO METALICOS</td>
                    <td>$100.00</td>
                    <td>1</td>
                    <td>$200.00</td>
                    <td>
                        <button class="Eliminar">
                            <span class="material-icons">close</span>
                            <span>Eliminar</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <table>
            <colgroup>
                <col style="width: 78%;">
                <col style="width: 8%;">
                <col style="width: 8%;">
                <col style="width: 6%;">
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th>Total Normal</th>
                    <th>Total Venta</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>$100.00</td>
                    <td>$200.00</td>
                    <td>
                        <button class="accept">
                            <span>Aceptar</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table>
            <colgroup>
                <col style="width: 76%;">
                <col style="width: 8%;">
                <col style="width: 8%;">
                <col style="width: 8%;">
            </colgroup>
            <tbody>
                <tr>
                    <td></td>
                    <td>Ahorro:</td>
                    <td>
                        <input
                            type="double"
                            placeholder="0"
                            class="CliBarEdInv"
                            v-model="nombreQuery"
                            autocomplete="off"
                            @keyup.enter="buscarProducto"
                        />
                    </td>
                    <td>
                        <button class="Cobr">
                            <span class="material-icons">attach_money</span>
                            <span>Cobrar</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useCotizacionStore } from '../../../stores/cotizacion'
import { authHeaders } from '../../../services/authHeader'

const cotizacionStore = useCotizacionStore()

const pacientes = ref([])
const isLoadingPacientes = ref(false)
const mostrarDropdownPacientes = ref(false)

const nombreCliente = computed(() => {
    const cliente = cotizacionStore.clienteSeleccionado
    if (!cliente) return ''
    return `${cliente.nombres} ${cliente.apellidos}`
})

const nombrePaciente = computed(() => {
    const paciente = cotizacionStore.pacienteSeleccionado
    if (!paciente) return ''
    return `${paciente.nombres} ${paciente.apellidos}`
})

const cargarPacientes = async (clienteId) => {
    isLoadingPacientes.value = true
    try {
        const response = await fetch(`http://127.0.0.1:8000/pacientes/cliente/${clienteId}`, { headers: authHeaders() })
        pacientes.value = await response.json()
    } catch (error) {
        console.error('Error al cargar pacientes:', error)
        pacientes.value = []
    } finally {
        isLoadingPacientes.value = false
    }
}

const toggleDropdownPacientes = () => {
    if (!cotizacionStore.clienteSeleccionado) return

    mostrarDropdownPacientes.value = !mostrarDropdownPacientes.value
    if (mostrarDropdownPacientes.value) {
        cargarPacientes(cotizacionStore.clienteSeleccionado.id)
    }
}

const seleccionarPaciente = (paciente) => {
    cotizacionStore.setPaciente(paciente)
    mostrarDropdownPacientes.value = false
}

// El store limpia el paciente al cambiar/quitar cliente; aquí solo cerramos el dropdown y refrescamos la lista cacheada
watch(() => cotizacionStore.clienteSeleccionado, () => {
    mostrarDropdownPacientes.value = false
    pacientes.value = []
})
</script>