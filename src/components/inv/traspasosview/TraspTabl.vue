<style scoped>
.TraspTable {
    width: 98%;
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

.TraspTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.TraspTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadTraspTabl {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.Trasp tr {
    background-color: #F5F5F5;
}

.Trasp th {
    padding: 5px 1px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-bottom: 1px solid #130348;
}

.bodyTrasp tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyTrasp tr:hover { background-color: #FAFAFA; }

.bodyTrasp td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.bodyTrasp td:nth-child(1) {
    text-align: left;
}

.EstBox {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
}

.EstBox text {
    font-size: 1rem;
    color: white;
}

.butrow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10%;
}

.butrow button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 3px;
    border: 1px solid #130348;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 5%,
        #BCBCBC 100%
    );
    cursor: pointer;
}
</style>

<template>
    <div class="TraspTable">
        <div class="TraspTablHeader">
            <span>
                Mostrando Registros Disponibles
            </span>
        </div>
        <div class="HeadTraspTabl">
            <table>
                <colgroup>
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 6%;">
                    <col style="width: 7%;">
                    <col style="width: 7%;">
                    <col style="width: 10%;">
                    <col style="width: 7%;">
                    <col style="width: 10%;">
                    <col style="width: 5.5%;">
                </colgroup>
                <thead class="Trasp">
                    <tr>
                        <th>No#</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Estatus</th>
                        <th>Promesa Entrega</th>
                        <th>Creado Por</th>
                        <th>Fecha Creación</th>
                        <th>Modificado Por</th>
                        <th>Última Modificación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="bodyTrasp">
                    <tr>
                        <td>4483</td>
                        <td>Almacen Central</td>
                        <td>Plaza Juárez Mall</td>
                        <td>
                            <div class="EstBox">
                                <text>Recibido</text>
                            </div>
                        </td>
                        <td>27/06/26</td>
                        <td>alejandra.rangel</td>
                        <td>27/06/2026 13:23:59</td>
                        <td>alejandra.rangel</td>
                        <td>27/06/2026 13:24:08</td>
                        <td>
                            <div class="butrow">
                                <button>
                                    <span class="material-icons" @click="$emit('abrirModaldet')" style="color:#130348; font-size:20px;">visibility</span>
                                </button>
                                <button>
                                    <span class="material-icons" @click="$emit('abrirModEdit')" style="color:#130348; font-size:20px;">edit</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
defineEmits(['abrirModaldet', 'abrirModEdit'])
</script>