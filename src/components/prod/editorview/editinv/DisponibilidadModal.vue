<style scoped>
.overlay {
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
    width: 30%;
    height: auto;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeaderDisponibilidad {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 16px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
    border-top-left-radius: 21px;
    border-top-right-radius: 21px;
    flex-shrink: 0;
}

.HeaderDisponibilidad span {
    font-size: 1.2rem;
    font-weight: 550;
    color: white;
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

tbody td:nth-child(2) {
    text-align: center;
}

.confirmsection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding: 7px 25px;
    width: 100%;
    gap: 10px;
}

.confirmbutton {
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    font-size: 1rem;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.confirmbutton:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
    color: #58B358;
}

.cancelbutton {
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #b91623 100%
    );
    font-size: 1rem;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.cancelbutton:hover {
    background: white;
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
}

.validationError {
    color: #FB1C2E;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0 25px;
}

.CliBarEdi {
    width: 100%;
    padding: 3px 1rem;
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
    <div class="overlay">
        <div class = "modal-content">
            <div class="HeaderDisponibilidad">
                <span>Disponibilidad en Sucursales</span>
            </div>

            <table>
                <colgroup>
                    <col style="width: 50%;">
                    <col style="width: 25%">
                    <col style="width: 25%">
                </colgroup>
                <tbody>
                    <tr>
                        <td>Todas las Sucursales</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                :checked="todasSeleccionadas"
                                @change="toggleTodas($event.target.checked)"
                            >
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <colgroup>
                    <col style="width: 50%;">
                    <col style="width: 25%">
                    <col style="width: 25%">
                </colgroup>
                <thead>
                    <tr>
                        <th>Sucursal</th>
                        <th>Disponibilidad</th>
                        <th>Punto de Reorden</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="3">Cargando sucursales...</td>
                    </tr>
                    <tr v-else-if="errorMessage">
                        <td colspan="3">{{ errorMessage }}</td>
                    </tr>
                    <tr v-else-if="sucursales.length === 0">
                        <td colspan="3">No hay sucursales disponibles</td>
                    </tr>
                    <tr v-else v-for="sucursal in sucursales" :key="sucursal.id">
                        <td>{{ sucursal.sucursal }}</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="disponibilidad[sucursal.id]"
                            >
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder=""
                                class="CliBarEdi"
                                autocomplete="off"
                                v-model="puntoReorden[sucursal.id]"
                                :disabled="!disponibilidad[sucursal.id]"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="validationError" class="validationError">{{ validationError }}</div>
            <div class="confirmsection">
                <button class="cancelbutton" @click="$emit('close')">Cancelar</button>
                <button class="confirmbutton" @click="confirmar">Confirmar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getSucursales } from '../../../../services/SucursalesServices'

const emit = defineEmits(['close', 'confirmar'])

const sucursales = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)
const validationError = ref(null)

const disponibilidad = reactive({})
const puntoReorden = reactive({})

const todasSeleccionadas = computed(() => {
    return sucursales.value.length > 0 && sucursales.value.every(s => disponibilidad[s.id])
})

const toggleTodas = (checked) => {
    sucursales.value.forEach(s => { disponibilidad[s.id] = checked })
}

const confirmar = () => {
    const seleccion = sucursales.value
        .filter(s => disponibilidad[s.id])
        .map(s => ({
            id: s.id,
            sucursal: s.sucursal,
            puntoReorden: Number(puntoReorden[s.id]) || 0,
        }))

    if (seleccion.length === 0) {
        validationError.value = 'Selecciona al menos una sucursal'
        return
    }

    validationError.value = null
    emit('confirmar', seleccion)
}

const cargarSucursales = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const sucursalesData = await getSucursales()
        sucursales.value = sucursalesData

        sucursalesData.forEach(s => {
            disponibilidad[s.id] = false
            puntoReorden[s.id] = ''
        })
    } catch (e) {
        errorMessage.value = `Error al cargar sucursales: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(cargarSucursales)
</script>

<style setup>

</style>