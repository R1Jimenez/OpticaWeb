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
    height: 60%;
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
    flex-direction: row;
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

.HeadUs span {
    font-size: 1rem;
    font-weight: 600;
    color: white
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
                        <input
                            type="checkbox"
                            class="check"
                            v-model="mismoPrecio"
                        >
                        <span>El mismo precio en todas las sucursales:</span>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="700.00"
                            class="CliBarspr"
                            v-model="precioGlobal"
                            :disabled="!mismoPrecio"
                            autocomplete="off"
                        />
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
                            <tr v-else v-for="sucursal in sucursales" :key="sucursal.id">
                                <td>{{ sucursal.sucursal }}</td>
                                <td>0.00</td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="700.00"
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
import { ref, reactive, onMounted } from 'vue'
import { getSucursales } from '../../../services/SucursalesServices'
import { createPrecioSucursal, getPreciosByProducto, updatePrecioSucursal } from '../../../services/PreciosServices'

const props = defineProps({
    productoId: { type: [Number, String], required: true }
})

const emit = defineEmits(['CerrPrec'])

const sucursales = ref([])
const isLoading = ref(false)
const errorMessage = ref(null)
const isSaving = ref(false)

const mismoPrecio  = ref(false)
const precioGlobal = ref('')
const precios = reactive({})
const precioIds = reactive({})

const cargarSucursales = async () => {
    isLoading.value = true
    errorMessage.value = null
    try {
        const [sucursalesData, preciosExistentes] = await Promise.all([
            getSucursales(),
            getPreciosByProducto(props.productoId).catch(() => []),
        ])

        sucursales.value = sucursalesData

        sucursalesData.forEach(s => {
            precios[s.id] = ''
        })

        preciosExistentes.forEach(p => {
            precios[p.sucursal] = p.precio
            precioIds[p.sucursal] = p.id
        })
    } catch (e) {
        errorMessage.value = `Error al cargar sucursales: ${e.message}`
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

onMounted(cargarSucursales)

const guardar = async () => {
    isSaving.value = true
    try {
        await Promise.all(
            sucursales.value.map(s => {
                const precio = Number(mismoPrecio.value ? precioGlobal.value : precios[s.id]) || 0
                const existingId = precioIds[s.id]

                if (existingId) {
                    return updatePrecioSucursal(existingId, { precio })
                }
                return createPrecioSucursal({
                    sucursal: s.id,
                    producto: Number(props.productoId),
                    costo: 0,
                    precio,
                })
            })
        )
        emit('CerrPrec')
    } catch (e) {
        console.error('Error al guardar precios:', e)
        alert(`Error al guardar los precios: ${e.message}`)
    } finally {
        isSaving.value = false
    }
}
</script>