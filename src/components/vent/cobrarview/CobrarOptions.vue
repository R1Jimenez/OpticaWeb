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

        <div class="CobOpsContenido" v-if="modelValue === 'Pago Inicial' && cliente">
            <PagoInicial :cliente="cliente" />
        </div>

        <div class="CobOpsTotalRow">
            <text>
                Total Global
            </text>
            <span>$0.00</span>
            <button>
                Aceptar
            </button>
        </div>
    </div>
</template>

<script setup>
import PagoInicial from './opcionescobrar/PagoInicial.vue'

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

const emit = defineEmits(['update:modelValue'])

const opciones = [
    'En Espera',
    'Pago Inicial',
    'Pagos Principales',
    'Cuentas Por Cobrar',
    'Liquidaciones',
    'Cancelaciones',
    'Devoluciones',
]

const OpSelected = (op) => {
    emit('update:modelValue', op)
}
</script>