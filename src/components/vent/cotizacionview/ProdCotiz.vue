<style scoped>
.CotizProdPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98%;
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: solid 2px #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.Header {
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

.Header span {
    font-size: 1.3rem;
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
    text-align: left;
}

.CodeBox {
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
}

.CodeBox text {
    font-size: 1rem;
    font-weight: 550;
    color: white;
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

.add {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: 3px 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.add:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
    color: #58B358;
}
</style>

<template>
    <div class="CotizProdPrinc">
        <div class="Header">
            <span>Consultar Producto</span>
        </div>
        <table>
            <colgroup>
                <col style="width: 14%;">
                <col style="width: 59%;">
                <col style="width: 8%;">
                <col style="width: 5%;">
                <col style="width: 7%;">
                <col style="width: 7%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Concepto</th>
                    <th>Precio Venta</th>
                    <th>Piezas</th>
                    <th>Precio Total</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            placeholder="Código"
                            class="CliBarEdInv"
                            :value="codigoMostrado"
                            autocomplete="off"
                            readonly
                        />
                    </td>
                    <td>{{ nombreMostrado }}</td>
                    <td>${{  precioVenta.toFixed(2) }}</td>
                    <td>
                        <input
                            type="number"
                            placeholder="0"
                            class="CliBarEdInv"
                            v-model.number="piezas"
                            :max="piezasDisponibles"
                            min="0"
                            autocomplete="off"
                        />
                    </td>
                    <td>${{ PrecioTotal.toFixed(2) }}</td>
                    <td>
                        <button class="add" :disabled="!puedeAgregar" @click="agregarProducto">
                            <span class="material-icons">add</span>
                            <span>Agregar</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCotizacionStore } from '../../../stores/cotizacion';

const cotizacionStore = useCotizacionStore();

const piezas = ref(1);

const productoActual = computed(() => cotizacionStore.productoBusqueda?.producto || null);
const precioActual = computed(() => cotizacionStore.productoBusqueda?.precio || null);
const inventarioActual = computed(() => cotizacionStore.productoBusqueda?.inventario || null);

const codigoMostrado = computed(() => productoActual.value?.codigo || '');
const nombreMostrado = computed(() => productoActual.value?.nombre || '-');
const precioVenta = computed(() => (precioActual.value ? Number(precioActual.value.precio) : 0));
const PrecioTotal = computed(() => precioVenta.value * (piezas.value || 0));

const piezasDisponibles = computed(() => {
    if (!productoActual.value || !inventarioActual.value) return 0;
    const enCarrito = cotizacionStore.piezasEnCarrito(productoActual.value.id)
    return Math.max(0, inventarioActual.value.existencia_actual - enCarrito);
})

const puedeAgregar = computed(() => {
    return productoActual.value && piezas.value > 0 && piezas.value <= piezasDisponibles.value;
})

watch (piezas, (nuevoValor) => {
    if (nuevoValor > piezasDisponibles.value) {
        piezas.value = piezasDisponibles.value;
    }
    if (nuevoValor < 0) {
        piezas.value = 0;
    }
})

watch (productoActual, () => {
    piezas.value = piezasDisponibles.value > 0 ? 1 : 0;
})

const agregarProducto = () => {
    if (!puedeAgregar.value) return;

    cotizacionStore.agregarItem({
        producto: productoActual.value,
        precio: precioActual.value,
        piezas: piezas.value,
        inventario: inventarioActual.value,
    })

    cotizacionStore.limpiarProductoBusqueda()
    piezas.value = 1;
}
</script>