<style scoped>
.ModTraspDet {
    display: flex;
    flex-direction: column;
    gap: 3%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: safe center;
    overflow-y: auto;
    padding: 2% 0;
    z-index: 999;
}

.PrincDet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
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
    width: auto;
    gap: 6px;
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

.TrasDetBody tr.Totales td {
    font-weight: 700;
    background-color: #F5F5F5;
}

.EstatusColumn {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.estbox.Nuevo,
.estbox.Enviado,
.estbox.Recibido,
.estbox.Cancelado {
    color: white;
}

.estbox.Nuevo {
    background: radial-gradient(ellipse at center, #130348 10%, #07072C 100%);
}

.estbox.Enviado {
    background: radial-gradient(ellipse at center, #230097 10%, #130348 100%);
}

.estbox.Recibido {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
}

.estbox.Cancelado {
    background: radial-gradient(ellipse at center, #FB1C2E 10%, #bb1724 100%);
}

.DetMensaje {
    padding: 20px;
    color: #130348;
    font-weight: 600;
}

.CerrarBtn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
}

.HeaderAcciones {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}
</style>

<template>
    <div class="ModTraspDet" data-cy="detalle-traspaso" @click.self="$emit('cerrarm')">
        <div class="PrincDet">
            <div class="DetHeader">
                <span>Información General — Traspaso #{{ traspasoId }}</span>
                <div class="HeaderAcciones">
                    <button class="impbut" :disabled="!traspaso" @click="imprimir">
                        <span class="material-icons">print</span>
                        <span>Imprimir</span>
                    </button>
                    <button class="CerrarBtn" title="Cerrar" @click="$emit('cerrarm')">
                        <span class="material-icons">close</span>
                    </button>
                </div>
            </div>
            <div v-if="cargando" class="DetMensaje">Cargando traspaso...</div>
            <div v-else-if="error" class="DetMensaje">{{ error }}</div>
            <div v-else-if="traspaso" class="GridForm">
                <text>Comentarios: </text>
                <span>{{ traspaso.comentarios || '-' }}</span>

                <text>Estatus:</text>
                <div class="EstatusColumn">
                    <div class="estbox" :class="traspaso.estatus" data-cy="detalle-estatus">{{ traspaso.estatus }}</div>
                    <span>{{ ESTATUS_DESCRIPCION[traspaso.estatus] }}</span>
                </div>

                <text>Origen:</text>
                <span>{{ traspaso.origen }}</span>
                
                <text>Destino:</text>
                <span>{{ traspaso.destino }}</span>

                <text>Promesa de Entrega: </text>
                <span>{{ promesaLarga }}</span>

                <text>Creado Por:</text>
                <span>{{ traspaso.creado_por }}</span>

                <text>Fecha Creacion:</text>
                <span>{{ formatFechaHora(traspaso.fecha_creacion) }}</span>

                <text>Modificado Por:</text>
                <span>{{ traspaso.modificado_por }}</span>

                <text>Ultima Modificacion:</text>
                <span>{{ formatFechaHora(traspaso.fecha_modificacion) }}</span>
            </div>
        </div>
        <div v-if="traspaso" class="PrincDet">
            <div class="DetHeader">
                <span>{{ traspaso.detalles.length }} Productos</span>
            </div>
            <table class="TrasDetTab">
                <colgroup>
                    <col style="width: 3%;">
                    <col style="width: 14%;">
                    <col style="width: 13%;">
                    <col style="width: 20%;">
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
                        <th>Código Externo</th>
                        <th>Unidades en Existencia</th>
                        <th>Cantidad Solicitada</th>
                        <th>Cantidad Enviada</th>
                        <th>Cantidad Recibida</th>
                    </tr>
                </thead>
                <tbody class="TrasDetBody">
                    <tr v-for="(d, idx) in traspaso.detalles" :key="d.producto_id">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ d.codigo }}</td>
                        <td>{{ d.nombre }}</td>
                        <td>{{ d.descripcion }}</td>
                        <td>{{ d.codigo_externo }}</td>
                        <td>{{ d.existencia_origen }}</td>
                        <td>{{ d.cantidad_solicitada }}</td>
                        <td>{{ d.cantidad_enviada ?? '-' }}</td>
                        <td>{{ d.cantidad_recibida ?? '-' }}</td>
                    </tr>
                    <tr class="Totales">
                        <td colspan="5">Totales</td>
                        <td>{{ totales.existencia }}</td>
                        <td>{{ totales.solicitada }}</td>
                        <td>{{ totales.enviada }}</td>
                        <td>{{ totales.recibida }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTraspaso } from '../../../services/TraspasosServices'
import { parsearFechaUTC, parsearFechaCalendario, escapeHtml } from '../../../utils/formato'
import { ESTATUS_DESCRIPCION } from '../../../utils/traspasos'

const props = defineProps({
    traspasoId: { type: Number, required: true },
})

defineEmits(['cerrarm'])

const traspaso = ref(null)
const cargando = ref(false)
const error = ref(null)

const pad = (n) => String(n).padStart(2, '0')

const formatFechaHora = (valor) => {
    const d = parsearFechaUTC(valor)
    if (!d) return '-'
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const promesaLarga = computed(() => {
    const d = parsearFechaCalendario(traspaso.value?.promesa_entrega)
    if (!d) return 'Sin fecha'
    const texto = d.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    return texto.charAt(0).toUpperCase() + texto.slice(1)
})

const totales = computed(() => {
    const suma = (campo) => (traspaso.value?.detalles ?? []).reduce((acc, d) => acc + (d[campo] ?? 0), 0)
    return {
        existencia: suma('existencia_origen'),
        solicitada: suma('cantidad_solicitada'),
        enviada: suma('cantidad_enviada'),
        recibida: suma('cantidad_recibida'),
    }
})

const imprimir = () => {
    const t = traspaso.value
    const ventana = window.open('', '_blank')
    if (!t || !ventana) return

    const filas = t.detalles.map((d, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(d.codigo)}</td>
            <td>${escapeHtml(d.nombre)}</td>
            <td>${escapeHtml(d.codigo_externo)}</td>
            <td class="num">${d.cantidad_solicitada}</td>
            <td class="num">${d.cantidad_enviada ?? '-'}</td>
            <td class="num">${d.cantidad_recibida ?? '-'}</td>
        </tr>`).join('')

    ventana.document.write(`
        <html>
        <head>
            <title>Traspaso #${t.id}</title>
            <style>
                body { font-family: Arial, sans-serif; font-size: 12px; color: #000; margin: 20px; }
                h1 { font-size: 18px; margin: 0 0 10px; }
                .info { display: grid; grid-template-columns: 160px 1fr; gap: 4px 12px; margin-bottom: 16px; }
                .info b { text-align: right; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 4px 6px; text-align: left; }
                th { background: #eee; }
                .num { text-align: right; }
                .firmas { display: flex; justify-content: space-around; margin-top: 60px; }
                .firmas div { border-top: 1px solid #000; width: 35%; text-align: center; padding-top: 4px; }
            </style>
        </head>
        <body>
            <h1>Visual Optics — Traspaso #${t.id}</h1>
            <div class="info">
                <b>Estatus:</b><span>${escapeHtml(t.estatus)}</span>
                <b>Origen:</b><span>${escapeHtml(t.origen)}</span>
                <b>Destino:</b><span>${escapeHtml(t.destino)}</span>
                <b>Promesa de entrega:</b><span>${escapeHtml(promesaLarga.value)}</span>
                <b>Creado por:</b><span>${escapeHtml(t.creado_por)} — ${escapeHtml(formatFechaHora(t.fecha_creacion))}</span>
                <b>Última modificación:</b><span>${escapeHtml(t.modificado_por)} — ${escapeHtml(formatFechaHora(t.fecha_modificacion))}</span>
                <b>Comentarios:</b><span>${escapeHtml(t.comentarios || '-')}</span>
            </div>
            <table>
                <thead>
                    <tr><th>#</th><th>Código</th><th>Nombre</th><th>Código Externo</th><th>Solicitada</th><th>Enviada</th><th>Recibida</th></tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
            <div class="firmas"><div>Entrega</div><div>Recibe</div></div>
        </body>
        </html>
    `)
    ventana.document.close()
    ventana.focus()
    ventana.print()
}

onMounted(async () => {
    cargando.value = true
    try {
        traspaso.value = await getTraspaso(props.traspasoId)
    } catch (e) {
        error.value = e.message
    } finally {
        cargando.value = false
    }
})
</script>