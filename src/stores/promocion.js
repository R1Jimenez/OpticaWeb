import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getPromocion, createPromocion, updatePromocion } from '../services/PromocionesServices'
import { fechaCalendarioISO, parsearFechaCalendario } from '../utils/formato'

// Cada pestaña elige un criterio de su grupo; lista vacía = la promoción aplica a todos
export const GRUPOS = {
    venta: ['tipos_venta', 'plazos'],
    producto: ['productos', 'atributos_valores'],
    cliente: ['clientes', 'tipos_cliente'],
}
const CATEGORIAS = Object.values(GRUPOS).flat()

const condicionesVacias = () => Object.fromEntries(CATEGORIAS.map(c => [c, []]))
const criteriosIniciales = () => Object.fromEntries(Object.entries(GRUPOS).map(([g, cats]) => [g, cats[0]]))

// Estado de la promoción en captura; las pestañas de Promociones se desmontan al cambiar, así que viven aquí
export const usePromocionStore = defineStore('promocion', () => {
    const id = ref(null)
    const nombre = ref('')
    const descuento = ref('')
    const descuentoMaxVendedor = ref('')
    const acumulativa = ref(false)
    const permanente = ref(false)
    const fechaInicio = ref(null)
    const fechaFin = ref(null)
    const sucursalesIds = ref([])
    // { categoria: [{ id, etiqueta }] }
    const condiciones = reactive(condicionesVacias())
    const criterios = reactive(criteriosIniciales())

    function resetear() {
        id.value = null
        nombre.value = ''
        descuento.value = ''
        descuentoMaxVendedor.value = ''
        acumulativa.value = false
        permanente.value = false
        fechaInicio.value = null
        fechaFin.value = null
        sucursalesIds.value = []
        Object.assign(condiciones, condicionesVacias())
        Object.assign(criterios, criteriosIniciales())
    }

    function aplicar(p) {
        id.value = p.id
        nombre.value = p.nombre
        descuento.value = Number(p.descuento)
        descuentoMaxVendedor.value = Number(p.descuento_max_vendedor)
        acumulativa.value = p.acumulativa
        permanente.value = p.permanente
        fechaInicio.value = parsearFechaCalendario(p.fecha_inicio)
        fechaFin.value = parsearFechaCalendario(p.fecha_fin)
        sucursalesIds.value = p.sucursales.map(s => s.id)
        CATEGORIAS.forEach(c => { condiciones[c] = [...(p[c] ?? [])] })
        Object.entries(GRUPOS).forEach(([grupo, [a, b]]) => {
            criterios[grupo] = condiciones[b].length ? b : a
        })
    }

    // Cambia el criterio de un grupo y descarta lo capturado en el otro
    function cambiarCriterio(grupo, categoria) {
        GRUPOS[grupo].filter(c => c !== categoria).forEach(c => { condiciones[c] = [] })
        criterios[grupo] = categoria
    }

    function agregarCondicion(categoria, elemento) {
        if (!condiciones[categoria].some(e => e.id === elemento.id)) {
            condiciones[categoria] = [...condiciones[categoria], elemento]
        }
    }

    function quitarCondiciones(categoria, ids) {
        condiciones[categoria] = condiciones[categoria].filter(e => !ids.includes(e.id))
    }

    async function cargar(promocionId) {
        aplicar(await getPromocion(promocionId))
    }

    function errores() {
        const lista = []
        const desc = Number(descuento.value)
        const descVend = descuentoMaxVendedor.value === '' ? 0 : Number(descuentoMaxVendedor.value)
        if (!nombre.value.trim()) lista.push('Ingrese el nombre de la promoción')
        if (!(desc > 0 && desc <= 100)) lista.push('El descuento debe ser mayor a 0 y máximo 100')
        if (!(descVend >= 0 && descVend <= 100)) lista.push('El descuento máximo del vendedor debe estar entre 0 y 100')
        else if (desc > 0 && descVend > desc) lista.push('El descuento máximo del vendedor no puede ser mayor al descuento')
        if (!permanente.value) {
            if (!fechaInicio.value || !fechaFin.value) lista.push('Indique la vigencia o marque la promoción como permanente')
            else if (fechaFin.value < fechaInicio.value) lista.push('La fecha de fin no puede ser anterior a la de inicio')
        }
        if (!sucursalesIds.value.length) lista.push('Agregue al menos una sucursal')
        return lista
    }

    function payload() {
        return {
            nombre: nombre.value.trim(),
            descuento: Number(descuento.value),
            descuento_max_vendedor: descuentoMaxVendedor.value === '' ? 0 : Number(descuentoMaxVendedor.value),
            acumulativa: acumulativa.value,
            permanente: permanente.value,
            fecha_inicio: permanente.value ? null : fechaCalendarioISO(fechaInicio.value)?.slice(0, 10) ?? null,
            fecha_fin: permanente.value ? null : fechaCalendarioISO(fechaFin.value)?.slice(0, 10) ?? null,
            sucursales: sucursalesIds.value,
            ...Object.fromEntries(CATEGORIAS.map(c => [c, condiciones[c].map(e => e.id)])),
        }
    }

    async function guardar() {
        const guardada = id.value ? await updatePromocion(id.value, payload()) : await createPromocion(payload())
        aplicar(guardada)
        return guardada
    }

    return {
        id, nombre, descuento, descuentoMaxVendedor, acumulativa, permanente, fechaInicio, fechaFin, sucursalesIds,
        condiciones, criterios,
        resetear, cargar, errores, payload, guardar, cambiarCriterio, agregarCondicion, quitarCondiciones,
    }
})
