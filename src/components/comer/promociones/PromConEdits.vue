<style scoped>
.ContPrinc {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 20%;
    width: 98%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    padding-bottom: 1%;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: left;
    width: 100%;
    background: radial-gradient(
        ellipse at right,
        #130348 0%,
        #07072C 100%
    );
    padding-left: 1.5%;
    padding-top: .5%;
    gap: .5%;
}

.OpButton {
    width: auto;
    height: 80%;
    padding: 7px 7px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    cursor: pointer;
}

.OpButton:Hover {
    background: radial-gradient(
        ellipse at bottom,
        #230097 0%,
        #130348 100%
    );
}

.OpButton.active {
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
}

.OpButton text {
    font-size: 1.1rem;
    color: white;
}

.OpButton.active text {
    color: #130348;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="ContPrinc">
        <div class="header">
            <div
                v-for="op in opciones"
                :key="op"
                class="OpButton"
                :class="{ active: selectedOp === op}"
                @click="OpSelected(op)"
            >
                <text>{{ op }}</text>
            </div>
        </div>

        <PromSucEdits v-if="selectedOp === 'Sucursal'" />
        <PromTipVen v-else-if="selectedOp === 'Tipo de Venta'" />
        <PromProdEd v-else-if="selectedOp === 'Producto'" />
        <PromCliEd v-else-if="selectedOp === 'Cliente'" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import PromSucEdits from './PromSucEdits.vue'
import PromTipVen from './PromTipVen.vue'
import PromProdEd from './PromProdEd.vue'
import PromCliEd from './PromCliEd.vue'

const opciones = [
    'Sucursal',
    'Tipo de Venta',
    'Producto',
    'Cliente'
]

const selectedOp = ref('Sucursal')

const OpSelected = (op) => {
    selectedOp.value = op
}
</script>