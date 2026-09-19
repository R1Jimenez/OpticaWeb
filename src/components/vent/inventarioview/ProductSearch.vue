<style scoped>
.InventProdrinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 18%;
    width: 87%;
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
}

.InventRowInp {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
    gap: 1%;
}

.InventRowInp text {
    font-size: 1.4rem;
    color: #130348;
    font-weight: 600;
}

.InventProdbar {
    width: 50%;
    height: 50%;
    padding: 0.625rem 0.875rem 0.625rem 2.8rem;
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

.InventRowEdits {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    width: 100%;
}

.InventRowEdits text {
    font-size: 1.2rem;
    color: #130348;
}

.InventRowCode {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 30%;
}

.InventCodeBar {
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

.InventEstRow {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 15%;
    height: 50%;
}

.InventEstRow text {
    font-size: 1.3rem;
    color: #130348;
}

.InventAcMenu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 50%;
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    padding-left: 3%;
    padding-right: 3%;
}

.InventAcMenu text{
    font-size: 1rem;
    color: #130348;
    font-weight: 550;
}

.InventProdConsButton {
    padding: 10px 17px;
    border: 1px solid #FFFFFF;
    border-radius: 15px;
    background-color: #130348;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 500;
}

.InventProdConsButton:hover {
    background-color: #F0F0F0;
    border: 1px solid #130348;
    color: #130348;
    cursor: pointer;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="InventProdrinc">
        <div class="InventRowInp">
            <text>
                Producto:
            </text>
            <input 
                type="text"
                placeholder="Consultar Producto"
                class="InventProdbar"
                v-model="nombreQuery"
                autocomplete="off"
                @keyup.enter="consultar"
            />
        </div>
        <div class="InventRowEdits">
            <div class="InventRowCode">
                <text>
                    Código:
                </text>
                <input
                    type="text"
                    placeholder="Codigo Producto"
                    class="InventCodeBar"
                    v-model="codigoQuery"
                    autocomplete="off"
                    @keyup.enter="consultar"
                />
            </div>
            <div class="InventEstRow">
                <text>
                    Estatus:
                </text>
                <div class="InventAcMenu" @click="ciclarEstatus">
                    <text>{{ estatusSeleccionado.label }}</text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
            <button class="InventProdConsButton" @click="consultar">
                Consultar
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSucursalStore } from '../../../stores/sucursal'
import { useInventarioProductosStore } from '../../../stores/inventarioProductos'

const sucursalStore = useSucursalStore()
const inventarioStore = useInventarioProductosStore()

const nombreQuery = ref('')
const codigoQuery = ref('')

const estatusOpciones = [
    { id: 1, label: 'Activo' },
    { id: 2, label: 'Inactivo' },
    { id: null, label: 'Todos' },
]
const estatusIndex = ref(0)
const estatusSeleccionado = computed(() => estatusOpciones[estatusIndex.value])

const ciclarEstatus = () => {
    estatusIndex.value = (estatusIndex.value + 1) % estatusOpciones.length
}

const consultar = () => {
    inventarioStore.setFiltros({
        nombre: nombreQuery.value.trim(),
        codigo: codigoQuery.value.trim(),
        estatus: estatusSeleccionado.value.id,
    })
    inventarioStore.cargarProductos(sucursalStore.sucursalSeleccionada?.id)
}
</script>