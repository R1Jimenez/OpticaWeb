<style scoped>
.rowtip {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 1.5%;
}

.PromClitable text {
    font-size: 1.2rem;
    color: #130348;
}

.tabrow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3%;
    white-space: nowrap;
}

.check {
    border: 1px solid #FB1C2E;
    border-radius: 15px;
}

.ProdRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.ProdRow2 {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.ProdRow text{
    font-size: 1.3rem;
    font-weight: 600;
    color: #130348;
}

.ProdRow2 text{
    font-size: 1.3rem;
    font-weight: 600;
    color: #130348;
}

.bars3 {
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

.bars4 {
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
    resize: none;
    font-family: inherit;
    min-height: 2.2rem;   
}

.AgBut {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15%;
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: .2%;
    gap: 7%;
    color: white;
    font-size: .9rem;
    font-weight: 600;
}

.ElBut {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #130348;
    border-radius: 15px;
    padding: .1%;
    gap: 7%;
    color: #130348;
    font-size: .9rem;
    font-weight: 600;
}
</style>

<template>
    <PromCriterio
        grupo="cliente"
        :opciones="[
            { categoria: 'clientes', etiqueta: 'Por Cliente especifico' },
            { categoria: 'tipos_cliente', etiqueta: 'Por Tipo de Cliente' },
        ]"
    />
    <PromListaDoble
        v-if="porTipo"
        titulo="Tipos de Cliente"
        :opciones="tiposCliente"
        :model-value="promo.condiciones.tipos_cliente"
        texto-vacio="Sin selección: aplica a todos los tipos de cliente"
        :cargando="cargandoTipos"
        :error="errorTipos"
        cy="tipocli"
        @agregar="$event.forEach(o => promo.agregarCondicion('tipos_cliente', o))"
        @quitar="promo.quitarCondiciones('tipos_cliente', $event)"
    />
    <PromBuscadorLista
        v-else
        etiqueta="Cliente"
        placeholder="Buscar cliente por nombre o apellido"
        ayuda-vacio="Sin clientes: aplica a todos los clientes"
        :buscar="buscarCliente"
        :model-value="promo.condiciones.clientes"
        @agregar="promo.agregarCondicion('clientes', $event)"
        @eliminar="promo.quitarCondiciones('clientes', $event)"
    />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PromCriterio from './PromCriterio.vue'
import PromBuscadorLista from './PromBuscadorLista.vue'
import PromListaDoble from './PromListaDoble.vue'
import { usePromocionStore } from '../../../stores/promocion'
import { getTiposCliente } from '../../../services/TipoClienteServices'
import { authHeaders } from '../../../services/authHeader'

const promo = usePromocionStore()

const porTipo = computed(() => promo.criterios.cliente === 'tipos_cliente')

const tiposCliente = ref([])
const cargandoTipos = ref(false)
const errorTipos = ref(null)

const buscarCliente = async (termino) => {
    const res = await fetch(
        `http://127.0.0.1:8000/cliente/search?cliente=${encodeURIComponent(termino)}`,
        { headers: authHeaders() }
    )
    if (!res.ok) throw new Error('Error al buscar clientes')
    const clientes = await res.json()
    return clientes.map(c => ({ id: c.id, etiqueta: `${c.nombres} ${c.apellidos}` }))
}

const cargarTiposCliente = async () => {
    if (tiposCliente.value.length || cargandoTipos.value) return
    cargandoTipos.value = true
    errorTipos.value = null
    try {
        tiposCliente.value = (await getTiposCliente()).map(t => ({ id: t.id, etiqueta: t.cliente }))
    } catch (e) {
        errorTipos.value = e.message
    } finally {
        cargandoTipos.value = false
    }
}

watch(porTipo, (activo) => { if (activo) cargarTiposCliente() }, { immediate: true })
</script>