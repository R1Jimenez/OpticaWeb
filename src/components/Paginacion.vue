<style scoped>
.Paginacion {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 6px 16px;
    border-top: 1px solid rgba(19, 3, 72, 0.15);
}

.PagInfo {
    font-size: 0.8rem;
    color: #6C757D;
}

.PagControles {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
}

.PagBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    height: 26px;
    padding: 0 6px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #130348;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
}

.PagBtn .material-icons {
    font-size: 18px;
}

.PagBtn:hover:not(:disabled):not(.activa) {
    background-color: rgba(19, 3, 72, 0.08);
}

.PagBtn.activa {
    background-color: #130348;
    color: white;
    font-weight: 600;
    cursor: default;
}

.PagBtn:disabled {
    opacity: 0.3;
    cursor: default;
}

.PagEllipsis {
    padding: 0 2px;
    font-size: 0.85rem;
    color: #6C757D;
}
</style>

<template>
    <div class="Paginacion">
        <span class="PagInfo">
            {{ rangoInicio }}–{{ rangoFin }} de {{ total }} {{ etiqueta }}
        </span>
        <div class="PagControles">
            <button class="PagBtn" :disabled="pagina === 1" title="Anterior" @click="irA(pagina - 1)">
                <span class="material-icons">chevron_left</span>
            </button>
            <template v-for="(p, idx) in paginasVisibles" :key="`${p}-${idx}`">
                <span v-if="p === '...'" class="PagEllipsis">…</span>
                <button
                    v-else
                    class="PagBtn"
                    :class="{ activa: p === pagina }"
                    @click="irA(p)"
                >{{ p }}</button>
            </template>
            <button class="PagBtn" :disabled="pagina === totalPaginas" title="Siguiente" @click="irA(pagina + 1)">
                <span class="material-icons">chevron_right</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    pagina: { type: Number, required: true },
    total: { type: Number, required: true },
    porPagina: { type: Number, default: 10 },
    etiqueta: { type: String, default: 'registros' },
})

const emit = defineEmits(['update:pagina'])

const totalPaginas = computed(() => Math.max(1, Math.ceil(props.total / props.porPagina)))
const rangoInicio = computed(() => (props.total === 0 ? 0 : (props.pagina - 1) * props.porPagina + 1))
const rangoFin = computed(() => Math.min(props.pagina * props.porPagina, props.total))

// Primera, última y vecinas de la actual; el resto se colapsa en '...'
const paginasVisibles = computed(() => {
    const total = totalPaginas.value
    const actual = props.pagina
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const paginas = [1]
    const desde = Math.max(2, actual - 1)
    const hasta = Math.min(total - 1, actual + 1)
    if (desde > 2) paginas.push('...')
    for (let p = desde; p <= hasta; p++) paginas.push(p)
    if (hasta < total - 1) paginas.push('...')
    paginas.push(total)
    return paginas
})

const irA = (p) => {
    const destino = Math.min(Math.max(1, p), totalPaginas.value)
    if (destino !== props.pagina) emit('update:pagina', destino)
}
</script>
