<style scoped>
.ModPrincPRec {
    display: flex;
    flex-direction: column;
    gap: 5%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.EdiPrec {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    min-height: 60%;
    height: auto;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeadPrec {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 16px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
    flex-shrink: 0;
}

.HeadPrec span {
    font-size: 1.2rem;
    font-weight: 550;
    color: white;
}

.ModContPrec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.butonSection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding: 5px 25px;
    width: 100%;
    gap: 10px;
    border-top: 1px solid #130348;
}

.Guar {
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    font-size: 1rem;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.Guar:hover {
    background: white;
    border: 1px solid #58B358;
    color: #58B358;
    font-weight: 600;
}

.Can {
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #b91623 100%
    );
    font-size: 1rem;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.Can:hover {
    background: white;
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
    font-weight: 600;
}

.ModUsages {
    display: flex;
    flex-direction: column;
    width: 97%;
    height: 97%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
    overflow: hidden;
}

.HeadUs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 16px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    gap: 10px;
}

.HeadRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.HeadRow span {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.UsagesPrinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.CliBarspr {
    width: 20%;
    padding: 2px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    text-align: right;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.CliBarstab {
    width: 100%;
    padding: 2px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    text-align: right;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead tr {
    background-color: #F5F5F5;
}

thead th {
    padding: 9px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-bottom: 1px solid #130348;
}

tbody tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
    cursor: pointer;
}

tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background-color: #FAFAFA; }

tbody td {
    padding: 10px;
    font-size: 1rem;
    font-weight: 550;
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;
    text-align: center;
}

tbody td:nth-child(2) {
    text-align: left;
}
</style>

<template>
    <div class="ModPrincPRec" @click.self="$emit('CerrPrec')">
        <div class="EdiPrec">
            <div class="HeadPrec">
                <span>Precios</span>
            </div>
            <div class="ModContPrec">
                <div class="ModUsages">
                    <div class="HeadUs">
                        <div class="HeadRow">
                            <input
                                type="checkbox"
                                class="check"
                                v-model="mismoCosto"
                            >
                            <span>El mismo costo en todas las sucursales:</span>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                class="CliBarspr"
                                v-model="costoGlobal"
                                :disabled="!mismoCosto"
                                autocomplete="off"
                            />
                        </div>
                        <div class="HeadRow">
                            <input
                                type="checkbox"
                                class="check"
                                v-model="mismoPrecio"
                            >
                            <span>El mismo precio en todas las sucursales:</span>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                class="CliBarspr"
                                v-model="precioGlobal"
                                :disabled="!mismoPrecio"
                                autocomplete="off"
                            />
                        </div>
                    </div>

                    <table>
                        <colgroup>
                            <col style="width: 55%;">
                            <col style="width: 20%">
                            <col style="width: 25%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Sucursal</th>
                                <th>Costo</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isLoading">
                                <td colspan="3">Cargando sucursales...</td>
                            </tr>
                            <tr v-else-if="errorMessage">
                                <td colspan="3">{{ errorMessage }}</td>
                            </tr>
                            <tr v-else-if="sucursales.length === 0">
                                <td colspan="3">No hay sucursales disponibles</td>
                            </tr>
                            <tr v-else v-for="sucursal in sucursalesVisibles" :key="sucursal.id">
                                <td>
                                    {{ sucursal.sucursal }}
                                    <div v-if="erroresPorSucursal[sucursal.id]" style="color: #FB1C2E; font-size: 0.8rem; font-weight: 600;">
                                        {{ erroresPorSucursal[sucursal.id] }}
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        class="CliBarstab"
                                        v-model="costos[sucursal.id]"
                                        :disabled="mismoCosto"
                                        autocomplete="off"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        class="CliBarstab"
                                        v-model="precios[sucursal.id]"
                                        :disabled="mismoPrecio"
                                        autocomplete="off"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="butonSection">
                <button class="Can" @click="$emit('CerrPrec')">
                    Cancelar
                </button>
                <button class="Guar" @click="guardar" :disabled="isSaving || isLoading">
                    {{ isSaving ? 'Guardando...' : 'Guardar' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { getSucursales } from '../../../services/SucursalesServices'
import { createPrecioSucursal, getPreciosByProducto, updatePrecioSucursal } from '../../../services/PreciosServices'

const props = defineProps({
    productoId: { type: [Number, String], required: true },
    sucursalesPermitidas: { type: Array, default: () => [] }
})

const emit = defineEmits(['CerrPrec'])

const sucursales = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)
const isSaving = ref(false)

const mismoPrecio  = ref(false)
const precioGlobal = ref('')
const mismoCosto   = ref(false)
const costoGlobal  = ref('')
const costos = reactive({})
const precios = reactive({})
const precioIds = reactive({})

const erroresPorSucursal = reactive({})
const soloErrores = ref(false)

const cargarSucursales = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const [sucursalesData, preciosExistentes] = await Promise.all([
            getSucursales(),
            getPreciosByProducto(props.productoId).catch(() => []),
        ])

        sucursales.value = props.sucursalesPermitidas.length > 0
            ? sucursalesData.filter(s => props.sucursalesPermitidas.includes(s.id))
            : sucursalesData

        sucursalesData.forEach(s => {
            precios[s.id] = ''
            costos[s.id] = ''
        })

        preciosExistentes.forEach(p => {
            precios[p.sucursal] = p.precio
            costos[p.sucursal] = p.costo
            precioIds[p.sucursal] = p.id
        })
    } catch (e) {
        errorMessage.value = `Error al cargar sucursales: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

const sucursalesVisibles = computed(() => {
    if (!soloErrores.value) return sucursales.value
    return sucursales.value.filter(s => erroresPorSucursal[s.id])
})

onMounted(cargarSucursales)

const guardar = async () => {
    isSaving.value = true
    
    const listaGuardar = soloErrores.value
        ? sucursales.value.filter(s => erroresPorSucursal[s.id])
        : sucursales.value

    const resultados = await Promise.allSettled(
        listaGuardar.map(async (s) => {
            const precio = Number(mismoPrecio.value ? precioGlobal.value : precios[s.id]) || 0
            const costo = Number(mismoCosto.value ? costoGlobal.value : costos[s.id]) || 0
            const existingId = precioIds[s.id]

            const resultado = existingId
                ? await updatePrecioSucursal(existingId, { precio, costo })
                : await createPrecioSucursal({
                    sucursal: s.id,
                    producto: Number(props.productoId),
                    costo,
                    precio,
                })

            return { sucursalId: s.id, resultado }
        })
    )

    resultados.forEach((r, idx) => {
        const sucursalId = listaGuardar[idx].id

        if (r.status === 'fulfilled') {
            delete erroresPorSucursal[sucursalId]
            precioIds[sucursalId] = r.value.resultado.id
        } else {
            erroresPorSucursal[sucursalId] = r.reason.message
        }
    })

    isSaving.value = false

    const hayErrores = Object.keys(erroresPorSucursal).length > 0
    if (hayErrores) {
        soloErrores.value = true
        alert('Algunos precios no se pudieron guardar. Por favor, revisa los errores.')
    } else {
        emit('CerrPrec')
    }
}
</script>