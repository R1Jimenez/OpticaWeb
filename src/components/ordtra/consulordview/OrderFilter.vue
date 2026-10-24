<style scoped>
.OrdFilterPrinc {
    display: flex;
    flex-direction: column;
    height: 20%;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: visible;
    gap: 7%;
    flex-shrink: 0;
}

.ConsFiltHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.ConsFiltHeader span {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
}

.FiltRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.RowData {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 33%;
}

.RowData text {
    font-size: 1.3rem;
    font-weight: 500;
    color: #130348;
}

.bars {
    width: 70%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.EstBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 27%;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    cursor: pointer;
}

.RowData2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 50%;
}

.RowData2 text {
    font-size: 1.3rem;
    font-weight: 500;
    color: #130348;
}

.RowData3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 20%;
}

.RowData3 text {
    font-size: 1.3rem;
    font-weight: 500;
    color: #130348;
}

.EstBox2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 47%;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    cursor: pointer;
}

.Consbtn {
    padding: 10px 35px;
    border: 1px solid #FFFFFF;
    border-radius: 15px;
    background-color: #130348;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
}

.Consbtn:hover {
    background-color: #230097;
}

.Consbtn.secundario {
    padding: 10px 20px;
    background-color: transparent;
    border: 1.5px solid #130348;
    color: #130348;
}

.Consbtn.secundario:hover {
    background-color: #F0F0F0;
}

.BtnGroup {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.EstBox.deshabilitado {
    opacity: 0.55;
    cursor: not-allowed;
}

.DropWrap {
    position: relative;
    width: 47%;
}

.DropWrap .EstBox2 {
    width: 100%;
}

.DropWrap .EstBox2 text {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.DropMenu {
    position: absolute;
    top: 110%;
    right: 0;
    min-width: 100%;
    width: max-content;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.DropItem {
    padding: 10px 18px;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
    color: #130348;
    font-size: 1rem;
    transition: background 0.15s;
}

.DropItem:last-child {
    border-bottom: none;
}

.DropItem:hover,
.DropItem.activo {
    background-color: #F5F5F5;
    font-weight: 600;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="OrdFilterPrinc">
        <div class="ConsFiltHeader">
            <span>
                Consultar Ordenes de Trabajo
            </span>
        </div>
        <div class="FiltRow">
            <div class="RowData">
                <text>
                    Orden #
                </text>
                <input
                    type="number"
                    min="1"
                    placeholder="Numero de Orden"
                    class="bars"
                    v-model="ordenId"
                    autocomplete="off"
                    @keyup.enter="consultar"
                />
            </div>
            <div class="RowData">
                <text>
                    Presupuesto #
                </text>
                <input
                    type="number"
                    min="1"
                    placeholder="Ingresar Presupuesto"
                    class="bars"
                    v-model="presupuestoId"
                    autocomplete="off"
                    @keyup.enter="consultar"
                />
            </div>
            <div class="RowData">
                <text>
                    Estatus Óptica
                </text>
                <div class="EstBox deshabilitado" title="Las órdenes aún no manejan estatus en el sistema">
                    <text>
                        Todos
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
        </div>
        <div class="FiltRow">
            <div class="RowData2">
                <text>
                    Nombre Cliente:
                </text>
                <ClienteBarSec :key="clienteBarKey" @clienteSeleccionado="cliente = $event" />
            </div>
            <div class="RowData3">
                <text>
                    Sucursal
                </text>
                <div class="DropWrap">
                    <div class="EstBox2" @click="toggleSucursales">
                        <text>
                            {{ sucursal?.sucursal ?? 'Todas' }}
                        </text>
                        <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="mostrarSucursales">
                        <div class="DropItem" :class="{ activo: !sucursal }" @click="seleccionarSucursal(null)">
                            Todas
                        </div>
                        <div
                            v-for="s in sucursales"
                            :key="s.id"
                            class="DropItem"
                            :class="{ activo: sucursal?.id === s.id }"
                            @click="seleccionarSucursal(s)"
                        >
                            {{ s.sucursal }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="BtnGroup">
                <button class="Consbtn secundario" @click="limpiar">
                    Limpiar
                </button>
                <button class="Consbtn" @click="consultar">
                    Consultar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClienteBarSec from './ClienteBarSec.vue';
import { getSucursales } from '../../../services/SucursalesServices'

const emit = defineEmits(['consultar'])

const ordenId = ref('')
const presupuestoId = ref('')
const cliente = ref(null)
const sucursal = ref(null)
const sucursales = ref([])
const mostrarSucursales = ref(false)
const clienteBarKey = ref(0)

const toggleSucursales = () => {
    mostrarSucursales.value = !mostrarSucursales.value
}

const seleccionarSucursal = (s) => {
    sucursal.value = s
    mostrarSucursales.value = false
}

const consultar = () => {
    emit('consultar', {
        orden_id: ordenId.value || null,
        id_cotizacion: presupuestoId.value || null,
        id_cliente: cliente.value?.id ?? null,
        sucursal_id: sucursal.value?.id ?? null,
    })
}

const limpiar = () => {
    ordenId.value = ''
    presupuestoId.value = ''
    cliente.value = null
    sucursal.value = null
    clienteBarKey.value++
    consultar()
}

onMounted(async () => {
    try {
        sucursales.value = await getSucursales()
    } catch (error) {
        console.error('Error al cargar sucursales:', error)
    }
})
</script>
