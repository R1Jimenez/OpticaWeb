<style scoped>
.TipCliTabla {
    width: 93%;
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

.TipCliTablHeader {
    width: 100%;
    padding: 10px 16px;
    background-color: #130348;
    border-bottom: 2px solid #FB1C2E;
}

.TipCliTablHeader span {
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.HeadTipCli tr {
    background-color: #F5F5F5;
}

.HeadTipCli th {
    padding: 8px 4px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 1px solid #130348;
}

.HeadTipCli th:first-child {
    text-align: left;
    padding-left: 12px;
}

.Ordenable {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;
    user-select: none;
}

.Ordenable .material-icons {
    font-size: 18px;
}

.bodyTipCli tr {
    transition: background 0.15s;
}

.bodyTipCli tr:hover { background-color: #FAFAFA; }

.bodyTipCli td {
    padding: 6px 10px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    border: 1px solid #130348;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.bodyTipCli td:first-child {
    text-align: left;
    padding-left: 12px;
}

.DescBox {
    display: inline-block;
    min-width: 56px;
    padding: 1px 10px;
    border-radius: 10px;
    background: radial-gradient(ellipse at center, #230097 10%, #130348 100%);
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
}

.DescBox.cero {
    background: radial-gradient(ellipse at center, #BCBCBC 10%, #9A9A9A 100%);
}

.butrow {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
}

.butrow button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 3px;
    border: 1px solid #130348;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 5%,
        #BCBCBC 100%
    );
    cursor: pointer;
}

.butrow button.eliminar {
    border-color: #FB1C2E;
}

.butrow button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.tipcli-empty {
    padding: 16px;
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
}
</style>

<template>
    <div class="TipCliTabla">
        <div class="TipCliTablHeader">
            <span>Mostrando Registros Disponibles</span>
        </div>
        <div v-if="isLoading" class="tipcli-empty">
            <div class="empty-box">Cargando tipos de cliente...</div>
        </div>
        <div v-else-if="errorMsg" class="tipcli-empty">
            <div class="empty-box">{{ errorMsg }}</div>
        </div>
        <div v-else-if="filtrados.length === 0" class="tipcli-empty">
            <div class="empty-box">
                {{ busqueda ? 'Ningún tipo de cliente coincide con la búsqueda' : 'No hay tipos de cliente registrados' }}
            </div>
        </div>
        <div v-else>
            <table>
                <colgroup>
                    <col style="width: 58%;">
                    <col style="width: 14%;">
                    <col style="width: 14%;">
                    <col style="width: 14%;">
                </colgroup>
                <thead class="HeadTipCli">
                    <tr>
                        <th>
                            <span class="Ordenable" data-cy="ordenar-nombre" @click="ordenar('cliente')">
                                Tipo de Cliente
                                <span class="material-icons">{{ iconoOrden('cliente') }}</span>
                            </span>
                        </th>
                        <th>
                            <span class="Ordenable" @click="ordenar('porcentaje_descuento')">
                                Descuento
                                <span class="material-icons">{{ iconoOrden('porcentaje_descuento') }}</span>
                            </span>
                        </th>
                        <th>Clientes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody class="bodyTipCli">
                    <tr v-for="t in visibles" :key="t.id" data-cy="tipo-cliente">
                        <td :title="t.cliente">{{ t.cliente }}</td>
                        <td>
                            <span class="DescBox" :class="{ cero: !t.porcentaje_descuento }">{{ t.porcentaje_descuento }}%</span>
                        </td>
                        <td>{{ t.clientes ?? 0 }}</td>
                        <td>
                            <div class="butrow">
                                <button title="Modificar" data-cy="modificar-tipo" @click="$emit('modificar', t)">
                                    <span class="material-icons" style="color:#130348; font-size:20px;">edit</span>
                                </button>
                                <button
                                    class="eliminar"
                                    data-cy="eliminar-tipo"
                                    :disabled="t.clientes > 0"
                                    :title="t.clientes > 0 ? `Asignado a ${t.clientes} cliente(s)` : 'Eliminar'"
                                    @click="$emit('eliminar', t)"
                                >
                                    <span class="material-icons" style="color:#FB1C2E; font-size:20px;">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Paginacion
            v-if="!isLoading && !errorMsg && filtrados.length > 0"
            v-model:pagina="pagina"
            :total="filtrados.length"
            :por-pagina="POR_PAGINA"
            etiqueta="tipos de cliente"
        />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Paginacion from '../../Paginacion.vue'

const POR_PAGINA = 15

const props = defineProps({
    tipos: { type: Array, default: () => [] },
    busqueda: { type: String, default: '' },
    isLoading: { type: Boolean, default: false },
    errorMsg: { type: String, default: null },
})

defineEmits(['modificar', 'eliminar'])

const pagina = ref(1)
const orden = ref({ campo: 'cliente', asc: true })

const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const filtrados = computed(() => {
    const q = normalizar(props.busqueda.trim())
    const lista = q ? props.tipos.filter(t => normalizar(t.cliente).includes(q)) : [...props.tipos]
    const { campo, asc } = orden.value
    const comparar = campo === 'cliente'
        ? (a, b) => a.cliente.localeCompare(b.cliente, 'es', { numeric: true, sensitivity: 'base' })
        : (a, b) => a[campo] - b[campo] || a.cliente.localeCompare(b.cliente, 'es')
    return lista.sort((a, b) => (asc ? comparar(a, b) : comparar(b, a)))
})

const visibles = computed(() => filtrados.value.slice((pagina.value - 1) * POR_PAGINA, pagina.value * POR_PAGINA))

const ordenar = (campo) => {
    orden.value = { campo, asc: orden.value.campo === campo ? !orden.value.asc : true }
}

const iconoOrden = (campo) => {
    if (orden.value.campo !== campo) return 'unfold_more'
    return orden.value.asc ? 'arrow_drop_up' : 'arrow_drop_down'
}

watch(() => [props.busqueda, orden.value], () => { pagina.value = 1 })

// tras eliminar el ultimo registro de la pagina, regresa a una pagina valida
watch(() => filtrados.value.length, (total) => {
    const ultima = Math.max(1, Math.ceil(total / POR_PAGINA))
    if (pagina.value > ultima) pagina.value = ultima
})
</script>
