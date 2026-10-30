<style scoped>
.TipCliOverlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.TipCliModal {
    display: flex;
    flex-direction: column;
    width: 460px;
    max-width: 92vw;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.ModalHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: radial-gradient(
        ellipse at left,
        #130348 10%,
        #07072C 100%
    );
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

.ModalBody {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px 24px 8px;
}

.ModalBody p {
    margin: 0;
    color: #130348;
    font-size: 1rem;
    line-height: 1.4;
}

.Campo {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.Campo label {
    color: #130348;
    font-size: 0.95rem;
    font-weight: 600;
}

.Campo input {
    padding: 6px 12px;
    border: 1px solid #130348;
    border-radius: 10px;
    background: white;
    color: #130348;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
}

.Campo input:focus {
    border-width: 2px;
    padding: 5px 11px;
}

.Campo input.invalido {
    border-color: #FB1C2E;
}

.PctWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    width: 140px;
}

.PctWrap input {
    width: 100%;
    text-align: right;
}

.PctWrap span {
    color: #130348;
    font-weight: 600;
}

.CampoError,
.ModalError {
    color: #FB1C2E;
    font-size: 0.85rem;
    font-weight: 600;
}

.ModalFooter {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
    padding: 14px 24px 18px;
}

.BtnCancelar,
.BtnConfirmar {
    padding: 6px 18px;
    border-radius: 18px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
}

.BtnCancelar {
    background: radial-gradient(ellipse at center, #130348 10%, #07072C 100%);
    border: 1px solid white;
    color: white;
}

.BtnCancelar:hover {
    background: radial-gradient(ellipse at center, #F0F0F0 10%, #BCBCBC 100%);
    border-color: #130348;
    color: #130348;
}

.BtnConfirmar {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
    border: 1px solid white;
    color: white;
}

.BtnConfirmar.peligro {
    background: radial-gradient(ellipse at center, #FB1C2E 10%, #A70F1A 100%);
}

.BtnConfirmar:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>

<template>
    <div class="TipCliOverlay" @click.self="$emit('cerrar')">
        <div class="TipCliModal" role="dialog" aria-modal="true">
            <div class="ModalHeader">
                <span>{{ titulo }}</span>
                <button class="BtnCerrar" title="Cerrar" @click="$emit('cerrar')">
                    <span class="material-icons">close</span>
                </button>
            </div>

            <form v-if="!eliminar" class="ModalBody" novalidate @submit.prevent="guardar">
                <div class="Campo">
                    <label for="tipcli-nombre">Tipo de Cliente</label>
                    <input
                        id="tipcli-nombre"
                        ref="inputNombre"
                        v-model="nombre"
                        :class="{ invalido: errores.nombre }"
                        maxlength="100"
                        autocomplete="off"
                        data-cy="tipo-nombre"
                    />
                    <span v-if="errores.nombre" class="CampoError">{{ errores.nombre }}</span>
                </div>
                <div class="Campo">
                    <label for="tipcli-pct">Porcentaje de descuento</label>
                    <div class="PctWrap">
                        <input
                            id="tipcli-pct"
                            v-model.number="porcentaje"
                            :class="{ invalido: errores.porcentaje }"
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            data-cy="tipo-porcentaje"
                        />
                        <span>%</span>
                    </div>
                    <span v-if="errores.porcentaje" class="CampoError">{{ errores.porcentaje }}</span>
                </div>
                <span v-if="errorMsg" class="ModalError" data-cy="tipo-error">{{ errorMsg }}</span>
                <!-- permite guardar con Enter -->
                <button type="submit" hidden></button>
            </form>

            <div v-else class="ModalBody">
                <p>¿Deseas eliminar el tipo de cliente <strong>"{{ tipo.cliente }}"</strong>? Esta acción no se puede deshacer.</p>
                <span v-if="errorMsg" class="ModalError" data-cy="tipo-error">{{ errorMsg }}</span>
            </div>

            <div class="ModalFooter">
                <button class="BtnCancelar" @click="$emit('cerrar')">Cancelar</button>
                <button
                    class="BtnConfirmar"
                    :class="{ peligro: eliminar }"
                    :disabled="guardando"
                    data-cy="tipo-confirmar"
                    @click="eliminar ? confirmarEliminar() : guardar()"
                >
                    {{ textoConfirmar }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { createTipoCliente, updateTipoCliente, deleteTipoCliente } from '../../../services/TipoClienteServices'

const props = defineProps({
    // null = alta; con eliminar=true pide confirmacion para borrarlo
    tipo: { type: Object, default: null },
    eliminar: { type: Boolean, default: false },
})

const emit = defineEmits(['cerrar', 'guardado', 'eliminado'])

const inputNombre = ref(null)
const nombre = ref(props.tipo?.cliente ?? '')
const porcentaje = ref(props.tipo?.porcentaje_descuento ?? 0)
const errores = reactive({ nombre: null, porcentaje: null })
const errorMsg = ref(null)
const guardando = ref(false)

const titulo = computed(() => {
    if (props.eliminar) return 'Eliminar Tipo de Cliente'
    return props.tipo ? 'Modificar Tipo de Cliente' : 'Nuevo Tipo de Cliente'
})

const textoConfirmar = computed(() => {
    if (guardando.value) return props.eliminar ? 'Eliminando...' : 'Guardando...'
    return props.eliminar ? 'Eliminar' : 'Guardar'
})

const validar = () => {
    errores.nombre = nombre.value.trim() ? null : 'Ingresa el nombre del tipo de cliente'
    const pct = porcentaje.value
    errores.porcentaje = Number.isInteger(pct) && pct >= 0 && pct <= 100
        ? null
        : 'Ingresa un porcentaje entero entre 0 y 100'
    return !errores.nombre && !errores.porcentaje
}

const guardar = async () => {
    errorMsg.value = null
    if (guardando.value || !validar()) return
    guardando.value = true
    const payload = { cliente: nombre.value.trim(), porcentaje_descuento: porcentaje.value }
    try {
        const guardado = props.tipo
            ? await updateTipoCliente(props.tipo.id, payload)
            : await createTipoCliente(payload)
        emit('guardado', guardado)
    } catch (e) {
        errorMsg.value = e.message
    } finally {
        guardando.value = false
    }
}

const confirmarEliminar = async () => {
    errorMsg.value = null
    guardando.value = true
    try {
        await deleteTipoCliente(props.tipo.id)
        emit('eliminado', props.tipo)
    } catch (e) {
        errorMsg.value = e.message
    } finally {
        guardando.value = false
    }
}

onMounted(() => inputNombre.value?.focus())
</script>
