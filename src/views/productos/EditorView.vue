<style scoped>
.EditorPrincipal {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: .5%;
    padding-top: 1%;
    padding-bottom: 0%;
    gap: 1.5%;
}

.EditorContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.EditorUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin-top: 1%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #130348 #F0F0F0;
    padding-bottom: 1%;
    box-sizing: border-box;
    gap: 20px;
}
</style>

<template>
    <div class="EditorPrincipal">
        <Header />
        <div class="EditorContenido">
            <NavBar />
            <div class="EditorUsages">
                <EditsFilter
                    @abrirNuevoProd="abrirNuevo"
                    @buscar="buscarProductos"
                />
                <EditsTable
                    :productos="productos"
                    @EditProdMod="() => { modoEdicion = 'editar'; ModProdAb = true }"
                    @EditPrecMod="abrirPrecios"
                    @EditInv="abrirInventarioEdicion"
                    @editProdMod="abrirEdicion"
                />
            </div>
        </div>
        <EditProd 
            v-if="ModProdAb"
            :modo="modoEdicion"
            @Cerr="ModProdAb = false"
            @productoCreado="onProductoCreado"
        />
        <DisponibilidadModal
            v-if="ModDisponibilidadAb"
            @close="cancelarFlujoCreacion"
            @confirmar="onDisponibilidadConfirmada"
        />
        <CrearInvModal
            v-if="ModCrearInvAb"
            :producto-id="productoIdPrecio"
            :sucursales-seleccionadas="sucursalesSeleccionadas"
            @close="cancelarFlujoCreacion"
            @confirmar="onInventarioCreado"
        />
        <EditPrec
            v-if="ModPrecEd"
            :producto-id="productoIdPrecio"
            :sucursales-permitidas="sucursalesSeleccionadas.map(s => s.id)"
            @CerrPrec="cerrarPrecios"
        />
        <EditInv
            v-if="ModInvEd"
            :producto-id="productoIdInventario"
            @CerrInv="cerrarInventarioEdicion"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductoEditorStore } from '../../stores/productoeditor'
import { ProductosService } from '../../services/ProductosServices'
import EditsFilter from '../../components/prod/editorview/EditsFilter.vue';
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import EditsTable from '../../components/prod/editorview/EditsTable.vue';
import EditProd from '../../components/prod/editorview/EditProd.vue';
import EditPrec from '../../components/prod/editorview/EditPrec.vue';
import EditInv from '../../components/prod/editorview/EditInv.vue';
import DisponibilidadModal from '../../components/prod/editorview/editinv/DisponibilidadModal.vue';
import CrearInvModal from '../../components/prod/editorview/editinv/CrearInvModal.vue';

const ModProdAb = ref(false)
const ModPrecEd = ref(false)
const ModInvEd = ref(false)
const ModDisponibilidadAb = ref(false)
const ModCrearInvAb = ref(false)
const modoEdicion = ref('editar')
const store = useProductoEditorStore()
const productoIdPrecio = ref(null)
const productoIdInventario = ref(null)
const sucursalesSeleccionadas = ref([])

const productos = ref([])

const cargarTodos = async () => {
    try {
        productos.value = await ProductosService.getAll()
    } catch (error) {
        console.error('Error al cargar productos:', error)
    }
}

const buscarProductos = async (filtros) => {
    try {
        if (!filtros.codigo && !filtros.nombre && filtros.estatus === null) {
            await cargarTodos()
            return
        }
        productos.value = await ProductosService.getFiltered(filtros)
    } catch (error) {
        console.error('Error al filtrar productos:', error)
    }
}

const opcionesMapa = {
    estatus: [{ id:1, label:'Activo' }, { id: 2, label: 'Inactivo' }],
    tipo: [{ id: 1, label: 'Producto' }, { id:2, label: 'Servicio' }],
    generaOrden: [{ id: 1, label: 'Si'}, { id: 2, label: 'No' }],
    unidad: [{ id: 'Pieza', label: 'Pieza' }],
    tipoIva: [{ id: 1, label: 'Normal' }, { id: 2, label: 'Exento' }]
}

const abrirEdicion = (producto) => {
    store.cargarProducto(producto, opcionesMapa)
    modoEdicion.value = 'editar'
    ModProdAb.value = true
}

const abrirNuevo = () => {
    store.resetear()
    modoEdicion.value = 'nuevo'
    ModProdAb.value = true
}

const onProductoCreado = (id) => {
    ModProdAb.value = false
    productoIdPrecio.value = id
    sucursalesSeleccionadas.value = []
    ModDisponibilidadAb.value = true
    cargarTodos()
}

const onDisponibilidadConfirmada = (seleccion) => {
    sucursalesSeleccionadas.value = seleccion
    ModDisponibilidadAb.value = false
    ModCrearInvAb.value = true
}

const onInventarioCreado = () => {
    ModCrearInvAb.value = false
    ModPrecEd.value = true
}

const cancelarFlujoCreacion = () => {
    ModDisponibilidadAb.value = false
    ModCrearInvAb.value = false
    productoIdPrecio.value = null
    sucursalesSeleccionadas.value = []
    cargarTodos()
}

const cerrarPrecios = () => {
    ModPrecEd.value = false
    productoIdPrecio.value = null
    sucursalesSeleccionadas.value = []
    cargarTodos()
}

const abrirPrecios = (producto) => {
    if (!producto || !producto.id) {
        console.warn('abrirPrecios: se intento abrir el modal de precios sin un producto valido', producto)
        return
    }
    productoIdPrecio.value = producto.id
    sucursalesSeleccionadas.value = []
    ModPrecEd.value = true
}

const abrirInventarioEdicion = (producto) => {
    if (!producto || !producto.id) {
        console.warn('abrirInventarioEdicion: se intento abrir el modal de inventario sin un producto valido', producto)
        return
    }
    productoIdInventario.value = producto.id
    ModInvEd.value = true
}

const cerrarInventarioEdicion = () => {
    ModInvEd.value = false
    productoIdInventario.value = null
}

onMounted(() => {
    cargarTodos()
})
</script>