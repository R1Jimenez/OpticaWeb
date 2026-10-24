<style scoped>
.PrincFilt {
    display: flex;
    flex-direction: column;
    width: 93%;
    min-height: 20px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 5%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: visible;
    gap: 10px;
    padding-bottom: 1%;
    flex-shrink: 0;
}

.HeadRow {
    padding: 10px 30px;
    border-bottom: 1px solid #FB1C2E;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: radial-gradient(
        ellipse at center,
        #130348 0%,
        #07072C 100%
    );
    margin-bottom: auto;
}

.HeadRow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
}

.rowfilt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5%;
    width: 100%;
}

.rowfiltdate {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5%;
    width: 100%;
}

.rowfilt text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.rowfiltdate text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.rowfiltdate2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5%;
    width: 100%;
    padding-left: 3%;
    padding-right: 3%;
}

.rowfiltdate2 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.barrmov {
    width: 60%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.barrmov2 {
    width: 100%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.rowcolmn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 20%;
    gap: 2px;
}

.SelectBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 2px 15px;
    min-width: 100%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 15px;
    cursor: pointer;
}

.SelectBox text {
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.DropWrap {
    position: relative;
}

.DropMenu {
    position: absolute;
    top: 110%;
    left: 0;
    min-width: 100%;
    width: max-content;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.DropItem {
    padding: 10px 18px;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
    color: #130348;
    font-size: 1rem;
    transition: background 0.15s;
}

.DropItem:last-child {
    border-bottom: none;
}

.DropItem:hover,
.DropItem.activo {
    background-color: #F5F5F5;
    font-weight: 600;
}

.BtnGroup {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.Cons {
    padding: 7px 25px;
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.Cons:hover {
    background: #230097;
}

.Cons.secundario {
    padding: 7px 18px;
    background: transparent;
    border: 2px solid #130348;
    color: #130348;
}

.Cons.secundario:hover {
    background: #F0F0F0;
}
</style>

<template>
    <div class="PrincFilt">
        <div class="HeadRow">
            <text>
                Movimientos de Inventario
            </text>
        </div>
        <div class="rowfilt">
            <text>
                Producto: 
            </text>
            <input
                class="barrmov"
                v-model="producto"
                placeholder="Ingresar Producto"
                autocomplete="off"
                @keyup.enter="consultar"
            />
            <div class="BtnGroup">
                <button class="Cons secundario" @click="limpiar">
                    Limpiar
                </button>
                <button class="Cons" @click="consultar">
                    Consultar
                </button>
            </div>
        </div>
        <div class="rowfiltdate">
            <div class="rowcolmn">
                <text>
                    Fecha Inicial: 
                </text>
                <DatePicker
                    v-model="fechaInicio"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :max-date="fechaFin"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="barrmov2"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
            <div class="rowcolmn">
                <text>
                    Fecha Final: 
                </text>
                <DatePicker
                    v-model="fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="fechaInicio"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="barrmov2"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
        </div>
        <div class="rowfiltdate2">
            <div class="rowcolmn">
                <text>
                    Sucursal: 
                </text>
                <div class="DropWrap">
                    <div class="SelectBox" @click="toggleMenu('sucursal')">
                        <text>
                            {{ sucursal?.sucursal ?? 'Todas' }}
                        </text>
                        <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'sucursal'">
                        <div class="DropItem" :class="{ activo: !sucursal }" @click="seleccionarSucursal(null)">
                            Todas
                        </div>
                        <div
                            v-for="s in sucursales"
                            :key="s.id"
                            class="DropItem"
                            :class="{ activo: sucursal?.id === s.id }"
                            @click="seleccionarSucursal(s)"
                        >
                            {{ s.sucursal }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="rowcolmn">
                <text>
                    Código:
                </text>
                <input
                    class="barrmov2"
                    v-model="codigo"
                    placeholder="Ingresar Código"
                    autocomplete="off"
                    @keyup.enter="consultar"
                />
            </div>
            <div class="rowcolmn">
                <text>
                    Tipo: 
                </text>
                <div class="DropWrap">
                    <div class="SelectBox" @click="toggleMenu('tipo')">
                        <text>
                            {{ tipo ?? 'Todos' }}
                        </text>
                        <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'tipo'">
                        <div class="DropItem" :class="{ activo: !tipo }" @click="seleccionarTipo(null)">
                            Todos
                        </div>
                        <div
                            v-for="t in tipos"
                            :key="t"
                            class="DropItem"
                            :class="{ activo: tipo === t }"
                            @click="seleccionarTipo(t)"
                        >
                            {{ t }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="rowcolmn">
                <text>
                    Referencia:
                </text>
                <input
                    class="barrmov2"
                    v-model="referencia"
                    placeholder="Ingresar Referencia"
                    autocomplete="off"
                    @keyup.enter="consultar"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DatePicker } from 'v-calendar'
import { getSucursales } from '../../../services/SucursalesServices'
import { getTiposMovimiento } from '../../../services/InventarioServices'

const emit = defineEmits(['consultar'])

const producto = ref('')
const codigo = ref('')
const referencia = ref('')
const fechaInicio = ref(null)
const fechaFin = ref(null)
const sucursal = ref(null)
const tipo = ref(null)
const sucursales = ref([])
const tipos = ref([])
const menuAbierto = ref(null)

const toggleMenu = (menu) => {
    menuAbierto.value = menuAbierto.value === menu ? null : menu
}

const seleccionarSucursal = (s) => {
    sucursal.value = s
    menuAbierto.value = null
}

const seleccionarTipo = (t) => {
    tipo.value = t
    menuAbierto.value = null
}

// Rango en hora local: desde el inicio del día inicial hasta el inicio del día siguiente al final
const inicioDelDia = (fecha, diasExtra = 0) => {
    if (!fecha) return null
    const d = new Date(fecha)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + diasExtra)
    return d.toISOString()
}

const consultar = () => {
    menuAbierto.value = null
    emit('consultar', {
        producto: producto.value.trim() || null,
        codigo: codigo.value.trim() || null,
        referencia: referencia.value.trim() || null,
        sucursal_id: sucursal.value?.id ?? null,
        tipo: tipo.value,
        desde: inicioDelDia(fechaInicio.value),
        hasta: inicioDelDia(fechaFin.value, 1),
    })
}

const limpiar = () => {
    producto.value = ''
    codigo.value = ''
    referencia.value = ''
    fechaInicio.value = null
    fechaFin.value = null
    sucursal.value = null
    tipo.value = null
    consultar()
}

onMounted(async () => {
    const [s, t] = await Promise.allSettled([getSucursales(), getTiposMovimiento()])
    if (s.status === 'fulfilled') sucursales.value = s.value
    else console.error('Error al cargar sucursales:', s.reason)
    if (t.status === 'fulfilled') tipos.value = t.value
    else console.error('Error al cargar tipos de movimiento:', t.reason)
})
</script>