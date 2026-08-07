<style scoped>
.AtribTabPrinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
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
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;   
}
</style>

<template>
    <div class="AtribTabPrinc">
        <table>
            <thead>
                <tr>
                    <th>Longitud Atributo</th>
                    <th>Numero de Registros</th>
                    <th>Es Correcto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>21</td>
                    <td>25</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td>18</td>
                    <td>6</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td>19</td>
                    <td>3161</td>
                    <td>Si</td>
                </tr>
                <tr>
                    <td>22</td>
                    <td>4665</td>
                    <td>No</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

</script>