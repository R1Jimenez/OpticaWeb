<style scoped>
.OverPrinc {
    display: flex;
    flex-direction: column;
    gap: 5%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.EditProdPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    height: 60%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
}

.HeadEdProd {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 16px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
    flex-shrink: 0;
    border-top-left-radius: 21px;
    border-top-right-radius: 21px;
}

.HeadEdProd span {
    font-size: 1.2rem;
    font-weight: 550;
    color: white;
}

.ModCont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.butonSection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding: 5px 25px;
    width: 100%;
    gap: 10px;
    border-top: 1px solid #130348;
}

.Guar {
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    font-size: 1rem;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.Guar:hover {
    background: white;
    border: 1px solid #58B358;
    color: #58B358;
    font-weight: 600;
}

.Can {
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #b91623 100%
    );
    font-size: 1rem;
    color: white;
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.Can:hover {
    background: white;
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
    font-weight: 600;
}

.ModUsages {
    display: flex;
    flex-direction: column;
    width: 97%;
    height: 97%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
}

.HeadUs {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: left;
    width: 100%;
    padding: 5px 16px 0px 16px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    gap: 5px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.UsagesPrinc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.ButOp {
    padding: 3px 7px;
    font-size: 1rem;
    font-weight: 500;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-left: 1px solid white;
    border-right: 1px solid white;
    cursor: pointer;
}

.ButOp:hover {
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #F0F0F0 100%
    );
}

.ButOp.active {
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    color: #130348;
}
</style>

<template>
    <div class="OverPrinc" @click.self="$emit('Cerr')">
        <div class="EditProdPrinc">
            <div class="HeadEdProd">
                <span>{{ modo === 'editar' ? 'Editar Producto' : 'Crear Producto' }}</span>
            </div>
            <div class="ModCont">
                <div class="ModUsages">
                    <div class="HeadUs">
                        <div
                            v-for="op in OpBut"
                            :key="op"
                            class="ButOp"
                            :class="{ active: sellop === op}"
                            @click="selectedOp(op)"
                        >
                            <text>{{ op }}</text>
                        </div>
                    </div>
                    <div class="UsagesPrinc">
                        <DatGener v-if="sellop === 'Datos Generales'" />
                        <AtribEdi v-else-if="sellop === 'Atributos'" />
                        <Proves v-else-if="sellop === 'Provedores'" />
                    </div>
                </div>
            </div>
            <div class="butonSection">
                <button class="Can" @click.self="$emit('Cerr')">
                    Cancelar
                </button>
                <button class="Guar" @click="guardar">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import DatGener from './editprod/DatGener.vue'
import AtribEdi from './editprod/AtribEdi.vue'
import Proves from './editprod/Proves.vue'
import { useProductoEditorStore } from '../../../stores/productoeditor.js'
import { ProductosService } from '../../../services/ProductosServices.js'

const emit = defineEmits(['Cerr', 'ProductoCreado'])  

const store = useProductoEditorStore()

const props = defineProps({
    modo: { type: String, default: 'editar' }
})

const OpBut = ['Datos Generales', 'Atributos', 'Provedores']
const sellop = ref('Datos Generales')

const selectedOp = (op) => { sellop.value = op }

const guardar = async () => {
    const p = store.payload

    if (p.estatus === null || p.tipo === null || p.genera_orden === null || p.unidad === null || p.tipo_iva === null) {
        alert('Por favor completa todos los campos requeridos')
        return
    }
    if (!p.codigo_externo.trim() || !p.descripcion.trim()) {
        alert('Por favor ingresa el código externo y la descripción')
        return
    }

    try {
        if (props.modo === 'editar' && store.productoId) {
            await ProductosService.update(store.productoId, p)
            store.resetear()
            emit('Cerr')
        } else {
            const nuevo = await ProductosService.create(p)
            store.resetear()
            emit('ProductoCreado', nuevo.id)
        }
    } catch (error) {
        console.error('Error al guardar producto:', error)
        alert('Error al guardar el producto')
    }
}

onUnmounted(() => { store.resetear() })
</script>