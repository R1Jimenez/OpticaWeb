<style scoped>
.TicksTabPrinc {
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

.TicksHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.TicksHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadTicks {
    width: 100%;
    overflow-x: auto;
}

.Ticket tr {
    background-color: #F5F5F5;
}

.Ticket th {
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

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.bodyTT tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyTT tr:last-child { border-bottom: none; }
.bodyTT tr:hover { background-color: #FAFAFA; }

.bodyTT td {
    padding: 10px;
    font-size: 1rem;
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;   
}
</style>

<template>
    <div class="TicksTabPrinc">
        <div class="TicksHeader">
            <span>
                Mostrando Tickets disponibles
            </span>
        </div>
        <div class="HeadTicks">
            <table>
                <colgroup>
                    <col style="width: 7%;">
                    <col style="width: 15%;">
                    <col style="width: 38%;">
                    <col style="width: 10%;">
                    <col style="width: 23%;">
                    <col style="width: 7%;">
                </colgroup>
                <thead class="Ticket">
                    <tr>
                        <th>Folio</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Importe</th>
                        <th>Comentarios</th>
                        <th>Imprimir</th>
                    </tr>
                </thead>
                <tbody class="bodyTT">
                    <tr>
                        <td>32006</td>
                        <td>19/06/2026 01:31 PM</td>
                        <td>GONZALEZ CERA SANDRA</td>
                        <td>$1,396.25</td>
                        <td> </td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>32007</td>
                        <td>19/06/2026 03:04 PM</td>
                        <td>MOSTRADOR TORRES SUR</td>
                        <td>$500.00</td>
                        <td> </td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>32008</td>
                        <td>19/06/2026 03:55 PM</td>
                        <td>MADRID FLORES ELIZABETH</td>
                        <td>$1,090.00</td>
                        <td> </td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>32009</td>
                        <td>19/06/2026 04:53 PM</td>
                        <td>ETHICON SUC TORRES NVO</td>
                        <td>$807.07</td>
                        <td> </td>
                        <td>X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>