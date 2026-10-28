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
    <PromBuscadorLista
        :key="categoria"
        :etiqueta="porTipo ? 'Tipo de Cliente' : 'Cliente'"
        :placeholder="porTipo ? 'Buscar tipo de cliente' : 'Buscar cliente por nombre o apellido'"
        :ayuda-vacio="porTipo ? 'Sin tipos de cliente: aplica a todos los clientes' : 'Sin clientes: aplica a todos los clientes'"
        :buscar="porTipo ? buscarTipoCliente : buscarCliente"
        :model-value="promo.condiciones[categoria]"
        @agregar="promo.agregarCondicion(categoria, $event)"
        @eliminar="promo.quitarCondiciones(categoria, $event)"
    />
</template>

<script setup>
import { computed } from 'vue'
import PromCriterio from './PromCriterio.vue'
import PromBuscadorLista from './PromBuscadorLista.vue'
import { usePromocionStore } from '../../../stores/promocion'
import { getTiposCliente } from '../../../services/TipoClienteServices'
import { authHeaders } from '../../../services/authHeader'

const promo = usePromocionStore()

const categoria = computed(() => promo.criterios.cliente)
const porTipo = computed(() => categoria.value === 'tipos_cliente')

const buscarCliente = async (termino) => {
    const res = await fetch(
        `http://127.0.0.1:8000/cliente/search?cliente=${encodeURIComponent(termino)}`,
        { headers: authHeaders() }
    )
    if (!res.ok) throw new Error('Error al buscar clientes')
    const clientes = await res.json()
    return clientes.map(c => ({ id: c.id, etiqueta: `${c.nombres} ${c.apellidos}` }))
}

let tiposCache = null
const buscarTipoCliente = async (termino) => {
    if (!tiposCache) {
        tiposCache = (await getTiposCliente()).map(t => ({ id: t.id, etiqueta: t.cliente }))
    }
    const t = termino.toLowerCase()
    return tiposCache.filter(tc => tc.etiqueta.toLowerCase().includes(t))
}
</script>