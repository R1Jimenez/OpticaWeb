<style scoped>
.MiniTablaDetalle {
    width: 100%;
    border-collapse: collapse;
    background: transparent;
}

.MiniTablaDetalle th {
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    text-align: center;
    padding: 2px 6px;
    border: none;
}

.MiniTablaDetalle td {
    font-size: 0.8rem;
    color: #130348;
    text-align: left;
    padding: 2px 6px;
    border: none;
    white-space: normal;
}

.MiniTablaDetalle .EtiquetaFila {
    text-align: left;
    font-weight: 600;
    color: #130348;
}
</style>

<template>
    <table class="MiniTablaDetalle">
        <colgroup>
            <col style="width: 8%;">
            <col style="width: 46%;">
            <col style="width: 46%;">
        </colgroup>
        <thead>
            <tr>
                <th></th>
                <th>Nombre</th>
                <th>Código Externo</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, idx) in detalles" :key="idx">
                <td class="EtiquetaFila">{{ item.cantidad }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.codigoExterno }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    detalles: {
        type: Array,
        default: () => [
            { cantidad: 1, nombre: 'SEIMA SM 1766 UNISEX', codigoExterno: 'COMPLETO PASTA' },
            { cantidad: 1, nombre: 'CLIENTE VS POLY COMB', codigoExterno: 'COMB +-3.00 CIL -2' },
            { cantidad: 1, nombre: 'CLIENTE VISUAL CAPA ANTIRREFLEJANTE', codigoExterno: 'ANTIRREFLEJANTE' },
        ],
    },
})
</script>

