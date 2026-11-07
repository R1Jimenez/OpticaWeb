<style scoped>
.LiqDetOverlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.LiqDetModal {
    display: flex;
    flex-direction: column;
    width: 760px;
    max-width: 94vw;
    max-height: 88vh;
    background: radial-gradient(ellipse at center, #F0F0F0 10%, #BCBCBC 100%);
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.LiqDetHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: radial-gradient(ellipse at left, #130348 10%, #07072C 100%);
    border-bottom: 1px solid #FB1C2E;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
}

.BtnCerrar {
    display: flex;
    padding: 2px;
    border: none;
    border-radius: 6px;
    background: none;
    color: white;
    cursor: pointer;
}

.BtnCerrar:hover {
    background: rgba(255, 255, 255, 0.15);
}

.LiqDetBody {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #130348 transparent;
}

.Resumen {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 16px;
    padding: 12px 16px;
    background: white;
    border: 1px solid #130348;
    border-radius: 14px;
}

.Dato {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.Dato span {
    font-size: 0.8rem;
    font-weight: 600;
    color: #6C757D;
}

.Dato strong {
    font-size: 1rem;
    color: #130348;
}

.Seccion {
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
}

.Caja {
    background: white;
    border: 1px solid #130348;
    border-radius: 14px;
    overflow: hidden;
}

.Caja table {
    width: 100%;
    border-collapse: collapse;
}

.Caja th {
    padding: 7px 12px;
    background-color: #F5F5F5;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 1px solid #130348;
}

.Caja td {
    padding: 6px 12px;
    font-size: 0.9rem;
    color: #130348;
    border-bottom: 1px solid #F0F0F0;
    vertical-align: top;
}

.Caja tr:last-child td {
    border-bottom: none;
}

.Caja .Num {
    text-align: right;
    white-space: nowrap;
}

.Formas {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.Forma {
    padding: 1px 8px;
    border-radius: 8px;
    background: #130348;
    color: white;
    font-size: 0.78rem;
    white-space: nowrap;
}

.Nota {
    display: block;
    margin-top: 2px;
    font-size: 0.75rem;
    color: #6C757D;
}

.LiqDetFooter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 12px 20px 16px;
    border-top: 1px solid rgba(19, 3, 72, 0.15);
}

.Aviso {
    margin-right: auto;
    font-size: 0.85rem;
    font-weight: 600;
}

.Aviso.error { color: #FB1C2E; }
.Aviso.exito { color: #2E8B57; }

.BtnSecundario,
.BtnImprimir {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 18px;
    border-radius: 18px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
}

.BtnSecundario {
    background: radial-gradient(ellipse at center, #130348 10%, #07072C 100%);
    border: 1px solid white;
    color: white;
}

.BtnImprimir {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
    border: 1px solid white;
    color: white;
}

.BtnImprimir:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.BtnImprimir .material-icons {
    font-size: 19px;
}

.Mensaje {
    padding: 24px;
    text-align: center;
    color: #130348;
}
</style>

<template>
    <div class="LiqDetOverlay" @click.self="$emit('cerrar')">
        <div class="LiqDetModal" role="dialog" aria-modal="true" data-cy="liquidacion-detalle">
            <div class="LiqDetHeader">
                <span>Liquidación del presupuesto #{{ cotizacionId }}</span>
                <button class="BtnCerrar" title="Cerrar" @click="$emit('cerrar')">
                    <span class="material-icons">close</span>
                </button>
            </div>

            <div v-if="cargando" class="Mensaje">Cargando detalle...</div>
            <div v-else-if="error" class="Mensaje">{{ error }}</div>
            <div v-else-if="detalle" class="LiqDetBody">
                <div class="Resumen">
                    <div class="Dato"><span>Sucursal</span><strong>{{ detalle.sucursal }}</strong></div>
                    <div class="Dato"><span>Tipo de Venta</span><strong>{{ detalle.tipo_venta }} · {{ detalle.plazo }}</strong></div>
                    <div class="Dato"><span>Importe Total</span><strong>{{ formatearMoneda(detalle.total_venta) }}</strong></div>
                    <div class="Dato"><span>Fecha de Venta</span><strong>{{ formatearFecha(detalle.fecha_venta) }}</strong></div>
                    <div class="Dato"><span>Fecha de Liquidación</span><strong>{{ formatearFecha(detalle.fecha_liquidacion) }}</strong></div>
                    <div class="Dato"><span>Ticket</span><strong>{{ detalle.impresa ? 'Impreso' : 'Sin imprimir' }}</strong></div>
                </div>

                <span class="Seccion">Productos</span>
                <div class="Caja">
                    <table>
                        <thead>
                            <tr><th>Producto</th><th class="Num">Cantidad</th><th class="Num">Subtotal</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="(p, i) in detalle.detalles" :key="i">
                                <td>{{ p.nombre }}</td>
                                <td class="Num">{{ p.cantidad }}</td>
                                <td class="Num">{{ formatearMoneda(p.subtotal) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <span class="Seccion">Pagos</span>
                <div class="Caja">
                    <table data-cy="liquidacion-pagos">
                        <thead>
                            <tr><th>Concepto</th><th>Fecha</th><th>Formas de pago</th><th class="Num">Monto</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="(p, i) in detalle.pagos" :key="i">
                                <td>
                                    {{ p.concepto }}
                                    <span v-if="p.cobro_id" class="Nota">Cobro #{{ p.cobro_id }}</span>
                                </td>
                                <td>{{ formatearFecha(p.fecha, true) }}</td>
                                <td>
                                    <div v-if="p.formas.length" class="Formas">
                                        <span v-for="(f, j) in p.formas" :key="j" class="Forma" :title="f.referencia || ''">
                                            {{ f.forma }} {{ formatearMoneda(f.importe) }}
                                        </span>
                                    </div>
                                    <span v-else class="Nota">Sin formas registradas</span>
                                    <span
                                        v-if="p.cobro_total != null && Number(p.cobro_total) !== Number(p.monto)"
                                        class="Nota"
                                    >El cobro de {{ formatearMoneda(p.cobro_total) }} incluyó otros presupuestos</span>
                                </td>
                                <td class="Num">{{ formatearMoneda(p.monto) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="LiqDetFooter">
                <span v-if="aviso" class="Aviso" :class="aviso.tipo">{{ aviso.texto }}</span>
                <button class="BtnSecundario" @click="$emit('cerrar')">Cerrar</button>
                <button
                    class="BtnImprimir"
                    :disabled="!detalle || imprimiendo"
                    data-cy="imprimir-liquidacion"
                    @click="imprimir"
                >
                    <span class="material-icons">print</span>
                    {{ imprimiendo ? 'Imprimiendo...' : 'Imprimir ticket' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDetalleLiquidacion, marcarLiquidacionImpresa } from '../../../../services/PagosServices'
import { getTicket } from '../../../../services/CotizacionServices'
import { abrirVentanaTicket, escribirTicket, datosTicketVenta } from '../../../../utils/ticket'
import { parsearFechaUTC, formatearMoneda } from '../../../../utils/formato'

const props = defineProps({
    cotizacionId: { type: Number, required: true },
})

const emit = defineEmits(['cerrar', 'impresa'])

const detalle = ref(null)
const cargando = ref(false)
const error = ref('')
const imprimiendo = ref(false)
const aviso = ref(null)

function formatearFecha(fecha, conHora = false) {
    const d = parsearFechaUTC(fecha)
    if (!d) return '-'
    const dia = d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
    return conHora ? `${dia} ${d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}` : dia
}

async function imprimir() {
    aviso.value = null
    const ventana = abrirVentanaTicket()
    imprimiendo.value = true
    try {
        escribirTicket(ventana, datosTicketVenta(await getTicket(props.cotizacionId)))
    } catch (e) {
        ventana?.close()
        aviso.value = { tipo: 'error', texto: e.message }
        imprimiendo.value = false
        return
    }
    try {
        if (!detalle.value.impresa) {
            await marcarLiquidacionImpresa(props.cotizacionId)
            detalle.value.impresa = true
            emit('impresa', props.cotizacionId)
        }
    } catch (e) {
        aviso.value = { tipo: 'error', texto: `Ticket impreso, pero no se pudo registrar: ${e.message}` }
    } finally {
        imprimiendo.value = false
    }
}

onMounted(async () => {
    cargando.value = true
    try {
        detalle.value = await getDetalleLiquidacion(props.cotizacionId)
    } catch (e) {
        error.value = e.message
    } finally {
        cargando.value = false
    }
})
</script>
