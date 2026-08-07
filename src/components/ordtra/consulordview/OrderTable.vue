<style scoped>
.OrdTable {
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

.OrdTablHeader {
    width: 100%;
    padding: 12px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.OrdTablHeader span {
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
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.DetalleTitulo {
    font-weight: 700;
    font-size: 0.85rem;
    color: #130348;
    text-align: left;
    padding-bottom: 4px;
    border-bottom: 1px solid #DDD;
    margin-bottom: 4px;
}

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
    <div class="OrdTable">
        <div class="OrdTablHeader">
            <span>
                Mostrando Ordenes Disponibles
            </span>
        </div>
        <div class="HeadProd">
            <table>
                <colgroup>
                    <col style="width: 5%;">
                    <col style="width: 5%;">
                    <col style="width: 7%;">
                    <col style="width: 9.1%;">
                    <col style="width: 14%;">
                    <col style="width: 5.5%;">
                    <col style="width: 7%;">
                    <col style="width: 7%;">
                    <col style="width: 18%;">
                    <col style="width: 6.5%;">
                    <col style="width: 6.5%;">
                    <col style="width: 9.1%;">
                </colgroup>
                <thead class="Prod">
                    <tr>
                        <th>Núm Orden.</th>
                        <th>Núm Prspto.</th>
                        <th>Sucursal</th>
                        <th>Cliente</th>
                        <th>Paciente</th>
                        <th>Enviada Por</th>
                        <th>Promesa Entrega</th>
                        <th>Fecha Envío</th>
                        <th>Detalle</th>
                        <th>Estatus Optica</th>
                        <th>Estatus Lab.</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="bodyT">
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                    <tr>
                        <td>500355</td>
                        <td>557406</td>
                        <td>Plaza Juárez Mal</td>
                        <td>Lozano Lopez Aleen</td>
                        <td>
                            <OrdPacMinTable />
                        </td>
                        <td>Rafael Luevano</td>
                        <td>06-jul-2026</td>
                        <td>22-jun-2026</td>
                        <td>
                            <OrdDetMinTable />
                        </td>
                        <td>Laboratorio</td>
                        <td>Almacen de Lentes</td>
                        <td>
                            <OrdButTable />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import OrdButTable from './OrdButTable.vue';
import OrdDetMinTable from './OrdDetMinTable.vue';
import OrdPacMinTable from './OrdPacMinTable.vue';


</script>