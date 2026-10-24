<style scoped>
.CobOpsPrincipal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 25%;
    flex-shrink: 0;
    width: 98%;
    background: radial-gradient(
        ellipse at top,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
}

.CobOpsContenido {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1% 0;
}

.CobOpsRowOps {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: left;
    height: 46px;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: radial-gradient(
        ellipse at right,
        #130348 0%,
        #07072C 100%
    );
    padding-left: 1.5%;
    gap: .5%;
    flex-shrink: 0;
}

.CobOpsOpButtonCob {
    width: auto;
    height: 80%;
    padding: 1px 7px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    cursor: pointer;
}

.CobOpsOpButtonCob:Hover {
    background: radial-gradient(
        ellipse at bottom,
        #230097 0%,
        #130348 100%
    );
}

.CobOpsOpButtonCob.active {
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
}

.CobOpsOpButtonCob text {
    font-size: 1.1rem;
    color: white;
}

.CobOpsOpButtonCob.active text {
    color: #130348;
}

.CobOpsTotalRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding-right: 2%;
    height: 56px;
    width: 100%;
    flex-shrink: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top: 2px solid #130348;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    gap: 1%;
}

.CobOpsTotalRow text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
}

.CobOpsTotalRow span {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
}

.CobOpsTotalRow button {
    padding: 7px 10px;
    border-radius: 10px;
    border: 1.5px solid #130348;
    color: #130348;
    font-size: 1rem;
    background-color: greenyellow;
    cursor: pointer;
}

.CobOpsTotalRow button:disabled {
    opacity: 0.5;
    cursor: default;
}
</style>

<template>
    <div class="CobOpsPrincipal">
        <div class="CobOpsRowOps">
            <div
                v-for="op in opciones"
                :key="op"
                class="CobOpsOpButtonCob"
                :class="{ active: modelValue === op }"
                @click="OpSelected(op)"
            >
                <text>{{ op }}</text>
            </div>
        </div>

        <div class="CobOpsContenido" v-if="modelValue === 'En Espera'">
            <EnEspera @clienteSeleccionado="emit('clienteSeleccionado', $event)" />
        </div>

        <div class="CobOpsContenido" v-if="modelValue === 'Pago Inicial' && cliente">
            <PagoInicial :cliente="cliente" />
        </div>

        <div class="CobOpsContenido" v-if="modelValue === 'Cuentas Por Cobrar'">
            <CuentasPorCobrar ref="cuentasRef" :cliente="cliente" @update:total="totalGlobal = $event" />
        </div>

        <div class="CobOpsTotalRow">
            <text>
                Total Global
            </text>
            <span>{{ formatearMoneda(totalGlobal) }}</span>
            <button :disabled="!puedeAceptar" @click="aceptar">
                Aceptar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PagoInicial from './opcionescobrar/PagoInicial.vue'
import EnEspera from './opcionescobrar/EnEspera.vue'
import CuentasPorCobrar from './opcionescobrar/CuentasPorCobrar.vue'
import { formatearMoneda } from '../../../utils/formato'

const props = defineProps({
    modelValue: {
        type: String,
        default: null
    },
    cliente: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['update:modelValue', 'clienteSeleccionado'])

const opciones = [
    'En Espera',
    'Pago Inicial',
    'Pagos Parciales',
    'Cuentas Por Cobrar',
    'Liquidaciones',
    'Cancelaciones',
    'Devoluciones',
]

const OpSelected = (op) => {
    emit('update:modelValue', op)
}

const cuentasRef = ref(null)
const totalGlobal = ref(0)

const puedeAceptar = computed(() =>
    props.modelValue === 'Cuentas Por Cobrar' && totalGlobal.value > 0 && !cuentasRef.value?.procesando
)

watch(() => props.modelValue, () => {
    totalGlobal.value = 0
})

const aceptar = async () => {
    if (props.modelValue === 'Cuentas Por Cobrar') {
        await cuentasRef.value?.aplicar()
    }
}
</script>