<style scoped>
.FormPaPrincipal {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98%;
    height: 70%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
}

.FormPaPagsRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70.5%;
    padding-top: .5%;
    padding-left: 2%;
    padding-right: 2%;
}

.FormPaPagosBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 49%;
    border-radius: 20px;
    border: 2.5px solid #130348;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    overflow: hidden;
}

.FormPathead tr {
    background-color: #F5F5F5;
}

.FormPathead th {
    padding: 9px 12px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    white-space: nowrap;
    border-bottom: 1px solid #BCBCBC;
}

th:nth-child(1), td:nth-child(1) { width: 10%; }
th:nth-child(2), td:nth-child(2) { width: 75%; }
th:nth-child(3), td:nth-child(3) { width: 15%; }

.Formpatbody td {
    padding: 8px 12px;
    vertical-align: middle;
}

.Formpatable-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #BCBCBC;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #130348;
    outline: none;
    box-sizing: border-box;
    background: white;
}

.Formpatable-input:focus {
    border-color: #130348;
    border-width: 2px;
}

.FormapaTotalesRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 10%;
}

.FormapaPagadosColumn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 25%;
}

.FormapaPagadosColumn text {
    font-size: 1.2rem;
    color: #130348;
}

.FormapaNumPag {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 65%;
    height: 65%;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #130348;
}

.FormapaObsRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 20%;
    width: 100%;
    gap: 1%;
}

.FormapaObsRow text {
    font-size: 1.2rem;
    color: #130348;
}

.Formapaobstext {
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 60%;
    border: 1px solid #130348;
    border-radius: 15px;
    background-color: white;
}
</style>

<template>
    <div class="FormPaPrincipal">
        <div class="FormPaPagsRow">
            <div class="FormPaPagosBox">
                <table>
                    <thead class="FormPathead">
                        <tr>
                            <th>Forma de Pago</th>
                            <th>Referencia</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody class="Formpatbody">
                        <tr>
                            <td>Efectivo</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Nota de Crédito</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Vale</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Cheque</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Tarjeta de Credito</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Credito</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Cortesía</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="FormPaPagosBox">
                <table>
                    <thead class="FormPathead">
                        <tr>
                            <th>Forma de Pago</th>
                            <th>Referencia</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody class="Formpatbody">
                        <tr>
                            <td>Deposito Bancario</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Vale de Descuento</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Bancomer</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Banamex</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>Santander</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>AMEX</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                        <tr>
                            <td>CLIP</td>
                            <td><input class="Formpatable-input" type="text" placeholder="Referencia" /></td>
                            <td><input class="Formpatable-input" type="number" placeholder="0.00" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="FormapaTotalesRow">
            <div class="FormapaPagadosColumn">
                <text>
                    Total Pagado $
                </text>
                <div class="FormapaNumPag">
                    0.00
                </div>
            </div>
            <div class="FormapaPagadosColumn">
                <text>
                    Diferencia $
                </text>
                <div class="FormapaNumPag">
                    0
                </div>
            </div>
        </div>
        <div class="FormapaObsRow">
            <text>
                Observaciones:
            </text>
            <div class="Formapaobstext">

            </div>
        </div>
    </div>
</template>

<style>

</style>