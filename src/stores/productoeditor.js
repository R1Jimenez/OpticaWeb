// productoeditor.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductoEditorStore = defineStore('productoEditor', () => {
    const atributos = ref([])
    const seleccionados = ref({})

    // Campos de DatGener
    const productoId = ref(null)
    const nombre = ref(null)
    const codigo = ref(null)
    const codigoExterno = ref('')
    const descripcion = ref('')
    const estatus = ref(null)
    const tipo = ref(null)
    const generaOrden = ref(null)
    const unidad = ref(null)
    const tipoIva = ref(null)

    const codigoGenerado = computed(() => {
        return atributos.value
            .map(a => seleccionados.value[a.id]?.clave || '')
            .join('')
    })

    const nombreGenerado = computed(() => {
        return atributos.value
            .map(a => seleccionados.value[a.id]?.descripcion)
            .filter(Boolean)
            .join(' ')
    })

    // Arma el payload listo para mandar al backend
    const payload = computed(() => {
        const atributos_seleccionados = {}
        atributos.value.forEach(a => {
            atributos_seleccionados[a.id] = seleccionados.value[a.id]?.id ?? null
        })

        return {
            atributos_seleccionados,
            codigo_externo: codigoExterno.value,
            descripcion: descripcion.value,
            estatus: estatus.value?.id ?? null,
            tipo: tipo.value?.id ?? null,
            genera_orden: generaOrden.value?.id ?? null,
            unidad: unidad.value?.id ?? null,
            tipo_iva: tipoIva.value?.id ?? null
        }
    })

    function setAtributos(lista) {
        atributos.value = lista
    }

    function seleccionarValor(atributoId, valor) {
        seleccionados.value[atributoId] = valor
    }

    function cargarProducto(producto, opcionesMapa) {
        productoId.value = producto.id
        nombre.value = producto.nombre
        codigo.value = producto.codigo
        codigoExterno.value = producto.codigo_externo
        descripcion.value = producto.descripcion
        estatus.value = opcionesMapa.estatus.find(o => o.id === producto.estatus) ?? null
        tipo.value = opcionesMapa.tipo.find(o => o.id === producto.tipo) ?? null
        generaOrden.value = opcionesMapa.generaOrden.find(o => o.id === producto.genera_orden) ?? null
        unidad.value = opcionesMapa.unidad.find(o => o.id === producto.unidad) ?? null
        tipoIva.value = opcionesMapa.tipoIva.find(o => o.id === producto.tipo_iva) ?? null

        seleccionados.value = {}
        Object.entries(producto.atributos_seleccionados).forEach(([atributoId, valorId]) => {
            seleccionados.value[atributoId] = { _pendingId: valorId }
        })
    }

    function resetear() {
        productoId.value = null
        nombre.value = ''
        codigo.value = ''
        seleccionados.value = {}
        atributos.value = []
        codigoExterno.value = ''
        descripcion.value = ''
        estatus.value = null
        tipo.value = null
        generaOrden.value = null
        unidad.value = null
        tipoIva.value = null
    }

    return {
        productoId, atributos, seleccionados,
        codigoExterno, descripcion, estatus, tipo, generaOrden, unidad, tipoIva,
        codigoGenerado, nombreGenerado, payload, nombre, codigo,
        setAtributos, seleccionarValor, cargarProducto, resetear
    }
})