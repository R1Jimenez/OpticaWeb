<template>
    <PromCriterio
        grupo="venta"
        :opciones="[
            { categoria: 'tipos_venta', etiqueta: 'Por Tipo de Venta' },
            { categoria: 'plazos', etiqueta: 'Por Plazo' },
        ]"
    />
    <PromListaDoble
        :key="categoria"
        :titulo="esPlazo ? 'Plazos' : 'Tipos de Venta'"
        :opciones="esPlazo ? plazos : tiposVenta"
        :model-value="promo.condiciones[categoria]"
        :texto-vacio="esPlazo ? 'Sin selección: aplica a todos los plazos' : 'Sin selección: aplica a todos los tipos de venta'"
        :cargando="cargando"
        :error="error"
        cy="venta"
        @agregar="$event.forEach(o => promo.agregarCondicion(categoria, o))"
        @quitar="promo.quitarCondiciones(categoria, $event)"
    />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PromCriterio from './PromCriterio.vue'
import PromListaDoble from './PromListaDoble.vue'
import { usePromocionStore } from '../../../stores/promocion'
import { TipoVentaService } from '../../../services/TipoVentaServices'
import { PlazoService } from '../../../services/PlazoServices'

const promo = usePromocionStore()

const tiposVenta = ref([])
const plazos = ref([])
const cargando = ref(false)
const error = ref(null)

const categoria = computed(() => promo.criterios.venta)
const esPlazo = computed(() => categoria.value === 'plazos')

onMounted(async () => {
    cargando.value = true
    try {
        const [tv, pl] = await Promise.all([TipoVentaService.getAll(), PlazoService.getAll()])
        tiposVenta.value = tv.map(t => ({ id: t.id, etiqueta: t.venta }))
        const nombreTipo = Object.fromEntries(tv.map(t => [t.id, t.venta]))
        plazos.value = pl.map(p => ({
            id: p.id,
            etiqueta: nombreTipo[p.tipo_venta_id] ? `${p.plazo} (${nombreTipo[p.tipo_venta_id]})` : p.plazo,
        }))
    } catch (e) {
        error.value = e.message
    } finally {
        cargando.value = false
    }
})
</script>