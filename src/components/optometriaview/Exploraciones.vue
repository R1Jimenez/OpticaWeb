<style scoped>
.notebook-wrapper {
    position: relative;
    width: 93%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.notebook-container {
    background-color: #F0F0F0;
    border: 2px solid #FB1C2E;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

/* ── Header ── */
.notebook-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    border-bottom: 1px solid #BCBCBC;
}

.header-icon {
    color: #130348;
    font-size: 24px;
    flex-shrink: 0;
}

.header-title {
    flex: 1;
    font-size: 1.125rem;
    font-weight: 700;
    color: #130348;
}

.notebook-header.clickable {
    cursor: pointer;
    transition: background 0.15s;
}

.notebook-header.clickable:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.chevron-icon {
    color: #130348;
    font-size: 28px;
    transition: transform 0.2s;
}

.chevron-icon.rotated { transform: rotate(180deg); }

.FoGrid {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
    margin-left: 30px;
    margin-bottom: 16px;
}

.FoGrid text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.FoGrid span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.CliBars {
    width: 60%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.NotebookTop {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0 0 30px;
}

.NotebookSelect {
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.NotebookTop span {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.FoCols {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 90%;
    margin-left: 30px;
    gap: 4%;
}

.FoCols .FoGrid {
    width: 100%;
    margin-left: 0;
}

.CliBarsArea {
    width: 60%;
    height: 70px;
    resize: vertical;
    font-family: inherit;
}

.OdOiRow {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}

.OdOiRow input {
    flex: 1;
    min-width: 0;
}

.AvRow {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}

.AvRow input {
    flex: 1;
    min-width: 60px;
}

.NotebookButtons {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin: 8px 0 20px 30px;
}

.NotebookButtons button {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 15px;
    padding: 6px 18px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
}

.btn-agregar {
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    color: white;
}

.btn-cancelar {
    background: #6C757D;
    border: none;
    color: white;
}
</style>

<template>
    <div class="notebook-wrapper" v-if="paciente">
        <div class="notebook-container">

            <!-- Header -->
            <div class="notebook-header clickable" @click="toggleExpanded">
                <span class="material-icons header-icon">assignment</span>
                <span class="header-title">
                    Exploraciones del Paciente: {{ paciente.nombres }} {{ paciente.apellidos }}
                </span>
                <span class="material-icons chevron-icon" :class="{ rotated: isExpanded }">
                    keyboard_arrow_down
                </span>
            </div>

            <template v-if="isExpanded">
                <div class="NotebookTop">
                    <select class="NotebookSelect" v-model="exploracionSeleccionadaIdx">
                        <option :value="null">(Seleccionar Fecha Exploración)</option>
                        <option v-for="(exploracion, idx) in exploraciones" :key="exploracion.id" :value="idx">
                            {{ formatFecha(exploracion.fecha) }}
                        </option>
                    </select>
                    <span>({{ exploraciones.length }})</span>
                </div>

                <div v-if="errorMsg" style="color:#FB1C2E; margin: 0 0 10px 30px; font-weight: 600;">
                    {{ errorMsg }}
                </div>

                <div class="FoCols">
                    <div class="FoGrid">
                        <template v-for="campo in camposIzquierda" :key="campo.key">
                            <text>{{ campo.label }}:</text>
                            <input
                                v-if="campo.type === 'text'"
                                type="text"
                                class="CliBars"
                                v-model="formData[campo.key]"
                                autocomplete="off"
                            />
                            <textarea
                                v-else-if="campo.type === 'textarea'"
                                class="CliBarsArea"
                                v-model="formData[campo.key]"
                            ></textarea>
                            <div v-else class="OdOiRow">
                                <span>O.D.</span>
                                <input type="text" class="CliBars" v-model="formData[campo.key].od" autocomplete="off" />
                                <span>O.I.</span>
                                <input type="text" class="CliBars" v-model="formData[campo.key].oi" autocomplete="off" />
                            </div>
                        </template>
                    </div>

                    <div class="FoGrid">
                        <template v-for="campo in camposDerecha" :key="campo.key">
                            <text>{{ campo.label }}:</text>
                            <input
                                v-if="campo.type === 'text'"
                                type="text"
                                class="CliBars"
                                v-model="formData[campo.key]"
                                autocomplete="off"
                            />
                            <div v-else class="AvRow">
                                <span>O.D. 20/</span>
                                <input type="text" class="CliBars" v-model="formData[campo.key].od" autocomplete="off" />
                                <span>O.I. 20/</span>
                                <input type="text" class="CliBars" v-model="formData[campo.key].oi" autocomplete="off" />
                            </div>
                        </template>
                    </div>
                </div>

                <div class="NotebookButtons">
                    <button class="btn-agregar" @click="agregarExploracion" :disabled="enviando">
                        {{ enviando ? 'Guardando...' : 'Agregar' }}
                    </button>
                    <button class="btn-cancelar" @click="cancelarExploracion">Cancelar</button>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { createExploracion, getExploracionesByPaciente } from '../../services/ExploracionesServices'

const props = defineProps({
    paciente: { type: Object, default: null }
})

const isExpanded = ref(false)
const toggleExpanded = () => { isExpanded.value = !isExpanded.value }

const camposIzquierda = [
    { key: 'conjuntivaParpado', label: 'Conjuntiva y Párpado', type: 'text' },
    { key: 'viasLacrimal', label: 'Vías Lacrimales', type: 'text' },
    { key: 'pterigion', label: 'Pterigion y Subpterigion', type: 'text' },
    { key: 'agudezaVisual', label: 'Agudeza Visual', type: 'text' },
    { key: 'bicromatica', label: 'Bicromatica', type: 'text' },
    { key: 'esquiascopia', label: 'Esquiascopia', type: 'text' },
    { key: 'oftalmoscopia', label: 'Oftalmoscopia', type: 'text' },
    { key: 'queratometria', label: 'Queratometria', type: 'od-oi' },
    { key: 'lecturaRefractometro', label: 'Lectura de Refractometro', type: 'od-oi' },
    { key: 'lecturaGraduacion', label: 'Lectura Graduacion Anterior', type: 'od-oi' },
]

const camposDerecha = [
    { key: 'reflectividad', label: 'Reflictividad', type: 'text' },
    { key: 'motilidad', label: 'Motilidad', type: 'text' },
    { key: 'avCon', label: 'A/V con', type: 'av' },
    { key: 'avSin', label: 'A/V sin', type: 'av' },
]

const formDataInicial = () => ({
    conjuntivaParpado: '',
    viasLacrimal: '',
    pterigion: '',
    agudezaVisual: '',
    bicromatica: '',
    esquiascopia: '',
    oftalmoscopia: '',
    queratometria: { od: '', oi: '' },
    lecturaRefractometro: { od: '', oi: '' },
    lecturaGraduacion: { od: '', oi: '' },
    reflectividad: '',
    motilidad: '',
    avCon: { od: '', oi: '' },
    avSin: { od: '', oi: '' },
})

const formData = reactive(formDataInicial())

const exploraciones = ref([])
const exploracionSeleccionadaIdx = ref(null)
const enviando = ref(false)
const errorMsg = ref('')

const formatFecha = (fecha) => new Date(fecha).toLocaleString()

const cargarExploraciones = async () => {
    if (!props.paciente?.id) {
        exploraciones.value = []
        return
    }
    try {
        exploraciones.value = await getExploracionesByPaciente(props.paciente.id)
    } catch (e) {
        exploraciones.value = []
        errorMsg.value = e.message
    }
}

onMounted(cargarExploraciones)

watch(() => props.paciente?.id, () => {
    exploracionSeleccionadaIdx.value = null
    Object.assign(formData, formDataInicial())
    cargarExploraciones()
})

// Al elegir una fecha del historial, se muestran sus datos en el formulario
watch(exploracionSeleccionadaIdx, (idx) => {
    if (idx === null || idx === undefined || !exploraciones.value[idx]) {
        Object.assign(formData, formDataInicial())
        return
    }
    const exploracion = exploraciones.value[idx]
    Object.assign(formData, {
        conjuntivaParpado: exploracion.conjuntiva_parpado || '',
        viasLacrimal: exploracion.vias_lacrimal || '',
        pterigion: exploracion.pterigion || '',
        agudezaVisual: exploracion.agudeza_visual || '',
        bicromatica: exploracion.bicromatica || '',
        esquiascopia: exploracion.esquiascopia || '',
        oftalmoscopia: exploracion.oftalmoscopia || '',
        queratometria: { od: exploracion.queratometria_od || '', oi: exploracion.queratometria_oi || '' },
        lecturaRefractometro: { od: exploracion.lectura_refractometro_od || '', oi: exploracion.lectura_refractometro_oi || '' },
        lecturaGraduacion: { od: exploracion.lectura_graduacion_od || '', oi: exploracion.lectura_graduacion_oi || '' },
        reflectividad: exploracion.reflectividad || '',
        motilidad: exploracion.motilidad || '',
        avCon: { od: exploracion.av_con_od || '', oi: exploracion.av_con_oi || '' },
        avSin: { od: exploracion.av_sin_od || '', oi: exploracion.av_sin_oi || '' },
    })
})

const construirPayloadExploracion = () => ({
    paciente_id: props.paciente.id,
    conjuntiva_parpado: formData.conjuntivaParpado || null,
    vias_lacrimal: formData.viasLacrimal || null,
    pterigion: formData.pterigion || null,
    agudeza_visual: formData.agudezaVisual || null,
    bicromatica: formData.bicromatica || null,
    esquiascopia: formData.esquiascopia || null,
    oftalmoscopia: formData.oftalmoscopia || null,
    queratometria_od: formData.queratometria.od || null,
    queratometria_oi: formData.queratometria.oi || null,
    lectura_refractometro_od: formData.lecturaRefractometro.od || null,
    lectura_refractometro_oi: formData.lecturaRefractometro.oi || null,
    lectura_graduacion_od: formData.lecturaGraduacion.od || null,
    lectura_graduacion_oi: formData.lecturaGraduacion.oi || null,
    reflectividad: formData.reflectividad || null,
    motilidad: formData.motilidad || null,
    av_con_od: formData.avCon.od || null,
    av_con_oi: formData.avCon.oi || null,
    av_sin_od: formData.avSin.od || null,
    av_sin_oi: formData.avSin.oi || null,
})

const agregarExploracion = async () => {
    if (!props.paciente?.id) return
    errorMsg.value = ''
    enviando.value = true
    try {
        const creada = await createExploracion(construirPayloadExploracion())
        exploraciones.value.push(creada)
        Object.assign(formData, formDataInicial())
        exploracionSeleccionadaIdx.value = null
    } catch (e) {
        errorMsg.value = e.message
    } finally {
        enviando.value = false
    }
}

const cancelarExploracion = () => {
    Object.assign(formData, formDataInicial())
    exploracionSeleccionadaIdx.value = null
}
</script>