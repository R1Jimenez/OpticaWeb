<style scoped>
.CritRow {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    gap: 40px;
    width: 100%;
    padding-top: 1.5%;
}

.CritTitulo {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.CritOpciones {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.CritOpcion {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    color: #130348;
    cursor: pointer;
    white-space: nowrap;
}

.CritOpcion input {
    accent-color: #130348;
    width: 16px;
    height: 16px;
    cursor: pointer;
}
</style>

<template>
    <div class="CritRow">
        <span class="CritTitulo">Tipo:</span>
        <div class="CritOpciones">
            <label v-for="op in opciones" :key="op.categoria" class="CritOpcion">
                <input
                    type="radio"
                    :name="`criterio-${grupo}`"
                    :value="op.categoria"
                    :checked="promo.criterios[grupo] === op.categoria"
                    :data-cy="`criterio-${op.categoria}`"
                    @click.prevent="cambiar(op.categoria)"
                />
                <span>{{ op.etiqueta }}</span>
            </label>
        </div>
    </div>
</template>

<script setup>
import { usePromocionStore } from '../../../stores/promocion'

const props = defineProps({
    grupo: { type: String, required: true },
    // [{ categoria, etiqueta }]
    opciones: { type: Array, required: true },
})

const promo = usePromocionStore()

const cambiar = (categoria) => {
    if (promo.criterios[props.grupo] === categoria) return
    const actual = props.opciones.find(o => o.categoria === promo.criterios[props.grupo])
    const capturados = promo.condiciones[actual.categoria].length
    if (capturados && !confirm(`Se quitarán los ${capturados} elementos agregados "${actual.etiqueta}". ¿Continuar?`)) return
    promo.cambiarCriterio(props.grupo, categoria)
}
</script>
