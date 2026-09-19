<style scoped>
.InventTablPrincipal {
    width: 98%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
    margin-top: 1%;
    flex-shrink: 0;
}

.InventProdsHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.InventProdsHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.InventHeadProd {
    width: 100%;
    overflow-x: auto;
}

.Inventtable {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.InventProd tr {
    background-color: #F5F5F5;
}

.InventProd th {
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

.InventbodyT tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.InventbodyT tr:last-child { border-bottom: none; }
.InventbodyT tr:hover { background-color: #FAFAFA; }

.InventbodyT td {
    padding: 10px;
    font-size: 1rem;
    font-weight: 550;
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;   
}

.producto-wrapper {
    overflow: hidden;
    width: 100%;
}

.producto-text {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
}

.producto-text.is-scrolling {
    max-width: none;
    text-overflow: clip;
}

.codebox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 3px;
    width: 95%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 550;
    color: white;
}
</style>

<template>
    <div class="InventTablPrincipal">
        <div class="InventProdsHeader">
            <span>
                Mostrando Productos disponibles{{ sucursalStore.sucursalSeleccionada?.nombre ? ` - ${sucursalStore.sucursalSeleccionada.nombre}` : '' }}
            </span>
        </div>
        <div class="InventHeadProd">
            <table class="Inventtable">
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 20%;">
                    <col style="width: 38%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 7%;">
                </colgroup>
                <thead class="InventProd">
                    <tr>
                        <th>Categoría</th>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Existencia</th>
                        <th>Punto de Reorden</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody class="InventbodyT">
                    <tr v-if="inventarioStore.isLoading">
                        <td colspan="6">Cargando inventario...</td>
                    </tr>
                    <tr v-else-if="inventarioStore.productos.length === 0">
                        <td colspan="6">Sin productos disponibles</td>
                    </tr>
                    <tr v-for="item in inventarioStore.productos" :key="item.id">
                        <td> </td>
                        <td>
                            <div class="codebox">
                                {{ item.producto.codigo }}
                            </div>
                        </td>
                        <td>
                            <div class="producto-wrapper" @mouseenter="onProductoHover" @mouseleave="onProductoLeave">
                                <span class="producto-text">{{ item.producto.nombre }}</span>
                            </div>
                        </td>
                        <td>{{ item.existencia_actual }}</td>
                        <td>{{ item.punto_reorden }}</td>
                        <td>
                            <span class="material-icons" style="font-size:20px; color:#130348;">
                                {{ item.producto.estatus === 1 ? 'check' : 'close' }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useSucursalStore } from '../../../stores/sucursal'
import { useInventarioProductosStore } from '../../../stores/inventarioProductos'

const sucursalStore = useSucursalStore()
const inventarioStore = useInventarioProductosStore()

const cargarInventario = () => {
    inventarioStore.cargarProductos(sucursalStore.sucursalSeleccionada?.id)
}

onMounted(cargarInventario)
watch(() => sucursalStore.sucursalSeleccionada?.id, cargarInventario)

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
    text.style.transform = 'translateX(0)'
    text.addEventListener('transitionend', () => {
        text.classList.remove('is-scrolling')
        text.style.transition = ''
    }, { once: true })
}
</script>