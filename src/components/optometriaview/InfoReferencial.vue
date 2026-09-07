<style scoped>
.notebook-wrapper {
    position: relative;
    width: 93%;
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

.InfoSectionTitle {
    font-size: 1.2rem;
    font-weight: 700;
    color: #130348;
    margin: 20px 0 10px 30px;
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

.CliBarsArea {
    width: 90%;
    height: 70px;
    resize: vertical;
    font-family: inherit;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 1rem;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.InfoRow {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 90%;
    margin-left: 30px;
    margin-bottom: 12px;
}

.InfoRow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    flex-shrink: 0;
}

.InfoRowDouble {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 90%;
    margin-left: 30px;
    gap: 4%;
    margin-bottom: 12px;
}

.InfoRowDouble .InfoRow {
    width: 100%;
    margin-left: 0;
}

/* ── Tabla estilo refracción ── */
.InfoTable {
    border-collapse: collapse;
    margin: 0 0 10px 30px;
    width: 90%;
}

.InfoTable th {
    font-size: 0.95rem;
    font-weight: 700;
    color: #130348;
    padding: 4px 8px;
    text-align: center;
}

.InfoRowLabel {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
    white-space: nowrap;
    padding-right: 10px;
}

.InfoTable td {
    padding: 4px 6px;
    text-align: center;
}

.InfoTable select,
.InfoTable input {
    width: 80px;
    padding: 5px 8px;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 0.9rem;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.InfoDI {
    display: flex;
    flex-direction: column;
    gap: 6px;
    vertical-align: middle;
}

.InfoDIItem {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
}

.InfoDIItem span {
    font-size: 0.9rem;
    font-weight: 700;
    color: #130348;
}

.InfoDIItem input {
    width: 70px;
}

/* ── Trío de columnas: hidrofílico / rígido / medidas ── */
.InfoTriRow {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 90%;
    margin-left: 30px;
    gap: 3%;
    margin-bottom: 10px;
}

.InfoTriCol {
    flex: 1;
    min-width: 0;
}

.InfoTriCol .InfoTable,
.InfoTriCol .InfoRow {
    width: 100%;
    margin-left: 0;
}

.InfoTriCol .InfoSectionTitle {
    margin-left: 0;
    font-size: 1rem;
}

.MedidasGrid {
    display: grid;
    grid-template-columns: auto 1fr auto 1fr;
    gap: 8px;
    align-items: center;
}

.MedidasGrid span {
    font-size: 0.95rem;
    font-weight: 700;
    color: #130348;
}

.MedidasGrid input {
    width: 100%;
    padding: 5px 8px;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 0.9rem;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

/* ── Checkboxes ── */
.InfoCheckboxRow {
    display: flex;
    align-items: center;
    gap: 24px;
    width: 90%;
    margin: 6px 0 16px 30px;
    flex-wrap: wrap;
}

.InfoCheckbox {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
    cursor: pointer;
}

.InfoCheckboxRight {
    margin-left: auto;
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
                <span class="material-icons header-icon">info</span>
                <span class="header-title">
                    Info. Referencial del Paciente: {{ paciente.nombres }} {{ paciente.apellidos }}
                </span>
                <span class="material-icons chevron-icon" :class="{ rotated: isExpanded }">
                    keyboard_arrow_down
                </span>
            </div>

            <template v-if="isExpanded">
                <div class="NotebookTop">
                    <select class="NotebookSelect" v-model="examenSeleccionadoIdx">
                        <option :value="null">(Seleccionar Fecha Exámen)</option>
                        <option v-for="(examen, idx) in examenes" :key="examen.id" :value="idx">
                            {{ formatFecha(examen.fecha) }}
                        </option>
                    </select>
                    <span>({{ examenes.length }})</span>
                </div>

                <div v-if="errorMsg" style="color:#FB1C2E; margin: 0 0 10px 30px; font-weight: 600;">
                    {{ errorMsg }}
                </div>

                <div class="InfoSectionTitle">RESULTADO DE REFRACCION TOTAL:</div>

                <div class="InfoRowDouble">
                    <div class="InfoRow">
                        <text>Tipo de Referencia:</text>
                        <select class="NotebookSelect" v-model="formData.tipoReferencia">
                            <option value="">(Seleccionar Tipo Referencia)</option>
                            <option v-for="opcion in opcionesTipoReferencia" :key="opcion" :value="opcion">
                                {{ opcion }}
                            </option>
                        </select>
                    </div>
                    <div class="InfoRow">
                        <text>Notas:</text>
                        <textarea class="CliBarsArea" v-model="formData.notas"></textarea>
                    </div>
                </div>

                <table class="InfoTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Esfera</th>
                            <th>Cilindro</th>
                            <th>Eje</th>
                            <th>Adición</th>
                            <th>A/V</th>
                            <th>D.I.</th>
                            <th>DNP</th>
                            <th>Prisma</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="InfoRowLabel">Ojo Derecho:</td>
                            <td>
                                <select v-model="formData.refraccion.od.esfera">
                                    <option v-for="op in opcionesEsfera" :key="op" :value="op">{{ op }}</option>
                                </select>
                            </td>
                            <td>
                                <select v-model="formData.refraccion.od.cilindro">
                                    <option v-for="op in opcionesCilindro" :key="op" :value="op">{{ op }}</option>
                                </select>
                            </td>
                            <td><input type="text" v-model="formData.refraccion.od.eje" autocomplete="off" /></td>
                            <td>
                                <select v-model="formData.refraccion.od.adicion">
                                    <option v-for="op in opcionesAdicion" :key="op" :value="op">{{ op }}</option>
                                </select>
                            </td>
                            <td><input type="text" v-model="formData.refraccion.od.av" autocomplete="off" /></td>
                            <td rowspan="2">
                                <div class="InfoDI">
                                    <div class="InfoDIItem">
                                        <span>C</span>
                                        <input type="text" v-model="formData.refraccion.diC" autocomplete="off" />
                                    </div>
                                    <div class="InfoDIItem">
                                        <span>L</span>
                                        <input type="text" v-model="formData.refraccion.diL" autocomplete="off" />
                                    </div>
                                </div>
                            </td>
                            <td><input type="text" v-model="formData.refraccion.od.dnp" autocomplete="off" /></td>
                            <td><input type="text" v-model="formData.refraccion.od.prisma" autocomplete="off" /></td>
                        </tr>
                        <tr>
                            <td class="InfoRowLabel">Ojo Izquierdo:</td>
                            <td>
                                <select v-model="formData.refraccion.oi.esfera">
                                    <option v-for="op in opcionesEsfera" :key="op" :value="op">{{ op }}</option>
                                </select>
                            </td>
                            <td>
                                <select v-model="formData.refraccion.oi.cilindro">
                                    <option v-for="op in opcionesCilindro" :key="op" :value="op">{{ op }}</option>
                                </select>
                            </td>
                            <td><input type="text" v-model="formData.refraccion.oi.eje" autocomplete="off" /></td>
                            <td>
                                <select v-model="formData.refraccion.oi.adicion">
                                    <option v-for="op in opcionesAdicion" :key="op" :value="op">{{ op }}</option>
                                </select>
                            </td>
                            <td><input type="text" v-model="formData.refraccion.oi.av" autocomplete="off" /></td>
                            <td><input type="text" v-model="formData.refraccion.oi.dnp" autocomplete="off" /></td>
                            <td><input type="text" v-model="formData.refraccion.oi.prisma" autocomplete="off" /></td>
                        </tr>
                    </tbody>
                </table>

                <div class="InfoTriRow">
                    <div class="InfoTriCol">
                        <div class="InfoSectionTitle">CALCULO PARA L/C HIDROFILICO</div>
                        <table class="InfoTable">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Esfera</th>
                                    <th>Cilindro</th>
                                    <th>Eje</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="InfoRowLabel">O.D.</td>
                                    <td>
                                        <select v-model="formData.hidrofilico.od.esfera">
                                            <option v-for="op in opcionesEsfera" :key="op" :value="op">{{ op }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select v-model="formData.hidrofilico.od.cilindro">
                                            <option v-for="op in opcionesCilindro" :key="op" :value="op">{{ op }}</option>
                                        </select>
                                    </td>
                                    <td><input type="text" v-model="formData.hidrofilico.od.eje" autocomplete="off" /></td>
                                </tr>
                                <tr>
                                    <td class="InfoRowLabel">O.I.</td>
                                    <td>
                                        <select v-model="formData.hidrofilico.oi.esfera">
                                            <option v-for="op in opcionesEsfera" :key="op" :value="op">{{ op }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select v-model="formData.hidrofilico.oi.cilindro">
                                            <option v-for="op in opcionesCilindro" :key="op" :value="op">{{ op }}</option>
                                        </select>
                                    </td>
                                    <td><input type="text" v-model="formData.hidrofilico.oi.eje" autocomplete="off" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="InfoTriCol">
                        <div class="InfoSectionTitle">CALCULO PARA LENTE RIGIDO</div>
                        <table class="InfoTable">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>CB</th>
                                    <th>RX</th>
                                    <th>Diam</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="InfoRowLabel">O.D.</td>
                                    <td><input type="text" v-model="formData.rigido.od.cb" autocomplete="off" /></td>
                                    <td><input type="text" v-model="formData.rigido.od.rx" autocomplete="off" /></td>
                                    <td><input type="text" v-model="formData.rigido.od.diam" autocomplete="off" /></td>
                                </tr>
                                <tr>
                                    <td class="InfoRowLabel">O.I.</td>
                                    <td><input type="text" v-model="formData.rigido.oi.cb" autocomplete="off" /></td>
                                    <td><input type="text" v-model="formData.rigido.oi.rx" autocomplete="off" /></td>
                                    <td><input type="text" v-model="formData.rigido.oi.diam" autocomplete="off" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="InfoRow">
                            <text>Material:</text>
                            <input type="text" class="CliBars" v-model="formData.rigido.material" autocomplete="off" />
                        </div>
                    </div>

                    <div class="InfoTriCol">
                        <div class="InfoSectionTitle">MEDIDAS (mm)</div>
                        <div class="InfoRow">
                            <text>Altura:</text>
                            <input type="text" class="CliBars" v-model="formData.medidas.altura" autocomplete="off" />
                        </div>
                        <div class="MedidasGrid">
                            <span>A</span>
                            <input type="text" v-model="formData.medidas.a" autocomplete="off" />
                            <span>ED</span>
                            <input type="text" v-model="formData.medidas.ed" autocomplete="off" />
                            <span>B</span>
                            <input type="text" v-model="formData.medidas.b" autocomplete="off" />
                            <span>DBL</span>
                            <input type="text" v-model="formData.medidas.dbl" autocomplete="off" />
                        </div>
                    </div>
                </div>

                <div class="InfoCheckboxRow">
                    <label class="InfoCheckbox">
                        <input type="checkbox" v-model="formData.esferico" /> Esférico:
                    </label>
                    <label class="InfoCheckbox">
                        <input type="checkbox" v-model="formData.torico" /> Tórico:
                    </label>
                    <label class="InfoCheckbox">
                        <input type="checkbox" v-model="formData.gp" /> GP:
                    </label>
                    <label class="InfoCheckbox InfoCheckboxRight">
                        Con conocimiento del paciente:
                        <input type="checkbox" v-model="formData.conConocimiento" />
                    </label>
                </div>

                <div class="InfoRow">
                    <text>Motivo:</text>
                    <textarea class="CliBarsArea" v-model="formData.motivo"></textarea>
                </div>

                <div class="InfoRow">
                    <text>Optometrista:</text>
                    <input type="text" class="CliBars" style="width: 90%" v-model="formData.optometrista" autocomplete="off" />
                </div>

                <div class="NotebookButtons">
                    <button class="btn-agregar" @click="agregarInfo" :disabled="enviando">
                        {{ enviando ? 'Guardando...' : 'Agregar' }}
                    </button>
                    <button class="btn-cancelar" @click="cancelarInfo">Cancelar</button>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import {
    createInfoReferencial,
    getInfoReferencialByPaciente,
} from '../../services/InfoReferencialServices'

const props = defineProps({
    paciente: { type: Object, default: null },
    clienteId: { type: Number, default: null },
})

const isExpanded = ref(false)
const toggleExpanded = () => { isExpanded.value = !isExpanded.value }

const opcionesTipoReferencia = ['Datos de autorefractor', 'Datos de Archivo', 'Lectura Lente Anterior', 'Nueva RX']

const generarRangoDiop = (min, max, step = 0.25) => {
    const opciones = []
    for (let v = min; v <= max + 1e-9; v += step) {
        const val = Math.round(v * 100) / 100
        const signo = val > 0 ? '+' : ''
        opciones.push(`${signo}${val.toFixed(2)}`)
    }
    return opciones
}

const opcionesEsfera = generarRangoDiop(-20, 20)
const opcionesCilindro = generarRangoDiop(-10, 10)
const opcionesAdicion = generarRangoDiop(0, 4)

const ojoVacio = () => ({ esfera: '0.00', cilindro: '0.00', eje: '', adicion: '0.00', av: '', dnp: '', prisma: '' })
const hidrofilicoOjoVacio = () => ({ esfera: '0.00', cilindro: '0.00', eje: '' })
const rigidoOjoVacio = () => ({ cb: '', rx: '', diam: '' })

const formDataInicial = () => ({
    tipoReferencia: '',
    notas: '',
    refraccion: {
        od: ojoVacio(),
        oi: ojoVacio(),
        diC: '',
        diL: '',
    },
    hidrofilico: {
        od: hidrofilicoOjoVacio(),
        oi: hidrofilicoOjoVacio(),
    },
    rigido: {
        od: rigidoOjoVacio(),
        oi: rigidoOjoVacio(),
        material: '',
    },
    medidas: { altura: '', a: '', ed: '', b: '', dbl: '' },
    esferico: false,
    torico: false,
    gp: false,
    conConocimiento: false,
    motivo: '',
    optometrista: '',
})

const formData = reactive(formDataInicial())

const examenes = ref([])
const examenSeleccionadoIdx = ref(null)
const enviando = ref(false)
const errorMsg = ref('')

const formatFecha = (fecha) => new Date(fecha).toLocaleString()

const cargarExamenes = async () => {
    if (!props.paciente?.id) {
        examenes.value = []
        return
    }
    try {
        examenes.value = await getInfoReferencialByPaciente(props.paciente.id)
    } catch (e) {
        examenes.value = []
        errorMsg.value = e.message
    }
}

onMounted(cargarExamenes)

watch(() => props.paciente?.id, () => {
    examenSeleccionadoIdx.value = null
    Object.assign(formData, formDataInicial())
    cargarExamenes()
})

// Al elegir una fecha del historial, se muestran sus datos en el formulario
watch(examenSeleccionadoIdx, (idx) => {
    if (idx === null || idx === undefined || !examenes.value[idx]) {
        Object.assign(formData, formDataInicial())
        return
    }
    const examen = examenes.value[idx]
    Object.assign(formData, {
        tipoReferencia: examen.tipo_referencia || '',
        notas: examen.notas || '',
        refraccion: {
            od: {
                esfera: examen.refraccion_od_esfera || '0.00',
                cilindro: examen.refraccion_od_cilindro || '0.00',
                eje: examen.refraccion_od_eje || '',
                adicion: examen.refraccion_od_adicion || '0.00',
                av: examen.refraccion_od_av || '',
                dnp: examen.refraccion_od_dnp || '',
                prisma: examen.refraccion_od_prisma || '',
            },
            oi: {
                esfera: examen.refraccion_oi_esfera || '0.00',
                cilindro: examen.refraccion_oi_cilindro || '0.00',
                eje: examen.refraccion_oi_eje || '',
                adicion: examen.refraccion_oi_adicion || '0.00',
                av: examen.refraccion_oi_av || '',
                dnp: examen.refraccion_oi_dnp || '',
                prisma: examen.refraccion_oi_prisma || '',
            },
            diC: examen.refraccion_di_c || '',
            diL: examen.refraccion_di_l || '',
        },
        hidrofilico: {
            od: {
                esfera: examen.hidrofilico_od_esfera || '0.00',
                cilindro: examen.hidrofilico_od_cilindro || '0.00',
                eje: examen.hidrofilico_od_eje || '',
            },
            oi: {
                esfera: examen.hidrofilico_oi_esfera || '0.00',
                cilindro: examen.hidrofilico_oi_cilindro || '0.00',
                eje: examen.hidrofilico_oi_eje || '',
            },
        },
        rigido: {
            od: {
                cb: examen.rigido_od_cb || '',
                rx: examen.rigido_od_rx || '',
                diam: examen.rigido_od_diam || '',
            },
            oi: {
                cb: examen.rigido_oi_cb || '',
                rx: examen.rigido_oi_rx || '',
                diam: examen.rigido_oi_diam || '',
            },
            material: examen.rigido_material || '',
        },
        medidas: {
            altura: examen.medidas_altura || '',
            a: examen.medidas_a || '',
            ed: examen.medidas_ed || '',
            b: examen.medidas_b || '',
            dbl: examen.medidas_dbl || '',
        },
        esferico: !!examen.esferico,
        torico: !!examen.torico,
        gp: !!examen.gp,
        conConocimiento: !!examen.con_conocimiento_paciente,
        motivo: examen.motivo || '',
        optometrista: examen.optometrista || '',
    })
})

const construirPayloadInfoReferencial = () => ({
    cliente_id: props.clienteId,
    paciente_id: props.paciente.id,
    tipo_referencia: formData.tipoReferencia || null,
    notas: formData.notas || null,

    refraccion_od_esfera: formData.refraccion.od.esfera || null,
    refraccion_od_cilindro: formData.refraccion.od.cilindro || null,
    refraccion_od_eje: formData.refraccion.od.eje || null,
    refraccion_od_adicion: formData.refraccion.od.adicion || null,
    refraccion_od_av: formData.refraccion.od.av || null,
    refraccion_od_dnp: formData.refraccion.od.dnp || null,
    refraccion_od_prisma: formData.refraccion.od.prisma || null,

    refraccion_oi_esfera: formData.refraccion.oi.esfera || null,
    refraccion_oi_cilindro: formData.refraccion.oi.cilindro || null,
    refraccion_oi_eje: formData.refraccion.oi.eje || null,
    refraccion_oi_adicion: formData.refraccion.oi.adicion || null,
    refraccion_oi_av: formData.refraccion.oi.av || null,
    refraccion_oi_dnp: formData.refraccion.oi.dnp || null,
    refraccion_oi_prisma: formData.refraccion.oi.prisma || null,

    refraccion_di_c: formData.refraccion.diC || null,
    refraccion_di_l: formData.refraccion.diL || null,

    hidrofilico_od_esfera: formData.hidrofilico.od.esfera || null,
    hidrofilico_od_cilindro: formData.hidrofilico.od.cilindro || null,
    hidrofilico_od_eje: formData.hidrofilico.od.eje || null,
    hidrofilico_oi_esfera: formData.hidrofilico.oi.esfera || null,
    hidrofilico_oi_cilindro: formData.hidrofilico.oi.cilindro || null,
    hidrofilico_oi_eje: formData.hidrofilico.oi.eje || null,

    rigido_od_cb: formData.rigido.od.cb || null,
    rigido_od_rx: formData.rigido.od.rx || null,
    rigido_od_diam: formData.rigido.od.diam || null,
    rigido_oi_cb: formData.rigido.oi.cb || null,
    rigido_oi_rx: formData.rigido.oi.rx || null,
    rigido_oi_diam: formData.rigido.oi.diam || null,
    rigido_material: formData.rigido.material || null,

    medidas_altura: formData.medidas.altura || null,
    medidas_a: formData.medidas.a || null,
    medidas_ed: formData.medidas.ed || null,
    medidas_b: formData.medidas.b || null,
    medidas_dbl: formData.medidas.dbl || null,

    esferico: formData.esferico,
    torico: formData.torico,
    gp: formData.gp,
    con_conocimiento_paciente: formData.conConocimiento,

    motivo: formData.motivo || null,
    optometrista: formData.optometrista || null,
})

const agregarInfo = async () => {
    if (!props.paciente?.id || !props.clienteId) {
        errorMsg.value = 'Falta seleccionar cliente/paciente'
        return
    }
    errorMsg.value = ''
    enviando.value = true
    try {
        const creado = await createInfoReferencial(construirPayloadInfoReferencial())
        examenes.value.push(creado)
        Object.assign(formData, formDataInicial())
        examenSeleccionadoIdx.value = null
    } catch (e) {
        errorMsg.value = e.message
    } finally {
        enviando.value = false
    }
}

const cancelarInfo = () => {
    Object.assign(formData, formDataInicial())
    examenSeleccionadoIdx.value = null
}
</script>
