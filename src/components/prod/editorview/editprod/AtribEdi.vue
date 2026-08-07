<style scoped>
.FogridAtrib {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 90%;
    margin-left: 30px;
    margin-top: 25px;
    margin-bottom: auto;
}

.FogridAtrib text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.SectBoxAt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
    box-sizing: border-box;
}

.SectBoxAt.placeholder {
    color: #999;
}

.DropWrapper {
    position: relative;
    width: 90%;
}

.SectBoxAt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
    box-sizing: border-box;
}

.DropOpciones {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding-left: 10px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    overflow-y: auto;
    max-height: 150px;
    z-index: 100;
    margin-top: 4px;
}
</style>

<template>
    <div class="FogridAtrib">
        <template v-for="atributo in store.atributos" :key="atributo.id">
            <text>{{ atributo.atributo }}</text>
            <div class="DropWrapper">
                <div class="SectBoxAt" @click="toggleDropdown(atributo.id)">
                    <span :class="{ placeholder: !store.seleccionados[atributo.id] }">
                        {{ store.seleccionados[atributo.id]?.descripcion || 'Seleccionar' }}
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
                <div v-if="dropdownAbierto === atributo.id" class="DropOpciones">
                    <div
                        v-for="valor in valoresPorAtributo[atributo.id] || []"
                        :key="valor.id"
                        class="OpcionItem"
                        @click="seleccionarValor(atributo.id, valor)"
                    >
                        {{ valor.clave }} - {{ valor.descripcion }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AtributosService } from '../../../../services/AtributosService'
import { AtributosValoresService } from '../../../../services/AtributosValoresServices'
import { useProductoEditorStore } from '../../../../stores/productoeditor'

const store = useProductoEditorStore()
const valoresPorAtributo = ref({})
const dropdownAbierto = ref(null)

const cargarAtributos = async () => {
    try {
        const lista = await AtributosService.getAll()
        store.setAtributos(lista)

        for (const atributo of lista) {
            const valores = await AtributosValoresService.getByAtributo(atributo.id)
            valoresPorAtributo.value[atributo.id] = valores

            const pendiente = store.seleccionados[atributo.id]
            if (pendiente?._pendingId) {
                const valorCompleto = valores.find(v => v.id === pendiente._pendingId)
                if (valorCompleto) {
                    store.seleccionarValor(atributo.id, valorCompleto)
                }
            }
        }
    } catch (error) {
        console.error('Error al cargar atributos:', error)
    }
}

const toggleDropdown = (atributoId) => {
    dropdownAbierto.value = dropdownAbierto.value === atributoId ? null : atributoId
}

const seleccionarValor = (atributoId, valor) => {
    store.seleccionarValor(atributoId, valor)
    dropdownAbierto.value = null  
}

onMounted(() => {
    cargarAtributos()
})
</script>