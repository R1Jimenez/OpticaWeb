<style scoped>
.PromTable {
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

.PromTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.PromTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadProd {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.Prod tr {
    background-color: #F5F5F5;
}

.Prod th {
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

.bodyT tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyT tr:last-child { border-bottom: none; }
.bodyT tr:hover { background-color: #FAFAFA; }

.bodyT td {
    padding: 10px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.bodyT td:nth-child(1) {
    text-align: left;
}
</style>

<template>
    <div class="PromTable">
        <div class="PromTablHeader">
            <span>
                Mostrando Descuentos Disponibles
            </span>
        </div>
        <div class="HeadProd">
            <table>
                <colgroup>
                    <col style="width: 36%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 7%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 5%;">
                    <col style="width: 10%;">
                </colgroup>
                <thead class="Prod">
                    <tr>
                        <th>Nombre</th>
                        <th>Descuento (%)</th>
                        <th>Dec. Vendedor (%)</th>
                        <th>Acumulativo</th>
                        <th>Inicio Vigencia</th>
                        <th>Fin Vigencia</th>
                        <th>Editar</th>
                        <th>Copiar Estructura</th>
                    </tr>
                </thead>
                <tbody class="bodyT">
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                    <tr>
                        <td>20%DESC PARA PAPA</td>
                        <td>20</td>
                        <td>0</td>
                        <td>
                            <input
                                type="checkbox"
                                class="check"
                                v-model="tipoSeleccionado"
                            >
                        </td>
                        <td>6/6/2006</td>
                        <td>6/6/2046</td>
                        <td>
                            <span class="material-icons" style="color:#130348; font-size:25px;">edit</span>
                        </td>
                        <td>copiar</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>