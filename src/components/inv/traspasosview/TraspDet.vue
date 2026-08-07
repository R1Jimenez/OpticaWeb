<style scoped>
.ModTraspDet {
    display: flex;
    flex-direction: column;
    gap: 5%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.PrincDet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    padding-bottom: 10px;
    background: radial-gradient(
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
}

.DetHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
    padding: 7px 16px;
}

.DetHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.impbut {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 7%;
    justify-content: space-around;
    padding: 5px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.impbut span {
    font-size: 15px;
    color: white;
}

.impbut:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
}

.impbut:hover span {
    color: #58B358;
}

.GridForm {
    display: grid;
    grid-template-columns: 35% .5fr;
    align-items: start;
    row-gap: 18px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
}

.GridForm text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.GridForm span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.estbox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;
    width: 20%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.TrasDetTab {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.TrasDetHead tr {
    background-color: #F5F5F5;
}

.TrasDetHead th {
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

.TrasDetBody tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.TrasDetBody tr:hover { background-color: #FAFAFA; }

.TrasDetBody td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}
</style>

<template>
    <div class="ModTraspDet" @click.self="$emit('cerrarm')">
        <div class="PrincDet">
            <div class="DetHeader">
                <span>Información General</span>
                <button class="impbut">
                    <span class="material-icons">print</span>
                    <span>Imprimir</span>
                </button>
            </div>
            <div class="GridForm">
                <text>Comentarios: </text>
                <span>Para venta en Plaza</span>

                <text>Estatus:</text>
                <div class="EstatusColumn">
                    <div class="estbox">Nuevo</div>
                    <span>El traspaso no ha sido guardado</span>
                </div>

                <text>Origen:</text>
                <span>Smart La Cuesta</span>
                
                <text>Destino:</text>
                <span>Plaza Juarez Mall</span>

                <text>Promesa de Entrega: </text>
                <span>Lunes, 29 de junio de 2026</span>

                <text>Creado Por:</text>
                <span>alejandra.rangel</span>

                <text>Fecha Creacion:</text>
                <span>29/06/2026 09:57:12</span>

                <text>Modificado Por:</text>
                <span>alejandra.rangel</span>

                <text>Ultima Modificacion:</text>
                <span>29/06/2026 09:57:24</span>
            </div>
        </div>
        <div class="PrincDet">
            <div class="DetHeader">
                <span>1 Productos</span>
            </div>
            <table class="TrasDetTab">
                <colgroup>
                    <col style="width: 2%;">
                    <col style="width: 14%;">
                    <col style="width: 13%;">
                    <col style="width: 21%;">
                    <col style="width: 15%;">
                    <col style="width: 8.75%;">
                    <col style="width: 8.75%;">
                    <col style="width: 8.75%;">
                    <col style="width: 8.75%;">
                </colgroup>
                <thead class="TrasDetHead">
                    <tr>
                        <th></th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Código Extremo</th>
                        <th>Unidades en Existencia</th>
                        <th>Cantidad Solicitada</th>
                        <th>Cantidad Enviada</th>
                        <th>Cantidad Recibida</th>
                    </tr>
                </thead>
                <tbody class="TrasDetBody">
                    <tr>
                        <td>1</td>
                        <td>0100640001700000155</td>
                        <td>NIKE NK 7281 UNISEX</td>
                        <td>OFTALMICO NIKE UNISEX NK 7281 (0100640001700000155)</td>
                        <td>COMPLETO PAS/METAL</td>
                        <td>7</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>7</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['cerrarm'])
</script>