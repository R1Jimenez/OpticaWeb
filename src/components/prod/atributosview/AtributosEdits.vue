<style scoped>
.AtriEdsPrinc {
    display: flex;
    flex-direction: column;
    width: 93%;
    height: 40%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    flex-shrink: 0;
    min-height: 0;
}

.MinHeadEds {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 7px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
}

.MinHeadEds.editando {
    background: radial-gradient(
        ellipse at center,
        #8B0000 10%,
        #5C0000 100%
    );
    border-bottom: 1.5px solid #FFD700;
}

.MinHeadColmn {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40%;
    gap: 5px;
}

.MinHeadColmn text {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    padding-left: 16px;
}

.CliBars {
    width: 90%;
    padding: 5px 1rem;
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

.butsec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    gap: 8px; 
}

.AddBut {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 65%;
    padding: 7px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1.5px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.AddBut text{
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.AddBut span{
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.AddBut:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #58B358;
}

.AddBut:hover text{
    color: #58B358;
}

.AddBut:hover span{
    color: #58B358;
}

.RowEds {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.atrielements {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    width: 83%;
    height: 100%;
    min-height: 0;
}

.Atribs {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    background-color: #F0F0F0;
    border: 1.5px solid #130348;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
}

.itemRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: #130348;
}

.itemRow:hover {
    background: radial-gradient(
        ellipse at left,
        #BCBCBC 10%,
        #F0F0F0 100%
    );
}

.itemRow.active {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
}

.ButonSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    gap: 8px; 
}

.butop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    padding: 5px 10px;
    border: 1px solid #130348;
    border-radius: 10px;
    cursor: pointer;
}

.butop:hover {
    background: radial-gradient(
        ellipse at bottom,
        #BCBCBC 50%,
        #F0F0F0 100%
    );
}

.butop text {
    font-size: 1rem;
    font-weight: 500;
    color: #130348;
}

.butop span{
    font-size: 1.2rem;
    font-weight: 500;
    color: #130348;
}

.CancelBut {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 65%;
    padding: 7px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #bb1724 100%
    );
    border: 1.5px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.CancelBut text, .CancelBut span {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.CancelBut:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #FB1C2E;
}

.CancelBut:hover text, .CancelBut:hover span {
    color: #FB1C2E;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="AtriEdsPrinc">
        <div class="MinHeadEds" :class="{ editando: modoEdicion }">
            <div class="MinHeadColmn">
                <text>Atributo:</text>
                <input
                    type=string
                    placeholder="Ingresar Atributo"
                    class="CliBars"
                    v-model="nuevoAtributo"
                    autocomplete="off"
                />
            </div>
            <div class="MinHeadColmn">
                <text>Longitud:</text>
                <input
                    type=string
                    placeholder="Ingresar Longitud"
                    class="CliBars"
                    v-model="nuevaLongitud"
                    autocomplete="off"
                />
            </div>
            <div class="butsec">
                <button class="AddBut" @click="modoEdicion ? guardarEdicion() : crearAtributo()">
                    <span class="material-icons">{{ modoEdicion ? 'save' : 'add' }}</span>
                    <text>{{ modoEdicion ? 'Guardar' : 'Agregar' }}</text>
                </button>
                <button class="CancelBut" @click="cancelarEdicion" v-if="modoEdicion">
                    <span class="material-icons">close</span>
                    <text>Cancelar</text>
                </button>
            </div>
        </div>
        <div class="RowEds">
            <div class="atrielements">
                <div class="Atribs">
                    <div
                        v-for="atributo in atributos"
                        :key="atributo.id"
                        class="itemRow"
                        :class="{ active: atribsec?.id === atributo.id }"
                        @click="selectAtributo(atributo)"
                    >
                        <span>{{ atributo.atributo }} ({{ atributo.longitud }})</span>
                    </div>
                </div>
            </div>
            <div class="ButonSec">
                <button class="butop">
                    <span class="material-icons">north</span>
                    <text>Subir</text>
                </button>
                <button class="butop">
                    <span class="material-icons">south</span>
                    <text>Bajar</text>
                </button>
                <button class="butop" @click="activarEdicion">
                    <span class="material-icons">edit</span>
                    <text>Editar</text>
                </button>
                <button class="butop" @click="eliminarAtributo">
                    <span class="material-icons">delete</span>
                    <text>Eliminar</text>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AtributosService } from '../../../services/AtributosService'
import { useAtributosStore } from '../../../stores/atributos'

const atributos = ref([])
const nuevoAtributo = ref('')
const nuevaLongitud = ref('')
const atribsec = ref(null)
const modoEdicion = ref(false)
const store = useAtributosStore()

const emit = defineEmits(['editando'])

const selectAtributo = (atributo) => {
    atribsec.value = atributo
    store.setAtributo(atributo.id)
}

const activarEdicion = () => {
    if (!atribsec.value) {
        alert('Por favor selecciona un atributo para editar')
        return
    }
    nuevoAtributo.value = atribsec.value.atributo
    nuevaLongitud.value = atribsec.value.longitud
    modoEdicion.value = true
    emit('editando', true)
}

const cancelarEdicion = () => {
    nuevoAtributo.value = ''
    nuevaLongitud.value = ''
    modoEdicion.value = false
    atribsec.value = null
    store.clearAtributo()
    emit('editando', false)
}

const crearAtributo = async () => {
    if (!nuevoAtributo.value.trim() || !nuevaLongitud.value) {
        alert('Por favor ingresa el atributo y la longitud')
        return
    }
    try {
        await AtributosService.create(nuevoAtributo.value.trim(), parseInt(nuevaLongitud.value))
        nuevoAtributo.value = ''
        nuevaLongitud.value = ''
        await cargarAtributos()
    } catch (error) {
        console.error('Error al crear atributo:', error)
        alert('Error al crear el atributo')
    }
}

const guardarEdicion = async () => {
    if (!nuevoAtributo.value.trim() || !nuevaLongitud.value) {
        alert('Por favor ingresa el atributo y la longitud')
        return
    }
    try {
        await AtributosService.update(atribsec.value.id, {
            atributo: nuevoAtributo.value.trim(),
            longitud: parseInt(nuevaLongitud.value)
        })
        await cargarAtributos()
        cancelarEdicion()
    } catch (error) {
        console.error('Error al actualizar atributo:', error)
        alert('Error al actualizar el atributo')
    }
}

const cargarAtributos = async () => {
    try {
        atributos.value = await AtributosService.getAll()
    } catch (error) {
        console.error('Error al cargar atributos:', error)
    }
}

const eliminarAtributo = async () => {
    if (!atribsec.value) {
        alert('Por favor selecciona un atributo para eliminar')
        return
    }
    if (!confirm('¿Estás seguro de que deseas eliminar este atributo?')) return
    try {
        await AtributosService.delete(atribsec.value.id)
        atribsec.value = null
        await cargarAtributos()
    } catch (error) {
        console.error('Error al eliminar atributo:', error)
        alert('Error al eliminar atributo')
    }
}

onMounted(() => {
    cargarAtributos()
})
</script>