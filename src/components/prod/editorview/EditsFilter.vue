<style scoped>
.FilterPrinc {
    display: flex;
    flex-direction: column;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    padding-bottom: 10px;
    gap: 10px;
    flex-shrink: 0;
}

.HeaderFilt {
    display: flex;
    flex-direction: row;
    padding: 5px 30px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
}

.HeaderFilt span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FiltRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1px 30px;
    width: 100%;
}

.MinColmn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    gap: 2px;
}

.MinColmn text {
    padding-left: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.SelectBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
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

.SelectBox.placeholder {
    color: #999;
}

.AddBut {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2px;
    width: 12%;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    cursor: pointer;
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
    border: 1px solid #58B358;
    color: #58B358;
}

.CliBars {
    width: 60%;
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

.CliBars2 {
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

.itsec {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 12%;
}

.itsec button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size:25px;
    color: #130348;
}

.itsec button:hover {
    color: #58B358;
}

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

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.4s ease;
    max-height: 600px;
    overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
}

.MinColmn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    gap: 2px;
    position: relative;   /* ADD THIS */
}

.DropdownList {
    position: absolute;
    top: 100%;
    left: 0;
    width: 60%;
    margin-left: auto;
    margin-top: 4px;
    background: #F0F0F0;
    border: 2px solid #FB1C2E;
    border-radius: 12px;
    overflow: hidden;
    z-index: 10;
}

.DropdownItem {
    padding: 6px 1rem;
    font-size: 1rem;
    color: #130348;
    cursor: pointer;
}

.DropdownItem:hover {
    background: #BCBCBC;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="FilterPrinc">
        <div class="HeaderFilt">
            <span>Editor de Productos</span>
        </div>
        <div class="FiltRow">
            <div class="MinColmn">
                <text>Mostrar</text>
                <div class="SelectBox" @click="toggleEstatusDropdown">
                    <span :class="{ placeholder: !estatusSeleccionado }">
                        {{ estatusSeleccionado?.label || 'Todos' }}
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
                <Transition name="dropdown">
                    <div v-if="mostrarEstatusDropdown" class="DropdownList">
                        <div
                            v-for="opcion in opcionesEstatus"
                            :key="opcion.id"
                            class="DropdownItem"
                            @click="seleccionarEstatus(opcion)"
                        >
                            {{ opcion.label }}
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="MinColmn">
                <text># Resultados</text>
                <div class="SelectBox">
                    <span>
                        Solo Activos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
            </div>

            <button class="AddBut" @click="$emit('abrirNuevoProd')">
                <span class="material-icons">add</span>
                <span>Agregar</span>
            </button>
        </div>
        <div class="FiltRow">
            <div class="MinColmn">
                <text>Codigo:</text>
                <input
                    type="text"
                    placeholder="Ingresar Codigo"
                    class="CliBars"
                    v-model="codigoQuery"
                    autocomplete="off"
                    @keyup.enter="buscar"
                    />
            </div>
            <div class="MinColmn">
                <text>Producto:</text>
                <input
                type="text"
                placeholder="Ingresar Producto"
                class="CliBars2"
                v-model="nombreQuery"
                autocomplete="off"
                @keyup.enter="buscar"
                />
            </div>
            <div class="itsec">
                <button @click="buscar">
                    <span class="material-icons">search</span>
                </button>
                <button @click="mostrarAtributos = !mostrarAtributos">
                    <span class="material-icons">menu</span>
                </button>
            </div>
        </div>

        <Transition name="dropdown">
            <div v-if="mostrarAtributos" class="FogridAtrib">
                <text>Tipo</text>
                <div class="SectBoxAt">
                    <span>
                        Lente de Contacto
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Marca</text>
                <div class="SectBoxAt">
                    <span>
                        N/A
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Modelo</text>
                <div class="SectBoxAt">
                    <span>
                        AIR OPTIX COLORS GRA
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Colores</text>
                <div class="SectBoxAt">
                    <span>
                        N/A
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Tamaño</text>
                <div class="SectBoxAt">
                    <span>
                        N/A
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['abrirNuevoProd', 'buscar'])

const codigoQuery = ref('')
const nombreQuery = ref('')
const mostrarAtributos = ref(false)

const opcionesEstatus = [
    { id: 1, label: 'Activo' },
    { id: 2, label: 'Inactivo' }
]
const estatusSeleccionado = ref(null)
const mostrarEstatusDropdown = ref(false)

const toggleEstatusDropdown = () => {
    mostrarEstatusDropdown.value = !mostrarEstatusDropdown.value
}

const seleccionarEstatus = (opcion) => {
    estatusSeleccionado.value = estatusSeleccionado.value?.id === opcion.id ? null : opcion
    mostrarEstatusDropdown.value = false
    buscar()
}

const buscar = () => {
    emit('buscar', {
        codigo: codigoQuery.value.trim() || null,
        nombre: nombreQuery.value.trim() || null,
        estatus: estatusSeleccionado.value?.id ?? null
    })
}
</script>