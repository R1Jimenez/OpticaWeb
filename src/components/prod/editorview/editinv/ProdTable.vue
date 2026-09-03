<style scoped>
.TabPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    padding-bottom: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeadTab {
    display: flex;
    flex-direction: row;
    padding: 7px 30px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
}

.HeadTab span {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
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
</style>

<template>
    <div class="TabPrinc">
        <div class="HeadTab">
            <span>Producto</span>
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
                    <td colspan="9">Cargando inventario...</td>
                </tr>
                <tr v-else-if="errorMessage">
                    <td colspan="9">{{ errorMessage }}</td>
                </tr>
                <tr v-else>
                    <td>{{ sucursalNombre }}</td>
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
                            v-model="puntoReorden"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi2"
                            v-model="existenciaActual"
                            autocomplete="off"
                            disabled
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi"
                            v-model="entrada"
                            autocomplete="off"
                            @input="calcularExistenciaFinal"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi"
                            v-model="merma"
                            autocomplete="off"
                            @input="calcularExistenciaFinal"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder=""
                            class="CliBarEdi2"
                            v-model="existenciaFinal"
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
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ProductosService } from '../../../../services/ProductosServices'
import { getInventarioSucursalProducto } from '../../../../services/InventarioServices'
import { getSucursales } from '../../../../services/SucursalesServices'
import { useInventarioEdicionStore } from '../../../../stores/inventarioEdicion'

const inventarioStore = useInventarioEdicionStore()

const producto = ref(null)
const sucursalesCache = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)

const puntoReorden = ref(0)
const existenciaActual = ref(0)
const entrada = ref(0)
const merma = ref(0)
const existenciaFinal = ref(0)

const sucursalNombre = computed(() => {
    const match = sucursalesCache.value.find((s) => s.id === inventarioStore.sucursalId)
    return match?.sucursal || 'N/A'
})

const onProductoHover = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.classList.add('is-scrolling')

    const overflow = text.scrollWidth - wrapper.clientWidth
    if (overflow > 0) {
        const duration = Math.max(1, overflow / 40) // px/s constante para cualquier largo de texto
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

const calcularExistenciaFinal = () => {
    const actual = Number(existenciaActual.value) || 0
    const ent = Number(entrada.value) || 0
    const mer = Number(merma.value) || 0
    existenciaFinal.value = actual + ent - mer
}

const cargarInventario = async () => {
    const productoId = inventarioStore.productoId
    const sucursalId = inventarioStore.sucursalId

    if (!productoId || !sucursalId) {
        errorMessage.value = 'No hay sucursal o producto seleccionado'
        return
    }

    isLoading.value = true
    errorMessage.value = null
    try {
        const [productoData, inventarioData] = await Promise.all([
            ProductosService.getById(productoId),
            getInventarioSucursalProducto(sucursalId, productoId),
        ])

        producto.value = productoData
        puntoReorden.value = inventarioData.punto_reorden ?? 0
        existenciaActual.value = inventarioData.existencia_actual ?? 0
        entrada.value = 0
        merma.value = 0
        calcularExistenciaFinal()
    } catch (e) {
        errorMessage.value = `Error al cargar el inventario: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    try {
        sucursalesCache.value = await getSucursales()
    } catch (error) {
        console.error('Error al cargar sucursales:', error)
    }
    cargarInventario()
})

defineExpose({ consultar: cargarInventario })
</script>