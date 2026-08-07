<style scoped>
.InventTablPrincipal {
    width: 98%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 8px;
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
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;   
}
</style>

<template>
    <div class="InventTablPrincipal">
        <div class="InventProdsHeader">
            <span>
                Mostrando Productos disponibles
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
                    <tr>
                        <td> </td>
                        <td>0100130001600000176</td>
                        <td>ENHANCE EN 3858 CABALLERO~COMPLETO METAL</td>
                        <td>0</td>
                        <td>0</td>
                        <td>X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>