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

.FooterProm {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-top: 1.5%;
    padding: 10px 2% 0;
    border-top: 1px solid rgba(19, 3, 72, 0.15);
}

.EstadoProm {
    font-size: 0.95rem;
    color: #130348;
    font-weight: 600;
}

.Avisos {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 600;
}

.Avisos.error {
    color: #FB1C2E;
}

.Avisos.exito {
    color: #2E8B57;
}

.BtnGroup {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.BtnProm {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px 18px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid white;
    color: white;
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
}

.BtnProm.secundario {
    background: transparent;
    border-color: #130348;
    color: #130348;
}

.BtnProm:hover:not(:disabled) {
    filter: brightness(1.1);
}

.BtnProm:disabled {
    opacity: 0.5;
    cursor: default;
}

.BtnProm .material-icons {
    font-size: 20px;
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

        <div class="FooterProm">
            <span class="EstadoProm">{{ promo.id ? `Editando promoción #${promo.id}` : 'Nueva promoción' }}</span>
            <span v-if="aviso" class="Avisos" :class="aviso.tipo" data-cy="promo-aviso">{{ aviso.texto }}</span>
            <div class="BtnGroup">
                <button class="BtnProm secundario" :disabled="guardando" data-cy="promo-nueva" @click="nueva">
                    <span class="material-icons">add</span> Nueva
                </button>
                <button class="BtnProm" :disabled="guardando" data-cy="promo-guardar" @click="guardar">
                    <span class="material-icons">save</span> {{ promo.id ? 'Guardar Cambios' : 'Guardar Promoción' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import PromSucEdits from './PromSucEdits.vue'
import PromTipVen from './PromTipVen.vue'
import PromProdEd from './PromProdEd.vue'
import PromCliEd from './PromCliEd.vue'
import { usePromocionStore } from '../../../stores/promocion'

const promo = usePromocionStore()
const guardando = ref(false)
const aviso = ref(null)

const nueva = () => {
    promo.resetear()
    aviso.value = null
}

const guardar = async () => {
    const errores = promo.errores()
    if (errores.length) {
        aviso.value = { tipo: 'error', texto: errores.join('. ') }
        return
    }
    guardando.value = true
    aviso.value = null
    try {
        const eraNueva = !promo.id
        const guardada = await promo.guardar()
        if (eraNueva) {
            // al crear se limpia el formulario para capturar la siguiente
            promo.resetear()
            selectedOp.value = 'Sucursal'
        }
        aviso.value = {
            tipo: 'exito',
            texto: eraNueva ? `Promoción #${guardada.id} "${guardada.nombre}" creada correctamente` : 'Cambios guardados correctamente',
        }
    } catch (e) {
        aviso.value = { tipo: 'error', texto: e.message }
    } finally {
        guardando.value = false
    }
}

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