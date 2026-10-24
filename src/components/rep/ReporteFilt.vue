<style scoped>
.EntFiltPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 93%;
    flex-shrink: 0;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    padding-bottom: 20px;
}

.EntFiltHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 8px 20px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.EntFiltHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.EntGrid {
    display: grid;
    grid-template-columns: 220px 1fr;
    align-items: center;
    row-gap: 20px;
    width: 90%;
    margin-top: 20px;
}

.EntLabel {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    white-space: nowrap;
}

.FormatoRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 28px;
}

.FormatoOpcion {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
    cursor: pointer;
}

.FormatoOpcion input {
    accent-color: #130348;
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.DropWrap {
    position: relative;
    width: 320px;
}

.SelectBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
    box-sizing: border-box;
}

.DropMenu {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

.TextInput {
    width: 100%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
}

.TextInput:focus {
    border-color: #130348;
}

.DateRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-top: 20px;
    padding-right: 22%;
}

.DateRow .EntLabel {
    white-space: nowrap;
}

.DateInput {
    width: 100%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    color: #130348;
    cursor: pointer;
}

.DateWrap {
    width: 30%;
}

.DespButton {
    margin-top: 24px;
    padding: 8px 24px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 22px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.DespButton:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    color: #130348;
}

.EntError {
    margin-top: 10px;
    color: #FB1C2E;
    font-weight: 600;
}
</style>

<template>
    <div class="EntFiltPrinc">
        <div class="EntFiltHeader">
            <span>Reportes - {{ titulo }}</span>
        </div>

        <div class="EntGrid">
            <span class="EntLabel">Formato:</span>
            <div class="FormatoRow">
                <label v-for="f in formatos" :key="f" class="FormatoOpcion">
                    <input v-model="formato" type="radio" name="formato-entregas" :value="f" />
                    {{ f }}
                </label>
            </div>

            <span class="EntLabel">Sucursales:</span>
            <div class="DropWrap">
                <div class="SelectBox" @click="toggleMenu('sucursal')">
                    <span>{{ sucursal?.sucursal ?? 'Seleccione una sucursal' }}</span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
                <div v-if="menuAbierto === 'sucursal'" class="DropMenu">
                    <div
                        v-for="s in sucursales"
                        :key="s.id"
                        class="DropItem"
                        :class="{ activo: sucursal?.id === s.id }"
                        @click="seleccionarSucursal(s)"
                    >{{ s.sucursal }}</div>
                </div>
            </div>

            <template v-if="campos.includes('codigo')">
                <span class="EntLabel">Código:</span>
                <div class="DropWrap">
                    <input v-model="codigo" class="TextInput" placeholder="Todos" autocomplete="off" />
                </div>
            </template>

            <template v-for="sel in selectores" :key="sel.campo">
                <span class="EntLabel">{{ sel.etiqueta }}:</span>
                <div class="DropWrap">
                    <div class="SelectBox" @click="toggleMenu(sel.campo)">
                        <span>{{ etiquetaSeleccion(sel) }}</span>
                        <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                    </div>
                    <div v-if="menuAbierto === sel.campo" class="DropMenu">
                        <div
                            v-for="op in sel.opciones"
                            :key="String(op.valor)"
                            class="DropItem"
                            :class="{ activo: seleccion[sel.campo] === op.valor }"
                            @click="seleccionar(sel.campo, op.valor)"
                        >{{ op.etiqueta }}</div>
                    </div>
                </div>
            </template>
        </div>

        <div v-if="campos.includes('fechas')" class="DateRow">
            <span class="EntLabel">Fecha Inicial:</span>
            <DatePicker
                v-model="fechaInicio"
                :masks="{ input: 'DD/MM/YYYY' }"
                locale="es"
                :max-date="fechaFin"
                class="DateWrap"
            >
                <template #default="{ inputValue, inputEvents }">
                    <input
                        class="DateInput"
                        :value="inputValue"
                        v-on="inputEvents"
                        placeholder="dd/mm/aaaa"
                        readonly
                    />
                </template>
            </DatePicker>

            <span class="EntLabel">Fecha Final:</span>
            <DatePicker
                v-model="fechaFin"
                :masks="{ input: 'DD/MM/YYYY' }"
                locale="es"
                :min-date="fechaInicio"
                class="DateWrap"
            >
                <template #default="{ inputValue, inputEvents }">
                    <input
                        class="DateInput"
                        :value="inputValue"
                        v-on="inputEvents"
                        placeholder="dd/mm/aaaa"
                        readonly
                    />
                </template>
            </DatePicker>
        </div>

        <div v-if="error" class="EntError">{{ error }}</div>
        <button class="DespButton" @click="desplegar">
            Desplegar Reporte
        </button>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { DatePicker } from 'v-calendar'
import { useSucursalStore } from '../../stores/sucursal'
import { getSucursales } from '../../services/SucursalesServices'

const props = defineProps({
    titulo: { type: String, required: true },
    // filtros adicionales: 'fechas', 'codigo', 'tipoProducto', 'estatusProducto', 'nivelProducto'
    campos: { type: Array, default: () => ['fechas'] },
})

const emit = defineEmits(['desplegar'])

const formatos = ['Pantalla', 'PDF', 'Excel', 'Plano']

// Valores igual a los del editor de productos (DatGener.vue)
const SELECTORES = [
    {
        campo: 'tipoProducto',
        etiqueta: 'Tipo de Producto',
        opciones: [
            { valor: null, etiqueta: 'Todos' },
            { valor: 1, etiqueta: 'Producto' },
            { valor: 2, etiqueta: 'Servicio' },
        ],
    },
    {
        campo: 'estatusProducto',
        etiqueta: 'Estátus del Producto',
        opciones: [
            { valor: null, etiqueta: 'Todos' },
            { valor: 1, etiqueta: 'Activo' },
            { valor: 2, etiqueta: 'Inactivo' },
        ],
    },
    {
        campo: 'nivelProducto',
        etiqueta: 'Nivel de Producto',
        // pendiente definir los niveles con negocio
        opciones: [
            { valor: null, etiqueta: 'Todos' },
        ],
    },
]

const sucursalStore = useSucursalStore()

const formato = ref('Pantalla')
const sucursales = ref([])
const sucursal = ref(null)
const menuAbierto = ref(null)
const hoy = new Date(new Date().setHours(0, 0, 0, 0))
const fechaInicio = ref(hoy)
const fechaFin = ref(hoy)
const codigo = ref('')
const seleccion = reactive({ tipoProducto: null, estatusProducto: null, nivelProducto: null })
const error = ref(null)

const selectores = computed(() => SELECTORES.filter(s => props.campos.includes(s.campo)))

const toggleMenu = (menu) => {
    menuAbierto.value = menuAbierto.value === menu ? null : menu
}

const seleccionarSucursal = (s) => {
    sucursal.value = s
    menuAbierto.value = null
}

const seleccionar = (campo, valor) => {
    seleccion[campo] = valor
    menuAbierto.value = null
}

const etiquetaSeleccion = (sel) => sel.opciones.find(op => op.valor === seleccion[sel.campo])?.etiqueta ?? 'Todos'

const desplegar = () => {
    error.value = null
    if (!sucursal.value) {
        error.value = 'Seleccione una sucursal'
        return
    }
    const usaFechas = props.campos.includes('fechas')
    if (usaFechas && (!fechaInicio.value || !fechaFin.value)) {
        error.value = 'Seleccione la fecha inicial y la fecha final'
        return
    }

    const parametros = { formato: formato.value, sucursal: sucursal.value }
    if (usaFechas) Object.assign(parametros, { fechaInicio: fechaInicio.value, fechaFin: fechaFin.value })
    if (props.campos.includes('codigo')) parametros.codigo = codigo.value.trim() || null
    selectores.value.forEach(sel => { parametros[sel.campo] = seleccion[sel.campo] })
    emit('desplegar', parametros)
}

onMounted(async () => {
    try {
        sucursales.value = await getSucursales()
        sucursal.value = sucursales.value.find(s => s.id === sucursalStore.sucursalSeleccionada?.id) ?? null
    } catch (e) {
        error.value = e.message
    }
})
</script>
