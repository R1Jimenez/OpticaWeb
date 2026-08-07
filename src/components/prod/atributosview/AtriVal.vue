<style scoped>
.AtriEdsPrinc {
    display: flex;
    flex-direction: column;
    width: 93%;
    height: 50%;
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
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
}

.MinHeadColmn1 {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 20%;
    gap: 5px;
}

.MinHeadColmn1 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    padding-left: 16px;
}

.MinHeadColmn {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 60%;
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
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

.itemRow.active {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
}


.itemRow:hover {
    background: radial-gradient(
        ellipse at left,
        #BCBCBC 10%,
        #F0F0F0 100%
    );
}

.ButonSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: 17%;
    height: 100%;
    gap: 5px;
}

.butop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-left: 5px;
    width: 100%;
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

.MinHeadEds.editando {
    background: radial-gradient(
        ellipse at center,
        #8B0000 10%,
        #5C0000 100%
    );
    border-bottom: 1.5px solid #FFD700;
}

.butsec {
    display: flex;
    flex-direction: column;   /* ← column para apilar Guardar y Cancelar */
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    gap: 8px;
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
                <text>Descripcion:</text>
                <input
                    type="text"
                    placeholder="Ingresar Descripcion"
                    class="CliBars"
                    v-model="nuevaDescripcion"
                    autocomplete="off"
                />
            </div>
            <div class="butsec">
                <button class="AddBut" @click="modoEdicion ? guardarEdicion() : crearValor()">
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
                        v-for="valor in valores"
                        :key="valor.id"
                        class="itemRow"
                        :class="{ active: valsec?.id === valor.id }"
                        @click="valsec = valor"
                   >
                    <span>{{ valor.clave }} - {{ valor.descripcion }}</span>
                   </div>
                   <div v-if="valores.length === 0 && store.atributo_Id" class="itemRow">
                        <span style="color: #999;">Sin valores para este atributo</span>
                   </div>
                   <div v-if="!store.atributo_Id" class="itemRow">
                        <span style="color: #999;">Selecciona un atributo</span>
                   </div>
                </div>
            </div>
            <div class="ButonSec">
                <button class="butop" @click="activarEdicion">
                    <span class="material-icons">edit</span>
                    <text>Editar</text>
                </button>
                <button class="butop" @click="EliminarValor">
                    <span class="material-icons">delete</span>
                    <text>Eliminar</text>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAtributosStore } from '../../../stores/atributos'
import { AtributosValoresService } from '../../../services/AtributosValoresServices'

const store = useAtributosStore()
const valores = ref([])
const valsec = ref(null)
const nuevaDescripcion = ref('')
const modoEdicion = ref(false)

const cargarValores = async (atributoId) => {
    if (!atributoId) {
        valores.value = []
        return
    }
    try {
        valores.value = await AtributosValoresService.getByAtributo(atributoId)
    } catch (error) {
        console.error('Error al cargar valores:', error)
        valores.value = []
    }
}

const activarEdicion = () => {
    if (!valsec.value) {
        alert('Por favor selecciona un valor para editar')
        return
    }
    nuevaDescripcion.value = valsec.value.descripcion
    modoEdicion.value = true
}

const cancelarEdicion = () => {
    nuevaDescripcion.value = ''
    modoEdicion.value = false
    valsec.value = null
}

const crearValor = async () => {
    if (!store.atributo_Id) {
        alert('Por favor selecciona un atributo primero')
        return
    }
    if (!nuevaDescripcion.value.trim()) {
        alert('Por favor ingresa una descripción')
        return
    }
    try {
        await AtributosValoresService.create(store.atributo_Id, nuevaDescripcion.value.trim())
        nuevaDescripcion.value = ''
        await cargarValores(store.atributo_Id)
    } catch (error) {
        console.error('Error al crear valor:', error)
        alert('Error al crear el valor')
    }
}

const guardarEdicion = async () => {
    if (!nuevaDescripcion.value.trim()) {
        alert('Por favor ingresa una descripción')
        return
    }
    try {
        await AtributosValoresService.update(valsec.value.id, {
            descripcion: nuevaDescripcion.value.trim()
        })
        await cargarValores(store.atributo_Id)
        cancelarEdicion()
    } catch (error) {
        console.error('Error al actualizar valor:', error)
        alert('Error al actualizar el valor')
    }
}

const EliminarValor = async() => {
    if (!valsec.value) {
        alert('Ningun valor seleccionado a eliminar')
        return
    }
    if(!confirm('¿Estas seguro de que deseas eliminar este valor?')) return

    try{
        await AtributosValoresService.delete(valsec.value.id)
        valsec.value = null
        await cargarValores(store.atributo_Id)
    } catch (error) {
        console.error('Error al eliminar valor: ', error)
        alert('Error al eliminar valor')
    }
}

watch(() => store.atributo_Id, (nuevoId) => {
    valsec.value = null
    modoEdicion.value = false
    nuevaDescripcion.value = ''
    cargarValores(nuevoId)
})
</script>