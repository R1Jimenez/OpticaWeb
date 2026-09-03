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
    width: 85%;
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
    text-align: left;
}

.producto-cell {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    width: 100%;
}

.producto-text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
}

.producto-text.is-scrolling {
    max-width: none;
    overflow: visible;
    text-overflow: clip;
}

.CliBarEdi {
    width: 100%;
    padding: 5px 1rem;
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
.CliBarEdi2 {
    width: 100%;
    padding: 5px 1rem;
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
    cursor: not-allowed;
}

.CodeBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 3px 16px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-radius: 10px;
}

.CodeBox text {
    font-size: 1rem;
    font-weight: 550;
    color: white;
}

.confirmsection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding: 10px 25px;
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
</style>

<template>
    <div class="overlay">
        <div class="modal-content">
            <div class="HeaderDisponibilidad">
                <span>Inventario por sucursal</span>
            </div>
            <table>
            <colgroup>
                <col style="width: 9%;">
                <col style="width: 11%;">
                <col style="width: 20%;">
                <col style="width: 7%;">
                <col style="width: 7%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 8%;">
                <col style="width: 4%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Sucursal</th>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Punto de Reorden</th>
                    <th>Existencia Actual</th>
                    <th>Entrada</th>
                    <th>Merma</th>
                    <th>Existencia Final</th>
                    <th>Activo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="9">Cargando producto...</td>
                </tr>
                <tr v-else-if="errorMessage">
                    <td colspan="9">{{ errorMessage }}</td>
                </tr>
                <tr v-else-if="sucursales.length === 0">
                    <td colspan="9">No hay sucursales seleccionadas</td>
                </tr>
                <tr v-else v-for="sucursal in sucursales" :key="sucursal.id">
                    <td>{{ sucursal.sucursal }}</td>
                    <td>
                        <div class="CodeBox">
                            <text>{{ producto?.codigo || '---' }}</text>
                        </div>
                    </td>
                    <td>
                        <div
                            class="producto-cell"
                            @mouseenter="onProductoHover"
                            @mouseleave="onProductoLeave"
                        >
                            <span class="producto-text">{{ producto?.nombre || '---' }}</span>
                        </div>
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi"
                            v-model="puntoReorden[sucursal.id]"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi2"
                            v-model="existenciaActual[sucursal.id]"
                            autocomplete="off"
                            disabled
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi"
                            v-model="entrada[sucursal.id]"
                            autocomplete="off"
                            @input="calcularExistenciaFinal(sucursal.id)"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi"
                            v-model="merma[sucursal.id]"
                            autocomplete="off"
                            @input="calcularExistenciaFinal(sucursal.id)"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi2"
                            v-model="existenciaFinal[sucursal.id]"
                            autocomplete="off"
                            disabled
                        />
                    </td>
                    <td>
                        <span class="material-icons" style="font-size:20px;">check</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="validationError" class="validationError">{{ validationError }}</div>
        <div class="confirmsection">
            <button class="cancelbutton" @click="$emit('close')">Cancelar</button>
            <button class="confirmbutton" @click="guardar" :disabled="isSaving || isLoading">
                {{ isSaving ? 'Guardando...' : 'Confirmar' }}
            </button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ProductosService } from '../../../../services/ProductosServices'
import { createInventario, registrarMovimiento } from '../../../../services/InventarioServices'

const props = defineProps({
    productoId: { type: [Number, String], required: true },
    sucursalesSeleccionadas: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'confirmar'])

const producto = ref(null)
const sucursales = ref([])
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref(null)
const validationError = ref(null)

const puntoReorden = reactive({})
const existenciaActual = reactive({})
const entrada = reactive({})
const merma = reactive({})
const existenciaFinal = reactive({})

const cargarDatos = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        producto.value = await ProductosService.getById(props.productoId)
        sucursales.value = props.sucursalesSeleccionadas

        sucursales.value.forEach(s => {
            puntoReorden[s.id] = s.puntoReorden ?? 0
            existenciaActual[s.id] = 0
            entrada[s.id] = null
            merma[s.id] = null
            existenciaFinal[s.id] = 0
        })
    } catch (e) {
        errorMessage.value = `Error al cargar el producto: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(cargarDatos)

const calcularExistenciaFinal = (sucursalId) => {
    const actual = Number(existenciaActual[sucursalId]) || 0
    const ent = Number(entrada[sucursalId]) || 0
    const mer = Number(merma[sucursalId]) || 0
    existenciaFinal[sucursalId] = actual + ent - mer
}

const onProductoHover = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.classList.add('is-scrolling')

    const overflow = text.scrollWidth - wrapper.clientWidth
    if (overflow > 0) {
        const duration = Math.max(1, overflow / 40)
        text.style.transition = `transform ${duration}s linear`
        text.style.transform = `translateX(-${overflow}px)`
    } else {
        text.classList.remove('is-scrolling')
    }
}

const onProductoLeave = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.style.transition = 'transform 0.3s ease'
    text.style.transform = 'translateX(0)'
    setTimeout(() => text.classList.remove('is-scrolling'), 300)
}

const guardar = async () => {
    if (sucursales.value.length === 0) {
        validationError.value = 'No hay sucursales seleccionadas'
        return
    }

    validationError.value = null
    isSaving.value = true
    try {
        await Promise.all(
            sucursales.value.map(async (s) => {
                const inventario = await createInventario({
                    sucursal_id: s.id,
                    producto_id: Number(props.productoId),
                    punto_reorden: Number(puntoReorden[s.id]) || 0,
                })

                const entradaVal = Number(entrada[s.id]) || 0
                const mermaVal = Number(merma[s.id]) || 0
                if (entradaVal > 0 || mermaVal > 0) {
                    const movimiento = await registrarMovimiento({
                        sucursal_id: s.id,
                        producto_id: Number(props.productoId),
                        entrada: entradaVal,
                        merma: mermaVal,
                    })
                    existenciaActual[s.id] = movimiento.existencia_final
                    existenciaFinal[s.id] = movimiento.existencia_final
                }
            })
        )
        emit('confirmar', sucursales.value)
    } catch (e) {
        console.error('Error al crear el inventario:', e)
        alert(`Error al crear el inventario: ${e.message}`)
    } finally {
        isSaving.value = false
    }
}
</script>
