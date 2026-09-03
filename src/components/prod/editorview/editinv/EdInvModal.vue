<style scoped>
.EdInvModal {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 85%;
    padding-bottom: 20px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeadEdInv {
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

.HeadEdInv span {
    font-size: 1.5rem;
    font-weight: 550;
    color: white;
}

.guar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5px;
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.guar span {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.guar:hover {
    background: white;
    border: 1px solid #58B358;
}

.guar:hover span{
    color: #58B358;
    font-weight: 600;
}

.CliBarEdInv {
    width: 70%;
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

.CliBarEdInvCod {
    width: 50%;
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

.Rowop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
}

.Rowop2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    width: 100%;
    margin-top: 20px;
    padding-left: 99px;
}

.Rowop2 span {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
}

.minrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 50%;
}

.minrow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.minrow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 20%;
}

.minrow2 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.minrow3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 30%;
}

.minrow3 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.SectBoxINPE {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 1rem;
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
    box-sizing: border-box;
}

.SectBoxINPE.placeholder {
    color: #999;
}

.SelectWrapper {
    position: relative;
    flex: 1;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.4s ease;
    max-height: 300px;
    overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
}

.DropdownList {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 4px;
    background: #F0F0F0;
    border: 2px solid #FB1C2E;
    border-radius: 12px;
    overflow: hidden;
    z-index: 10;
}

.DropdownItem {
    padding: 6px 1rem;
    font-size: 1rem;
    color: #130348;
    cursor: pointer;
}

.DropdownItem:hover {
    background: #BCBCBC;
}

.BusquedaError {
    font-size: 0.85rem;
    font-weight: 600;
    color: #FB1C2E;
}

.ConsBut {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 10%;
    padding: 7px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.ConsBut:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.ConsBut span {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.ConsBut:hover span {
    color: #130348;
}

.FogRid {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 50%;
    margin-left: 99px;
    margin-top: 25px;
    margin-bottom: auto;
}

.FogRid text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}
</style>

<template>
    <div class="EdInvModal">
            <div class="HeadEdInv">
                <span>Edición de Inventario</span>
                <button class="guar">
                    <span class="material-icons">
                        save
                    </span>
                    <span>Guardar</span>
                </button>
            </div>

            <div class="Rowop">
                <div class="minrow">
                    <text>Producto:</text>
                    <input
                        type=double
                        placeholder="Ingresar Producto"
                        class="CliBarEdInv"
                        v-model="nombreQuery"
                        autocomplete="off"
                        @keyup.enter="buscarProducto"
                    />
                </div>

                <div class="minrow2">
                    <text>Estatus:</text>
                    <div class="SelectWrapper">
                        <div class="SectBoxINPE" @click="toggleEstatusDropdown">
                            <span>{{ estatusSeleccionado.label }}</span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                        <Transition name="dropdown">
                            <div v-if="mostrarEstatusDropdown" class="DropdownList">
                                <div
                                    v-for="opcion in opcionesEstatus"
                                    :key="opcion.id"
                                    class="DropdownItem"
                                    @click="seleccionarEstatus(opcion)"
                                >
                                    {{ opcion.label }}
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <div class="Rowop">
                <div class="minrow3">
                    <text>Código:</text>
                    <input
                        type=double
                        placeholder="Ingresar Código"
                        class="CliBarEdInvCod"
                        v-model="codigoQuery"
                        autocomplete="off"
                        @keyup.enter="buscarProducto"
                    />
                    <span v-if="errorBusqueda" class="BusquedaError">{{ errorBusqueda }}</span>
                </div>

                <div class="minrow3">
                    <text>Sucursal:</text>
                    <div class="SelectWrapper">
                        <div class="SectBoxINPE" @click="toggleSucursalDropdown">
                            <span :class="{ placeholder: !sucursalSeleccionada }">
                                {{ sucursalSeleccionada?.sucursal || 'Seleccionar' }}
                            </span>
                            <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                        </div>
                        <Transition name="dropdown">
                            <div v-if="mostrarSucursalDropdown" class="DropdownList">
                                <div v-if="isLoadingSucursales" class="DropdownItem">Cargando...</div>
                                <div v-else-if="sucursales.length === 0" class="DropdownItem">Sin sucursales disponibles</div>
                                <div
                                    v-for="sucursal in sucursales"
                                    v-else
                                    :key="sucursal.id"
                                    class="DropdownItem"
                                    @click="seleccionarSucursal(sucursal)"
                                >
                                    {{ sucursal.sucursal }}
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>

                <button class="ConsBut" @click="consultar">
                    <span class="material-icons">search</span>
                    <span>Consultar</span>
                </button>
            </div>

            <div class="Rowop2">
                <span>Atributos de Producto</span>
            </div>
            <div class="FogRid">
                <text>Tipo</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Marca</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Modelo</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Colores</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Tamaño</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSucursales } from '../../../../services/SucursalesServices'
import { ProductosService } from '../../../../services/ProductosServices'
import { useSucursalStore } from '../../../../stores/sucursal'
import { useInventarioEdicionStore } from '../../../../stores/inventarioEdicion'

const emit = defineEmits(['consultar'])

const inventarioStore = useInventarioEdicionStore()

const nombreQuery = ref('')
const codigoQuery = ref('')
const errorBusqueda = ref(null)

// busca el producto por nombre/codigo y guarda su id en el store, sin disparar la consulta de inventario
const buscarProducto = async () => {
    if (!nombreQuery.value.trim() && !codigoQuery.value.trim()) return

    errorBusqueda.value = null
    try {
        const resultados = await ProductosService.getFiltered({
            nombre: nombreQuery.value.trim() || null,
            codigo: codigoQuery.value.trim() || null,
        })
        if (!resultados.length) {
            errorBusqueda.value = 'No se encontró ningún producto con esos datos'
            return
        }
        inventarioStore.setProducto(resultados[0].id)
    } catch (error) {
        errorBusqueda.value = `Error al buscar el producto: ${error.message}`
    }
}

const opcionesEstatus = [
    { id: 1, label: 'Activo' },
    { id: 2, label: 'Inactivo' },
]
const estatusSeleccionado = ref(opcionesEstatus[0])
const mostrarEstatusDropdown = ref(false)

const toggleEstatusDropdown = () => {
    mostrarEstatusDropdown.value = !mostrarEstatusDropdown.value
}

const seleccionarEstatus = (opcion) => {
    estatusSeleccionado.value = opcion
    mostrarEstatusDropdown.value = false
}

const sucursalStore = useSucursalStore()
const sucursales = ref([])
const sucursalSeleccionada = ref(null)
const mostrarSucursalDropdown = ref(false)
const isLoadingSucursales = ref(false)

const cargarSucursales = async () => {
    isLoadingSucursales.value = true
    try {
        sucursales.value = await getSucursales()
    } catch (error) {
        console.error('Error al cargar sucursales:', error)
    } finally {
        isLoadingSucursales.value = false
    }
}

const toggleSucursalDropdown = async () => {
    mostrarSucursalDropdown.value = !mostrarSucursalDropdown.value

    if (mostrarSucursalDropdown.value && sucursales.value.length === 0) {
        await cargarSucursales()
    }
}

const seleccionarSucursal = (sucursal) => {
    sucursalSeleccionada.value = sucursal
    mostrarSucursalDropdown.value = false
    inventarioStore.setSucursal(sucursal.id)
}

const consultar = () => {
    emit('consultar')
}

onMounted(async () => {
    await cargarSucursales()

    // preseleccionar la sucursal activa en el header, usando el objeto completo del catálogo
    const actual = sucursalStore.sucursalSeleccionada
    if (actual) {
        sucursalSeleccionada.value = sucursales.value.find((s) => s.id === actual.id) ?? actual
    }
})
</script>