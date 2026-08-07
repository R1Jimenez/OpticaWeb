<style scoped>
.MovTable {
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

.MovTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.MovTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

.HeadMovTabl {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.Movs tr {
    background-color: #F5F5F5;
}

.Movs th {
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

.bodyMovs tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.bodyMovs tr:hover { background-color: #FAFAFA; }

.bodyMovs td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.bodyMovs td:nth-child(1) {
    text-align: left;
}
</style>

<template>
    <div class="MovTable">
        <div class="MovTablHeader">
            <span>
                Mostrando Descuentos Disponibles
            </span>
        </div>
        <div class="HeadMovTabl">
            <table>
                <colgroup>
                    <col style="width: 9%;">
                    <col style="width: 8%;">
                    <col style="width: 15.5%;">
                    <col style="width: 27%;">
                    <col style="width: 10%;">
                    <col style="width: 9.8%;">
                    <col style="width: 10%;">
                    <col style="width: 6%;">
                    <col style="width: 5.5%;">
                    <col style="width: 5.5%;">
                    <col style="width: 5%;">
                </colgroup>
                <thead class="Movs">
                    <tr>
                        <th>Sucursal</th>
                        <th>Fecha</th>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Referencia</th>
                        <th>Usuario</th>
                        <th>Existencia Anterior</th>
                        <th>Entradas</th>
                        <th>Salidas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody class="bodyMovs">
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/6/2026 11:41:00 AM</td>
                        <td>0502850001100000000</td>
                        <td>ACUVUE OASYS LENTES DE CONTACTO HIDROFILICO~L/C -0.50 A -5.75</td>
                        <td>Entradas por Encontrados - Ajuste</td>
                        <td>Entrada por ajuste</td>
                        <td>Alejandra Rangel</td>
                        <td>28</td>
                        <td>1</td>
                        <td>0</td>
                        <td>29</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Smart Torres Del Sur</td>
                        <td>6/13/2026 12:27:12 PM</td>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX~COMPLETO PASTA</td>
                        <td>Salidas por Venta</td>
                        <td>Factura 523123</td>
                        <td>Verónica Soto</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>