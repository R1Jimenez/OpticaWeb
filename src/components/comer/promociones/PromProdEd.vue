<style scoped>
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

.rowtip {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 1.5%;
}

.PromProdtable text {
    font-size: 1.2rem;
    color: #130348;
}
</style>

<template>
    <PromCriterio
        grupo="producto"
        :opciones="[
            { categoria: 'productos', etiqueta: 'Por Producto especifico' },
            { categoria: 'atributos_valores', etiqueta: 'Por atributo de producto' },
        ]"
    />
    <PromBuscadorLista
        :key="categoria"
        :etiqueta="porAtributo ? 'Atributo' : 'Producto'"
        :placeholder="porAtributo ? 'Buscar atributo o valor (ej. Marca, RayBan)' : 'Buscar por código, nombre o código externo'"
        :ayuda-vacio="porAtributo ? 'Sin atributos: aplica a todos los productos' : 'Sin productos: aplica a todos los productos'"
        :buscar="porAtributo ? buscarAtributo : buscarProducto"
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
import { ProductosService } from '../../../services/ProductosServices'
import { AtributosService } from '../../../services/AtributosService'
import { AtributosValoresService } from '../../../services/AtributosValoresServices'

const promo = usePromocionStore()

const categoria = computed(() => promo.criterios.producto)
const porAtributo = computed(() => categoria.value === 'atributos_valores')

const buscarProducto = async (termino) => {
    const productos = await ProductosService.buscar(termino)
    return productos.map(p => ({ id: p.id, etiqueta: `${p.codigo} - ${p.nombre} (${p.codigo_externo})` }))
}

// Catálogo pequeño: se descarga una vez y se filtra en el navegador
let valoresCache = null
const buscarAtributo = async (termino) => {
    if (!valoresCache) {
        const [atributos, valores] = await Promise.all([AtributosService.getAll(), AtributosValoresService.getAll()])
        const nombreAtributo = Object.fromEntries(atributos.map(a => [a.id, a.atributo]))
        valoresCache = valores.map(v => ({ id: v.id, etiqueta: `${nombreAtributo[v.atributo_id] ?? 'Atributo'}: ${v.descripcion}` }))
    }
    const t = termino.toLowerCase()
    return valoresCache.filter(v => v.etiqueta.toLowerCase().includes(t)).slice(0, 30)
}
</script>