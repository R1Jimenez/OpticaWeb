import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ProductosService } from '../services/ProductosServices'
import { getInventarioSucursal } from '../services/InventarioServices'

// Comparte la lista de inventario (filtrada) entre ProductSearch y ProductTable (vent/inventarioview)
export const useInventarioProductosStore = defineStore('inventarioProductos', () => {
    const filtros = ref({ nombre: '', codigo: '', estatus: 1 })
    const productos = ref([])
    const isLoading = ref(false)
    const errorMessage = ref(null)

    function setFiltros(nuevos) {
        filtros.value = { ...filtros.value, ...nuevos }
    }

    async function cargarProductos(sucursalId) {
        if (!sucursalId) {
            productos.value = []
            return
        }

        isLoading.value = true
        errorMessage.value = null
        try {
            const [inventarios, catalogo] = await Promise.all([
                getInventarioSucursal(sucursalId),
                ProductosService.getFiltered({
                    nombre: filtros.value.nombre || undefined,
                    codigo: filtros.value.codigo || undefined,
                    estatus: filtros.value.estatus,
                }),
            ])

            const catalogoPorId = new Map(catalogo.map((p) => [p.id, p]))

            // El catálogo ya viene filtrado; solo se conservan renglones de inventario cuyo producto pasó el filtro
            productos.value = inventarios
                .map((inv) => {
                    const producto = catalogoPorId.get(inv.producto_id)
                    if (!producto) return null
                    return {
                        id: `${sucursalId}-${inv.producto_id}`,
                        producto,
                        existencia_actual: inv.existencia_actual ?? 0,
                        punto_reorden: inv.punto_reorden ?? 0,
                    }
                })
                .filter(Boolean)
        } catch (error) {
            console.error('Error al cargar el inventario de la sucursal:', error)
            errorMessage.value = error.message
            productos.value = []
        } finally {
            isLoading.value = false
        }
    }

    return { filtros, productos, isLoading, errorMessage, setFiltros, cargarProductos }
})
