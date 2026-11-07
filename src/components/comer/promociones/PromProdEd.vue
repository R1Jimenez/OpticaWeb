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
    <PromAtributos
        v-if="porAtributo"
        :model-value="promo.condiciones.atributos_valores"
        @agregar="promo.agregarCondicion('atributos_valores', $event)"
        @quitar="promo.quitarCondiciones('atributos_valores', $event)"
    />
    <PromBuscadorLista
        v-else
        etiqueta="Producto"
        placeholder="Buscar por código, nombre o código externo"
        ayuda-vacio="Sin productos: aplica a todos los productos"
        :buscar="buscarProducto"
        :model-value="promo.condiciones.productos"
        @agregar="promo.agregarCondicion('productos', $event)"
        @eliminar="promo.quitarCondiciones('productos', $event)"
    />
</template>

<script setup>
import { computed } from 'vue'
import PromCriterio from './PromCriterio.vue'
import PromBuscadorLista from './PromBuscadorLista.vue'
import PromAtributos from './PromAtributos.vue'
import { usePromocionStore } from '../../../stores/promocion'
import { ProductosService } from '../../../services/ProductosServices'

const promo = usePromocionStore()

const porAtributo = computed(() => promo.criterios.producto === 'atributos_valores')

const buscarProducto = async (termino) => {
    const productos = await ProductosService.buscar(termino)
    return productos.map(p => ({ id: p.id, etiqueta: `${p.codigo} - ${p.nombre} (${p.codigo_externo})` }))
}
</script>