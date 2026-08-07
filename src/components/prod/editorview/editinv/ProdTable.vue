<style scoped>
.TabPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    padding-bottom: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeadTab {
    display: flex;
    flex-direction: row;
    padding: 7px 30px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
}

.HeadTab span {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
}

.CliBarEdi {
    width: 100%;
    padding: 5px 1rem;
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
    padding: 3px 16px;
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
    <div class="TabPrinc">
        <div class="HeadTab">
            <span>Producto</span>
        </div>

        <table>
            <colgroup>
                <col style="width: 9%;">
                <col style="width: 11%;">
                <col style="width: 20%;">
                <col style="width: 7%;">
                <col style="width: 7%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 8%;">
                <col style="width: 4%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Sucursal</th>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Punto de Reorden</th>
                    <th>Existencia Actual</th>
                    <th>Entrada</th>
                    <th>Merma</th>
                    <th>Existencia Final</th>
                    <th>Activo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Smart Torres Del Sur</td>
                    <td>
                        <div class="CodeBox">
                            <text>0500000225700000000</text>
                        </div>
                    </td>
                    <td>AIR OPTIX COLORS GRA~+--0.50 A -6.00</td>
                    <td>
                        <input
                            type=double
                            placeholder=""
                            class="CliBarEdi"
                            v-model="searchQuery"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <input
                            type=double
                            placeholder=""
                            class="CliBarEdi"
                            v-model="searchQuery"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <input
                            type=double
                            placeholder=""
                            class="CliBarEdi"
                            v-model="searchQuery"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <input
                            type=double
                            placeholder=""
                            class="CliBarEdi"
                            v-model="searchQuery"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <input
                            type=double
                            placeholder=""
                            class="CliBarEdi"
                            v-model="searchQuery"
                            autocomplete="off"
                        />
                    </td>
                    <td>
                        <span class="material-icons" style="font-size:20px;">check</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

</script>