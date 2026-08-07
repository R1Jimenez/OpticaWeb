<style scoped>
.EditTablPrinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    flex-shrink: 0;
}

.HeadTabEdt {
    display: flex;
    flex-direction: row;
    padding: 5px 30px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
}

.HeadTabEdt span {
    font-size: 1.2rem;
    font-weight: 600;
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
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="EditTablPrinc">
        <div class="HeadTabEdt">
            <span>Mostrando Productos Disponibles</span>
        </div>
        <table>
            <colgroup>
                    <col style="width: 13.5%;">
                    <col style="width: 59.5%;">
                    <col style="width: 5%;">
                    <col style="width: 7%;">
                    <col style="width: 10%;">
                    <col style="width: 5%;">
                </colgroup>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Existencias</th>
                    <th>Código de Barras</th>
                    <th>Estatus</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="producto in productos" :key="producto.id" >
                    <td>
                        <div class="CodeBox">
                            <text>{{ producto.codigo }}</text>
                        </div>
                    </td>
                    <td @click="seleccionarProducto(producto)">{{ producto.nombre }}</td>
                    <td @click="$emit('EditPrecMod')">
                        <span class="material-icons" style="font-size:20px; color:#130348; cursor: pointer;">
                            sell
                        </span>
                    </td>
                    <td @click="$emit('EditInv')">
                        <span class="material-icons" style="font-size:20px; color:#130348; cursor: pointer;">
                            inventory_2
                        </span>
                    </td>
                    <td>
                        <span class="material-icons" style="font-size:20px; color:#130348; cursor: pointer;">
                            barcode_reader
                        </span>
                    </td>
                    <td>
                        <span class="material-icons" style="font-size:20px; color:#130348; cursor: pointer;">
                            {{ producto.estatus === 1 ? 'check' : 'close' }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ProductosService } from '../../../services/ProductosServices'

const props = defineProps({
    productos: {
        type: Array,
        default: () => []
    }
})

const emits = defineEmits(['EditProdMod', 'EditPrecMod', 'EditInv'])

const seleccionarProducto = async (producto) => {
    const productoCompleto = await ProductosService.getById(producto.id)
    emits('EditProdMod', productoCompleto)
}
</script>