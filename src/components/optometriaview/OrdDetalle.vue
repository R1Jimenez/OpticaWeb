<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 20px;
}

.modal-dialog {
    background: #F0F0F0;
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    width: 100%;
    max-width: 1100px;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* ── Header ── */
.modal-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.modal-header .titulo {
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
}

/* ── Tabs ── */
.modal-tabs {
    display: flex;
    gap: 4px;
    padding: 10px 20px 0;
    border-bottom: 1px solid #BCBCBC;
    background-color: #F0F0F0;
}

.modal-tab {
    padding: 8px 20px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #6C757D;
    cursor: pointer;
    border-bottom: 3px solid transparent;
}

.modal-tab.active {
    color: #130348;
    border-bottom-color: #FB1C2E;
}

/* ── Body ── */
.modal-body {
    padding: 20px 24px;
    overflow-y: auto;
}

.detalle-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 24px;
    align-items: start;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #130348;
    margin: 0 0 10px;
    border-bottom: 1px solid #BCBCBC;
    padding-bottom: 6px;
}

.section-title:not(:first-child) {
    margin-top: 20px;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 20px;
}

.info-field {
    margin-bottom: 8px;
}

.info-field .label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6C757D;
}

.info-field .value {
    font-size: 0.95rem;
    font-weight: 600;
    color: #130348;
}

.RefTable {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
}

.RefTable th {
    font-size: 0.8rem;
    font-weight: 700;
    color: #130348;
    padding: 6px 4px;
    text-align: center;
    border-bottom: 1px solid #130348;
}

.RefTable td {
    font-size: 0.85rem;
    color: #130348;
    text-align: center;
    padding: 6px 4px;
}

.RefTable .EtiquetaFila {
    text-align: left;
    font-weight: 600;
}

.medidas-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;
}

.medidas-row .info-field { margin-bottom: 0; }

.ProdTable {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
}

.ProdTable th {
    font-size: 0.85rem;
    font-weight: 700;
    color: #130348;
    text-align: left;
    padding: 6px 8px;
    background-color: #E7E7E7;
    border-bottom: 1px solid #130348;
}

.ProdTable td {
    font-size: 0.85rem;
    color: #130348;
    padding: 6px 8px;
    border-bottom: 1px solid #E0E0E0;
}

.estatus-list .info-field {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.estatus-list .label {
    width: 110px;
    flex-shrink: 0;
}

.HistTable {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 8px;
}

.HistTable th {
    font-size: 0.8rem;
    font-weight: 700;
    color: #130348;
    text-align: left;
    padding: 6px 8px;
    background-color: #E7E7E7;
    border-bottom: 1px solid #130348;
}

.HistTable td {
    font-size: 0.8rem;
    color: #130348;
    padding: 6px 8px;
    border-bottom: 1px solid #E0E0E0;
}

.empty-box {
    padding: 16px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 8px;
    text-align: center;
    font-size: 0.875rem;
    color: #6C757D;
    font-style: italic;
    margin-bottom: 16px;
}

.comentario-banner {
    padding: 10px 12px;
    background-color: #E7E7E7;
    border-radius: 6px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 700;
    color: #130348;
    margin-bottom: 16px;
}

/* ── Footer ── */
.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 14px 24px;
    border-top: 1px solid #BCBCBC;
    background-color: #F0F0F0;
}

.btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn:hover { opacity: 0.85; }
.btn .material-icons { font-size: 16px; }
.btn-gray { background-color: #6C757D; color: white; }
</style>

<template>
    <div class="modal-overlay" v-if="visible && orden" @click.self="$emit('close')">
        <div class="modal-dialog">

            <div class="modal-header">
                <span class="titulo">Detalle de Orden de Trabajo</span>
            </div>

            <div class="modal-tabs">
                <span class="modal-tab" :class="{ active: tabActiva === 'detalles' }" @click="tabActiva = 'detalles'">Detalles</span>
                <span class="modal-tab" :class="{ active: tabActiva === 'bitacora' }" @click="tabActiva = 'bitacora'">Bitácora</span>
            </div>

            <div class="modal-body">

                <template v-if="tabActiva === 'detalles'">
                    <div class="detalle-grid">

                        <!-- Columna izquierda -->
                        <div>
                            <div class="section-title">Detalles Generales</div>
                            <div class="info-grid">
                                <div class="info-field">
                                    <span class="label">Orden</span>
                                    <span class="value">{{ orden.id }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Sucursal</span>
                                    <span class="value">{{ orden.sucursal?.sucursal || 'N/A' }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Fecha Orden</span>
                                    <span class="value">{{ formatFecha(orden.fecha) }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Núm. Prsupuesto</span>
                                    <span class="value">N/A</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Enviada Por</span>
                                    <span class="value">{{ orden.usuario?.nombres }} {{ orden.usuario?.apellidos }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Cliente</span>
                                    <span class="value">{{ orden.cliente?.nombres }} {{ orden.cliente?.apellidos }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Paciente</span>
                                    <span class="value">{{ nombrePaciente(orden) }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Fecha Promesa</span>
                                    <span class="value">{{ formatFecha(orden.promesa_entrega) }}</span>
                                </div>
                            </div>

                            <div class="section-title">Información Referencial</div>
                            <table class="RefTable">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Esfera</th>
                                        <th>Cilindro</th>
                                        <th>Eje</th>
                                        <th>Adic.</th>
                                        <th>A/V</th>
                                        <th>DI</th>
                                        <th>DNP</th>
                                        <th>Prisma</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="EtiquetaFila">Ojo Derecho:</td>
                                        <td>{{ ojoInfo('od').esfera }}</td>
                                        <td>{{ ojoInfo('od').cilindro }}</td>
                                        <td>{{ ojoInfo('od').eje }}</td>
                                        <td>{{ ojoInfo('od').adicion }}</td>
                                        <td>{{ ojoInfo('od').av }}</td>
                                        <td rowspan="2">C {{ diInfo.c }} / L {{ diInfo.l }}</td>
                                        <td>{{ ojoInfo('od').dnp }}</td>
                                        <td>{{ ojoInfo('od').prisma }}</td>
                                    </tr>
                                    <tr>
                                        <td class="EtiquetaFila">Ojo Izquierdo:</td>
                                        <td>{{ ojoInfo('oi').esfera }}</td>
                                        <td>{{ ojoInfo('oi').cilindro }}</td>
                                        <td>{{ ojoInfo('oi').eje }}</td>
                                        <td>{{ ojoInfo('oi').adicion }}</td>
                                        <td>{{ ojoInfo('oi').av }}</td>
                                        <td>{{ ojoInfo('oi').dnp }}</td>
                                        <td>{{ ojoInfo('oi').prisma }}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="medidas-row">
                                <div class="info-field">
                                    <span class="label">Altura</span>
                                    <span class="value">{{ medidas.altura }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">A</span>
                                    <span class="value">{{ medidas.a }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">ED</span>
                                    <span class="value">{{ medidas.ed }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">B</span>
                                    <span class="value">{{ medidas.b }}</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">DBL</span>
                                    <span class="value">{{ medidas.dbl }}</span>
                                </div>
                            </div>

                            <div class="section-title">Productos y Servicios</div>
                            <table class="ProdTable">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Producto</th>
                                        <th>Cant.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detalle, idx) in detallesOrden" :key="idx">
                                        <td>{{ detalle.codigoExterno }}</td>
                                        <td>{{ detalle.nombre }}</td>
                                        <td>{{ detalle.cantidad }}</td>
                                    </tr>
                                    <tr v-if="detallesOrden.length === 0">
                                        <td colspan="3">Sin productos registrados</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="section-title">Estatus</div>
                            <div class="estatus-list">
                                <div class="info-field">
                                    <span class="label">Caja:</span>
                                    <span class="value">N/A</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Estatus Óptica:</span>
                                    <span class="value">N/A</span>
                                </div>
                                <div class="info-field">
                                    <span class="label">Estatus Lab.:</span>
                                    <span class="value">N/A</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna derecha -->
                        <div>
                            <div class="section-title">Comentarios Históricos</div>
                            <table class="HistTable">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Usuario</th>
                                        <th>Sucursal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ formatFecha(orden.fecha) }}</td>
                                        <td>{{ formatHora(orden.fecha) }}</td>
                                        <td>{{ orden.usuario?.nombres }} {{ orden.usuario?.apellidos }}</td>
                                        <td>{{ orden.sucursal?.sucursal || 'N/A' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="fechaEntregaTexto" class="comentario-banner">{{ fechaEntregaTexto }}</div>

                            <div class="section-title">Comentarios Laboratorio</div>
                            <div class="empty-box">No hay comentarios de laboratorio registrados</div>
                        </div>

                    </div>
                </template>

                <template v-else>
                    <div class="empty-box">No hay registros de bitácora para esta orden</div>
                </template>

            </div>

            <div class="modal-footer">
                <button class="btn btn-gray" @click="$emit('close')">
                    <span class="material-icons">close</span>
                    Cerrar
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    orden: { type: Object, default: null },
    visible: { type: Boolean, default: false },
})

defineEmits(['close'])

const tabActiva = ref('detalles')

// Reinicia siempre a la pestaña "Detalles" cada vez que se abre una nueva orden
watch(() => props.orden, () => { tabActiva.value = 'detalles' })

const nombrePaciente = (orden) => {
    return orden.paciente ? `${orden.paciente.nombres} ${orden.paciente.apellidos}` : 'Sin paciente asignado'
}

const formatFecha = (fecha) => {
    if (!fecha) return 'N/A'
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
}

const formatHora = (fecha) => {
    if (!fecha) return 'N/A'
    return new Date(fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
}

// El backend expone la refraccion dentro de info_referencial (refraccion_{oi|od}_{campo})
const ojoInfo = (ojo) => {
    const info = props.orden?.info_referencial
    if (!info) return { esfera: '-', cilindro: '-', eje: '-', adicion: '-', av: '-', dnp: '-', prisma: '-' }
    return {
        esfera: info[`refraccion_${ojo}_esfera`] ?? '-',
        cilindro: info[`refraccion_${ojo}_cilindro`] ?? '-',
        eje: info[`refraccion_${ojo}_eje`] ?? '-',
        adicion: info[`refraccion_${ojo}_adicion`] ?? '-',
        av: info[`refraccion_${ojo}_av`] ?? '-',
        dnp: info[`refraccion_${ojo}_dnp`] ?? '-',
        prisma: info[`refraccion_${ojo}_prisma`] ?? '-',
    }
}

const diInfo = computed(() => {
    const info = props.orden?.info_referencial
    return { c: info?.refraccion_di_c ?? '-', l: info?.refraccion_di_l ?? '-' }
})

const medidas = computed(() => {
    const info = props.orden?.info_referencial
    return {
        altura: info?.medidas_altura ?? '-',
        a: info?.medidas_a ?? '-',
        ed: info?.medidas_ed ?? '-',
        b: info?.medidas_b ?? '-',
        dbl: info?.medidas_dbl ?? '-',
    }
})

const detallesOrden = computed(() => {
    return (props.orden?.detalles || []).map(d => ({
        cantidad: d.cantidad,
        nombre: d.nombre,
        codigoExterno: d.codigo_externo,
    }))
})

const fechaEntregaTexto = computed(() => {
    const fecha = props.orden?.promesa_entrega
    if (!fecha) return null
    const dia = new Date(fecha).toLocaleDateString('es-MX', { weekday: 'long' })
    const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1)
    const fechaNumerica = new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
    return `Fecha de entrega ${diaCapitalizado}, ${fechaNumerica}. Por favor entregar en oficina`
})
</script>
