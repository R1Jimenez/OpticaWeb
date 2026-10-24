<style scoped>
.ModOver {
    display: flex;
    flex-direction: column;
    gap: 3%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: safe center;
    overflow-y: auto;
    padding: 2% 0;
    z-index: 999;
}

.NewTraspModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 75%;
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    padding-bottom: 16px;
}

.TrasModHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 3%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
    box-sizing: border-box;
}

.TrasModHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FormGrid {
    display: grid;
    grid-template-columns: 22% 1fr;
    align-items: start;
    row-gap: 18px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
}

.FormLabel {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    text-align: right;
    padding-top: 6px;
}

.texta {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    resize: none;
    font-family: inherit;
    min-height: 2.2rem;
    box-sizing: border-box;
}

.EstatusColumn {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;
}

.estbox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 12px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
}

.EstatusColumn span {
    font-size: 0.95rem;
    font-weight: 500;
    color: #130348;
}

.SelectBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1rem;
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

.SelectBox.placeholder {
    color: #999;
}

.ProRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    margin-top: 16px;
    margin-bottom: 16px;
}

.RowProd {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 16px;
    width: 60%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #FB1C2E;
    border-radius: 10px;
}

.RowProd text {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.barrmov {
    width: 20%;
    padding: 5px 16px;
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.AddProd {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.AddProd:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
    color: #58B358;
}

.AddProd:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.ProdModTab {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.ProdHeModTab tr {
    background-color: #F0F0F0;
}

.ProdHeModTab th {
    padding: 5px 1px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-top: 1px solid #130348;
    border-bottom: 1px solid #130348;
}

.ProdBodModTab tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.ProdBodModTab tr:hover { background-color: #FAFAFA; }

.ProdBodModTab td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.barrmovtab {
    width: 80%;
    padding: 5px 16px;
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.LesTabMov {
    margin-left: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #bb1724 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.LesTabMov:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
}

.estbox.Enviado {
    background: radial-gradient(ellipse at center, #230097 10%, #130348 100%);
}

.estbox.Recibido {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
}

.estbox.Cancelado {
    background: radial-gradient(ellipse at center, #FB1C2E 10%, #bb1724 100%);
}

.SelectBox.deshabilitado,
.texta:disabled,
.barrmov:disabled,
.barrbuscar:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.DropWrap {
    position: relative;
    width: 100%;
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

.DropVacio {
    padding: 12px 18px;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
}

.BuscarWrap {
    position: relative;
    width: 60%;
}

.barrbuscar {
    width: 100%;
    padding: 5px 16px;
    border: 1.5px solid #FB1C2E;
    border-radius: 10px;
    font-size: 1rem;
    color: #130348;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    box-sizing: border-box;
}

.ResultadoItem {
    display: grid;
    grid-template-columns: 30% 1fr 18% 12%;
    gap: 8px;
    align-items: center;
    font-size: 0.9rem;
}

.ResultadoItem .existencia {
    text-align: right;
    font-weight: 700;
}

.barrmovtab.invalido {
    border-color: #FB1C2E;
    border-width: 3px;
    color: #FB1C2E;
}

.ProdVacio {
    padding: 16px;
    text-align: center;
    color: #6C757D;
    font-style: italic;
}

.AvisoError {
    width: 75%;
    flex-shrink: 0;
    padding: 8px 14px;
    border: 2px solid #FB1C2E;
    border-radius: 12px;
    background: white;
    color: #FB1C2E;
    font-weight: 600;
}

.AvisoProducto {
    width: 90%;
    color: #FB1C2E;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.FooterRow {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 95%;
    margin-top: 14px;
}

.BtnAccion {
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
    background: radial-gradient(ellipse at center, #130348 10%, #07072C 100%);
}

.BtnAccion.exito {
    background: radial-gradient(ellipse at center, #58B358 10%, #459B45 100%);
}

.BtnAccion.peligro {
    background: radial-gradient(ellipse at center, #FB1C2E 10%, #bb1724 100%);
}

.BtnAccion.secundario {
    background: transparent;
    border-color: #130348;
    color: #130348;
}

.BtnAccion:hover:not(:disabled) {
    filter: brightness(1.15);
}

.BtnAccion:disabled {
    opacity: 0.5;
    cursor: default;
}

.BtnAccion .material-icons {
    font-size: 20px;
}
</style>

<template>
    <div class="ModOver" data-cy="modal-traspaso" @click.self="!procesando && $emit('cerrar')">
        <div v-if="error" class="AvisoError" data-cy="error-traspaso">{{ error }}</div>

        <div class="NewTraspModal">
            <div class="TrasModHeader">
                <span>Información General{{ traspasoId ? ` — Traspaso #${traspasoId}` : '' }}</span>
            </div>

            <div v-if="cargando" class="ProdVacio">Cargando traspaso...</div>
            <div v-else class="FormGrid">
                <span class="FormLabel">Comentarios</span>
                <textarea
                    class="texta"
                    v-model="comentarios"
                    rows="3"
                    maxlength="500"
                    data-cy="comentarios"
                    :disabled="!editable"
                ></textarea>

                <span class="FormLabel">Estatus</span>
                <div class="EstatusColumn">
                    <div class="estbox" :class="estatus" data-cy="estatus">{{ estatus }}</div>
                    <span>{{ descripcionEstatus }}</span>
                </div>

                <span class="FormLabel">Origen</span>
                <div class="DropWrap">
                    <div
                        class="SelectBox"
                        :class="{ placeholder: !origen, deshabilitado: !editable }"
                        data-cy="origen"
                        @click="editable && toggleMenu('origen')"
                    >
                        <span>{{ origen?.sucursal ?? 'Seleccione una sucursal' }}</span>
                        <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'origen'">
                        <div
                            v-for="s in sucursales"
                            :key="s.id"
                            class="DropItem"
                            :class="{ activo: origen?.id === s.id }"
                            @click="seleccionarOrigen(s)"
                        >{{ s.sucursal }}</div>
                    </div>
                </div>

                <span class="FormLabel">Destino</span>
                <div class="DropWrap">
                    <div
                        class="SelectBox"
                        :class="{ placeholder: !destino, deshabilitado: !editable }"
                        data-cy="destino"
                        @click="editable && toggleMenu('destino')"
                    >
                        <span>{{ destino?.sucursal ?? 'Seleccione una sucursal' }}</span>
                        <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'destino'">
                        <div v-if="destinosDisponibles.length === 0" class="DropVacio">No hay otras sucursales</div>
                        <div
                            v-for="s in destinosDisponibles"
                            :key="s.id"
                            class="DropItem"
                            :class="{ activo: destino?.id === s.id }"
                            @click="seleccionarDestino(s)"
                        >{{ s.sucursal }}</div>
                    </div>
                </div>

                <span class="FormLabel">Promesa de Entrega</span>
                <DatePicker
                    v-model="promesa"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="editable ? hoy : null"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="texta"
                            :value="inputValue"
                            v-on="editable ? inputEvents : {}"
                            placeholder="dd/mm/aaaa"
                            data-cy="promesa"
                            :disabled="!editable"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
        </div>
        <div class="NewTraspModal">
            <div class="TrasModHeader">
                <span>Productos ({{ items.length }})</span>
            </div>
            <div v-if="editable" class="ProRow">
                <div class="BuscarWrap">
                    <input
                        class="barrbuscar"
                        v-model="busqueda"
                        :placeholder="origen ? 'Buscar producto por código, nombre o código externo...' : 'Seleccione primero la sucursal de origen'"
                        :disabled="!origen"
                        autocomplete="off"
                        data-cy="buscar-producto"
                        @input="onBusquedaInput"
                        @focus="resultados.length && (menuAbierto = 'productos')"
                    />
                    <div class="DropMenu" v-if="menuAbierto === 'productos'" data-cy="resultados-producto">
                        <div v-if="buscando" class="DropVacio">Buscando...</div>
                        <div v-else-if="resultados.length === 0" class="DropVacio">
                            No hay productos con ese criterio en {{ origen?.sucursal }}
                        </div>
                        <div
                            v-for="r in resultados"
                            v-else
                            :key="r.producto_id"
                            class="DropItem"
                            @click="seleccionarResultado(r)"
                        >
                            <div class="ResultadoItem">
                                <span>{{ r.codigo }}</span>
                                <span>{{ r.nombre }}</span>
                                <span>{{ r.codigo_externo }}</span>
                                <span class="existencia">Exist: {{ r.existencia_actual }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    class="barrmov"
                    v-model="cantidadNueva"
                    type="number"
                    min="1"
                    step="1"
                    :max="productoSeleccionado?.existencia_actual"
                    :placeholder="productoSeleccionado ? `Cantidad (máx. ${productoSeleccionado.existencia_actual})` : 'Cantidad'"
                    :disabled="!productoSeleccionado"
                    data-cy="cantidad-producto"
                    @keyup.enter="agregar"
                />
                <button class="AddProd" title="Agregar producto" data-cy="agregar-producto" :disabled="!productoSeleccionado" @click="agregar">
                    <span class="material-icons">add</span>
                </button>
            </div>
            <div v-if="errorProducto" class="AvisoProducto" data-cy="error-producto">{{ errorProducto }}</div>

            <div v-if="items.length === 0" class="ProdVacio">No se han agregado productos</div>
            <table v-else class="ProdModTab" data-cy="tabla-productos">
                <colgroup>
                    <col style="width:13%">
                    <col style="width:14%">
                    <col style="width:25%">
                    <col style="width:13%">
                    <col style="width:7.666666667%">
                    <col style="width:7.666666667%">
                    <col style="width:12%">
                    <col style="width:7.666666667%">
                </colgroup>
                <thead class="ProdHeModTab">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Código Externo</th>
                        <th>Punto de Reorden</th>
                        <th>Unidades en Existencia</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="ProdBodModTab">
                    <tr v-for="item in items" :key="item.producto_id">
                        <td>{{ item.codigo }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.descripcion }}</td>
                        <td>{{ item.codigo_externo }}</td>
                        <td>{{ item.punto_reorden }}</td>
                        <td>{{ item.existencia }}</td>
                        <td>
                            <input
                                v-if="editable"
                                class="barrmovtab"
                                :class="{ invalido: !cantidadValida(item) }"
                                v-model="item.cantidad"
                                type="number"
                                min="1"
                                step="1"
                                :max="item.existencia"
                                :title="cantidadValida(item) ? '' : `Debe ser entre 1 y ${item.existencia}`"
                            />
                            <span v-else>{{ item.cantidad }}</span>
                        </td>
                        <td>
                            <button v-if="editable" class="LesTabMov" title="Quitar producto" @click="quitar(item)">
                                <span class="material-icons">remove</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="FooterRow">
                <button class="BtnAccion secundario" :disabled="procesando" data-cy="cerrar-traspaso" @click="$emit('cerrar')">
                    {{ editable ? 'Cancelar' : 'Cerrar' }}
                </button>
                <button
                    v-if="traspasoId && (estatus === 'Nuevo' || estatus === 'Enviado')"
                    class="BtnAccion peligro"
                    :disabled="procesando"
                    data-cy="cancelar-traspaso"
                    @click="cancelar"
                >
                    <span class="material-icons">block</span> Cancelar Traspaso
                </button>
                <template v-if="editable">
                    <button class="BtnAccion" :disabled="procesando" data-cy="guardar-traspaso" @click="guardar(false)">
                        <span class="material-icons">save</span> Guardar
                    </button>
                    <button class="BtnAccion exito" :disabled="procesando" data-cy="guardar-enviar-traspaso" @click="guardar(true)">
                        <span class="material-icons">local_shipping</span> Guardar y Enviar
                    </button>
                </template>
                <button
                    v-if="estatus === 'Enviado'"
                    class="BtnAccion exito"
                    :disabled="procesando"
                    data-cy="recibir-traspaso"
                    @click="recibir"
                >
                    <span class="material-icons">inventory</span> Recibir
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { DatePicker } from 'v-calendar'
import { useSucursalStore } from '../../../stores/sucursal'
import { getSucursales } from '../../../services/SucursalesServices'
import { buscarProductosSucursal } from '../../../services/InventarioServices'
import {
    getTraspaso, createTraspaso, updateTraspaso, enviarTraspaso, recibirTraspaso, cancelarTraspaso
} from '../../../services/TraspasosServices'
import { parsearFechaCalendario, fechaCalendarioISO } from '../../../utils/formato'
import { ESTATUS_DESCRIPCION, agregarProducto, cantidadValida, validarTraspaso } from '../../../utils/traspasos'

const props = defineProps({
    // null = traspaso nuevo
    traspasoId: { type: Number, default: null },
})

const emit = defineEmits(['cerrar', 'guardado'])

const sucursalStore = useSucursalStore()

const sucursales = ref([])
const comentarios = ref('')
const origen = ref(null)
const destino = ref(null)
const promesa = ref(null)
const estatus = ref('Nuevo')
const items = ref([])

const busqueda = ref('')
const resultados = ref([])
const buscando = ref(false)
const productoSeleccionado = ref(null)
const cantidadNueva = ref('')

const menuAbierto = ref(null)
const cargando = ref(false)
const procesando = ref(false)
const error = ref(null)
const errorProducto = ref(null)

const hoy = new Date(new Date().setHours(0, 0, 0, 0))

const editable = computed(() => estatus.value === 'Nuevo')
const descripcionEstatus = computed(() =>
    props.traspasoId ? ESTATUS_DESCRIPCION[estatus.value] : 'El traspaso no ha sido guardado'
)
const destinosDisponibles = computed(() => sucursales.value.filter(s => s.id !== origen.value?.id))

const toggleMenu = (menu) => {
    menuAbierto.value = menuAbierto.value === menu ? null : menu
}

const limpiarBusqueda = () => {
    busqueda.value = ''
    resultados.value = []
    productoSeleccionado.value = null
    cantidadNueva.value = ''
}

const seleccionarOrigen = (s) => {
    menuAbierto.value = null
    if (s.id === origen.value?.id) return
    if (items.value.length && !confirm('Cambiar el origen quitará los productos agregados. ¿Continuar?')) return
    origen.value = s
    items.value = []
    if (destino.value?.id === s.id) destino.value = null
    limpiarBusqueda()
}

const seleccionarDestino = (s) => {
    destino.value = s
    menuAbierto.value = null
}

let debounce = null
const onBusquedaInput = () => {
    productoSeleccionado.value = null
    errorProducto.value = null
    clearTimeout(debounce)
    if (!busqueda.value.trim()) {
        resultados.value = []
        menuAbierto.value = null
        return
    }
    debounce = setTimeout(buscar, 300)
}

const buscar = async () => {
    const termino = busqueda.value.trim()
    if (!termino || !origen.value) return
    buscando.value = true
    menuAbierto.value = 'productos'
    try {
        const encontrados = await buscarProductosSucursal(origen.value.id, termino)
        // la búsqueda pudo cambiar mientras llegaba la respuesta
        if (termino === busqueda.value.trim()) resultados.value = encontrados
    } catch (e) {
        errorProducto.value = e.message
        resultados.value = []
    } finally {
        buscando.value = false
    }
}

const seleccionarResultado = (r) => {
    productoSeleccionado.value = r
    busqueda.value = r.nombre
    menuAbierto.value = null
    cantidadNueva.value = ''
}

const agregar = () => {
    const { items: nuevos, error: mensaje } = agregarProducto(items.value, productoSeleccionado.value, cantidadNueva.value)
    errorProducto.value = mensaje
    if (mensaje) return
    items.value = nuevos
    limpiarBusqueda()
}

const quitar = (item) => {
    items.value = items.value.filter(i => i !== item)
}

const construirPayload = () => ({
    comentarios: comentarios.value.trim() || null,
    sucursal_origen_id: origen.value.id,
    sucursal_destino_id: destino.value.id,
    promesa_entrega: fechaCalendarioISO(promesa.value),
    productos: items.value.map(i => ({ producto_id: i.producto_id, cantidad: Number(i.cantidad) })),
})

const ejecutar = async (accion) => {
    procesando.value = true
    error.value = null
    try {
        await accion()
        emit('guardado')
        emit('cerrar')
    } catch (e) {
        error.value = e.message
    } finally {
        procesando.value = false
    }
}

const guardar = (enviar) => {
    const errores = validarTraspaso({ origenId: origen.value?.id, destinoId: destino.value?.id, items: items.value })
    if (errores.length) {
        error.value = errores.join('. ')
        return
    }
    if (enviar && !confirm('Al enviar se descontará la mercancía de la sucursal de origen. ¿Continuar?')) return

    return ejecutar(async () => {
        const payload = construirPayload()
        const traspaso = props.traspasoId
            ? await updateTraspaso(props.traspasoId, payload)
            : await createTraspaso(payload)
        if (enviar) await enviarTraspaso(traspaso.id)
    })
}

const recibir = () => {
    if (!confirm(`Se agregará la mercancía al inventario de ${destino.value?.sucursal}. ¿Continuar?`)) return
    return ejecutar(() => recibirTraspaso(props.traspasoId))
}

const cancelar = () => {
    const aviso = estatus.value === 'Enviado'
        ? 'La mercancía regresará al inventario de la sucursal de origen. '
        : ''
    if (!confirm(`${aviso}¿Cancelar el traspaso #${props.traspasoId}?`)) return
    return ejecutar(() => cancelarTraspaso(props.traspasoId))
}

const cargarTraspaso = async () => {
    const t = await getTraspaso(props.traspasoId)
    comentarios.value = t.comentarios ?? ''
    estatus.value = t.estatus
    origen.value = sucursales.value.find(s => s.id === t.sucursal_origen_id) ?? { id: t.sucursal_origen_id, sucursal: t.origen }
    destino.value = sucursales.value.find(s => s.id === t.sucursal_destino_id) ?? { id: t.sucursal_destino_id, sucursal: t.destino }
    promesa.value = parsearFechaCalendario(t.promesa_entrega)
    items.value = t.detalles.map(d => ({
        producto_id: d.producto_id,
        codigo: d.codigo,
        nombre: d.nombre,
        descripcion: d.descripcion,
        codigo_externo: d.codigo_externo,
        punto_reorden: d.punto_reorden,
        existencia: d.existencia_origen,
        cantidad: d.cantidad_solicitada,
    }))
}

onMounted(async () => {
    cargando.value = true
    try {
        sucursales.value = await getSucursales()
        if (props.traspasoId) {
            await cargarTraspaso()
        } else {
            origen.value = sucursales.value.find(s => s.id === sucursalStore.sucursalSeleccionada?.id) ?? null
        }
    } catch (e) {
        error.value = e.message
    } finally {
        cargando.value = false
    }
})
</script>