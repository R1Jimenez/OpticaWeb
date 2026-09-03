<style scoped>
.FiltPrinc {
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
    padding-bottom: 10px;
    flex-shrink: 0;
}

.HeaderFilt {
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
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    flex-shrink: 0;
}

.HeaderFilt span {
    font-size: 1.5rem;
    font-weight: 550;
    color: white;
}

.rowops {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 35px;
    padding-right: 1%;
    margin-top: 10px;
    gap: 1%;
}

.minrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    gap: 1%;
}

.minrow text {
    font-size: 1.2rem;
    font-weight: 550;
    color: #130348;
}

.dropdownWrap {
    position: relative;
    width: 60%;
}

.dropdownWrap .dropdown {
    width: 100%;
    padding: 2px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
}

.dropdownTipoVenta {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 220px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.itemTipoVenta {
    display: flex;
    align-items: center;
    padding: 10px 18px;
    cursor: pointer;
    transition: background 0.15s;
    border-bottom: 1px solid #f0f0f0;
    color: #130348;
    font-size: 1rem;
}

.itemTipoVenta:last-child {
    border-bottom: none;
}

.itemTipoVenta:hover {
    background-color: #f5f5f5;
}

.sinTipoVenta, .loadingTipoVenta {
    padding: 12px 18px;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
}

.minrow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30%;
    gap: 15px;
}

.CliBarEdInv {
    width: 80%;
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

.clienteInputWrap {
    position: relative;
    width: 80%;
}

.clienteInputWrap .CliBarEdInv {
    width: 100%;
}

.dropdownResultadosCliente {
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

.itemResultadoCliente {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;
    gap: 12px;
    transition: background 0.15s;
    border-bottom: 1px solid #f0f0f0;
}

.itemResultadoCliente:last-child {
    border-bottom: none;
}

.itemResultadoCliente:hover {
    background-color: #f5f5f5;
}

.nombreResultadoCliente {
    font-size: 1.1rem;
    font-weight: 600;
    color: #130348;
}

.sinResultadosCliente {
    padding: 16px 20px;
    color: #888;
    font-size: 1rem;
    text-align: center;
}

.loadingTextCliente {
    padding: 16px 20px;
    color: #130348;
    font-size: 1rem;
    text-align: center;
}

.CliBarEdInvPrec {
    width: 60%;
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

.agreg {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    background: radial-gradient(
        #130348 10%,
        #07072C 100%
    );
    border: 2px solid white;
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    padding: 5px 20px;
    cursor: pointer;
}

.agreg:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #130348;
    color: #130348;
}

.Nuevo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 30%;
    background: radial-gradient(
        #58B358 10%,
        #459B45 100%
    );
    border: 2px solid white;
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    padding: 5px 10px;
    cursor: pointer;
}

.Nuevo:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #58B358;
    color: #58B358;
}

.miniminrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 33%;
}

.miniminrow text {
    font-size: 1.2rem;
    font-weight: 550;
    color: #130348;
}

.dropdown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    padding: 2px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
}

.minroww {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 85%;
    gap: 1%;
}

.minroww text {
    font-size: 1.2rem;
    font-weight: 550;
    color: #130348;
}

.agreg2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: auto;
    background: radial-gradient(
        #130348 10%,
        #07072C 100%
    );
    border: 2px solid white;
    border-radius: 15px;
    padding: 5px 20px;
    cursor: pointer;
    gap: 10px;
    margin-right: 35px;
}

.agreg2 span {
    font-size: 1rem;
    color: white;
}

.agreg2:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #130348;
}

.agreg2:hover span {
    color: #130348;
}


</style>

<template>
    <div class="FiltPrinc">
        <div class="HeaderFilt">
            <span>Cotización</span>
        </div>

        <div class="rowops">
            <div class="minrow">
                <text>Cliente:</text>
                <div class="clienteInputWrap">
                    <input
                        type="text"
                        placeholder="Ingresar Cliente"
                        class="CliBarEdInv"
                        v-model="clienteQuery"
                        autocomplete="off"
                        @input="onInputCliente"
                        @keyup.enter="buscarCliente"
                    />
                    <div class="dropdownResultadosCliente" v-if="mostrarDropdownCliente">
                        <div v-if="loadingCliente" class="loadingTextCliente">Buscando...</div>
                        <div v-else-if="resultadosCliente.length === 0" class="sinResultadosCliente">
                            No se encontraron clientes
                        </div>
                        <div
                            v-else
                            v-for="cliente in resultadosCliente"
                            :key="cliente.id"
                            class="itemResultadoCliente"
                            @click="seleccionarCliente(cliente)"
                        >
                            <span class="material-icons" style="color: #130348;">person</span>
                            <div class="nombreResultadoCliente">{{ cliente.nombres }} {{ cliente.apellidos }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="minrow2">
                <button class="agreg" @click="agregarCliente">
                    <span class="material-icons">add</span>
                    <text>Agregar a Cotización</text>
                </button>
                <button class="Nuevo">
                    <span class="material-icons">add</span>
                    <text>Nuevo</text>
                </button>
            </div>
        </div>
        <div class="rowops">
            <div class="miniminrow">
                <text>Tipo Venta:</text>
                <div class="dropdownWrap">
                    <div class="dropdown" @click="toggleTipoVentaMenu">
                        <span>{{ tipoVentaSeleccionadoNombre }}</span>
                        <span class="material-icons">arrow_drop_down</span>
                    </div>
                    <div class="dropdownTipoVenta" v-if="showTipoVentamenu">
                        <div v-if="loadingTipoVenta" class="loadingTipoVenta">Cargando...</div>
                        <div v-else-if="TipoVenta.length === 0" class="sinTipoVenta">
                            No hay tipos de venta disponibles
                        </div>
                        <div
                            v-else
                            v-for="tipo in TipoVenta"
                            :key="tipo.id"
                            class="itemTipoVenta"
                            @click="seleccionarTipoVenta(tipo)"
                        >
                            <span>{{ tipo.venta }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="miniminrow">
                <text>Plazo:</text>
                <div class="dropdownWrap">
                    <div class="dropdown" @click="togglePlazoMenu">
                        <span>{{ plazoSeleccionadoNombre }}</span>
                        <span class="material-icons">arrow_drop_down</span>
                    </div>
                    <div class="dropdownTipoVenta" v-if="showPlazoMenu">
                        <div v-if="loadingPlazo" class="loadingTipoVenta">Cargando...</div>
                        <div v-else-if="Plazos.length === 0" class="sinTipoVenta">
                            No hay plazos disponibles
                        </div>
                        <div
                            v-else
                            v-for="plazo in Plazos"
                            :key="plazo.id"
                            class="itemTipoVenta"
                            @click="seleccionarPlazo(plazo)"
                        >
                            <span>{{ plazo.plazo }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="miniminrow">
                <text>Pago Inicial:</text>
                <input
                    type=double
                    placeholder="$"
                    class="CliBarEdInvPrec"
                    v-model="nombreQuery"
                    autocomplete="off"
                    @keyup.enter="buscarProducto"
                />
            </div>
        </div>
        <div class="rowops">
            <div class="minroww">
                <text>Producto o Código externo:</text>
                <input
                    type="text"
                    placeholder="Ingresar Producto o Código externo"
                    class="CliBarEdInv"
                    v-model="productoQuery"
                    autocomplete="off"
                    @keyup.enter="buscarProducto"
                />
            </div>
            <button class="agreg2" @click="buscarProducto">
                <span class="material-icons">search</span>
                <span>Consultar</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCotizacionStore } from '../../../stores/cotizacion'
import { TipoVentaService } from '../../../services/TipoVentaServices'
import { PlazoService } from '../../../services/PlazoServices'
import { ProductosService } from '../../../services/ProductosServices'
import { getInventarioSucursalProducto } from '../../../services/InventarioServices'
import { getPreciosByProducto } from '../../../services/PreciosServices'
import { authHeaders } from '../../../services/authHeader'

const cotizacionStore = useCotizacionStore()

const clienteQuery = ref('')
const clienteSeleccionado = ref(null)
const resultadosCliente = ref([])
const loadingCliente = ref(false)
const mostrarDropdownCliente = ref(false)
const showTipoVentamenu = ref(false)
const TipoVenta = ref([])
const loadingTipoVenta = ref(false)
const showPlazoMenu = ref(false)
const Plazos = ref([])
const loadingPlazo = ref(false)
const productoQuery = ref('')
const buscandoProducto = ref(false)

let debounceTimerCliente = null

const emit = defineEmits(['clienteSeleccionado'])

const onInputCliente = () => {
    clearTimeout(debounceTimerCliente)

    if (clienteQuery.value.trim().length === 0) {
        mostrarDropdownCliente.value = false
        resultadosCliente.value = []
        return
    }

    // Espera 400ms después de que el usuario deja de escribir
    debounceTimerCliente = setTimeout(() => {
        buscarCliente()
    }, 400)
}

const buscarCliente = async () => {
    if (clienteQuery.value.trim().length === 0) return

    loadingCliente.value = true
    mostrarDropdownCliente.value = true

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/cliente/search?cliente=${encodeURIComponent(clienteQuery.value)}`,
            { headers: authHeaders() }
        )
        const data = await response.json()
        resultadosCliente.value = data
    } catch (error) {
        console.error('Error al buscar clientes:', error)
        resultadosCliente.value = []
    } finally {
        loadingCliente.value = false
    }
}

const seleccionarCliente = (cliente) => {
    clienteQuery.value = `${cliente.nombres} ${cliente.apellidos}`
    clienteSeleccionado.value = cliente
    mostrarDropdownCliente.value = false
    emit('clienteSeleccionado', cliente)
}

const agregarCliente = () => {
    if (!clienteSeleccionado.value) return

    cotizacionStore.setCliente(clienteSeleccionado.value)

    clienteQuery.value = ''
    clienteSeleccionado.value = null
    resultadosCliente.value = []
    mostrarDropdownCliente.value = false
}

const tipoVentaSeleccionadoNombre = computed(() => {
    return cotizacionStore.tipoVentaSeleccionado?.venta
})

const cargarTiposVenta = async () => {
    loadingTipoVenta.value = true
    try {
        const data = await TipoVentaService.getAll()
        console.log('Respuesta TipoVenta/all:', data)
        TipoVenta.value = data

        if (data.length > 0 && !cotizacionStore.tipoVentaSeleccionado) {
            cotizacionStore.setTipoVenta(data[0])
        }
    } catch (error) {
        console.error('Error al cargar tipos de venta:', error)
    } finally {
        loadingTipoVenta.value = false
    }
}

const toggleTipoVentaMenu = async () => {
    showTipoVentamenu.value = !showTipoVentamenu.value
}

const seleccionarTipoVenta = (tipo) => {
    cotizacionStore.setTipoVenta(tipo)
    showTipoVentamenu.value = false
}

const plazoSeleccionadoNombre = computed(() => {
    return cotizacionStore.plazoSeleccionado?.plazo
})

const cargarPlazos = async (tipoVentaId) => {
    if (!tipoVentaId) {
        Plazos.value = []
        cotizacionStore.setPlazo(null)
        return
    }

    loadingPlazo.value = true
    try {
        const data = await PlazoService.getByTipoVenta(tipoVentaId)
        console.log('Respuesta Plazo:', data)
        Plazos.value = data

        if (data.length > 0) {
            cotizacionStore.setPlazo(data[0])
        } else {
            cotizacionStore.setPlazo(null)
        }
    } catch (error) {
        console.error('Error al cargar plazos:', error)
    } finally {
        loadingPlazo.value = false
    }
}

const togglePlazoMenu = async () => {
    showPlazoMenu.value = !showPlazoMenu.value
}

const seleccionarPlazo = (plazo) => {
    cotizacionStore.setPlazo(plazo)
    showPlazoMenu.value = false
}

const buscarProducto = async () => {
    const query = productoQuery.value.trim()
    if (!query) return

    const sucursalId = cotizacionStore.sucursalSeleccionada?.id
    if (!sucursalId) {
        console.error('No hay sucursal seleccionada.')
        return
    }

    buscandoProducto.value = true
    try {
        let resultados = await ProductosService.getFiltered({ codigo_externo: query })

        if (!resultados || resultados.length === 0) {
            resultados = await ProductosService.getFiltered({ nombre: query })
        }

        if (!resultados || resultados.length === 0) {
            cotizacionStore.limpiarProductoBusqueda()
            console.warn('No se encontraron productos con este criterio:', query)
            return
        }

        const producto = resultados[0]

        let inventario = null
        try {
            inventario = await getInventarioSucursalProducto(sucursalId, producto.id)
        } catch (error) {
            alert('No se encuentra este producto disponible en la sucursal seleccionada.')
            console.warn('Sin inventario registrado para esta sucursal:', error.message)
            return
        }

        let precio = null
        try {
            const precios = await getPreciosByProducto(producto.id)
            precio = precios.find((p) => p.sucursal === sucursalId) || null
        } catch (error) {
            console.warn('Sin precios registrados para esta sucursal:', error.message)
        }

        cotizacionStore.setProductoBusqueda({
            producto,
            inventario,
            precio,
        })
        productoQuery.value = ''
    } catch(error) {
        console.error('Error al buscar producto:', error)
    } finally {
        buscandoProducto.value = false
    }
}

watch(
    () => cotizacionStore.tipoVentaSeleccionado,
    (newTipoVenta) => {
        cargarPlazos(newTipoVenta?.id)
    }
)

onMounted(() => {
    cargarTiposVenta()
})
</script>