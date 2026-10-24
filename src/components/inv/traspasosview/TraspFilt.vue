<style scoped>
.TraspFiltPrinc {
    display: flex;
    flex-direction: column;
    width: 93%;
    min-height: 20px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: visible;
    flex-shrink: 0;
    gap: 15px;
    padding-bottom: 1%;
}

.TrasFiltHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    padding-left: 2%;
    padding-right: 2%;
    width: 100%;
    margin-bottom: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: radial-gradient(
        ellipse at left,
        #130348 10%,
        #07072C 100%
    );
}

.TrasFiltHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.NewTras {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 7%;
    justify-content: space-around;
    padding: 5px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.NewTras span {
    font-size: 25px;
    color: white;
}

.NewTras:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #58B358;
    color: #58B358;
}

.NewTras:hover span {
    color: #58B358;
}

.TrasFiltRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.TrasFiltColmn {
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 2px;
}

.TrasFiltColmn text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    padding-left: 2%;
}

.TrasSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
    cursor: pointer;
}

.DropWrap {
    position: relative;
    width: 100%;
}

.DropMenu {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.DropItem {
    padding: 10px 18px;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
    color: #130348;
    font-size: 1rem;
    transition: background 0.15s;
}

.DropItem:last-child {
    border-bottom: none;
}

.DropItem:hover,
.DropItem.activo {
    background-color: #F5F5F5;
    font-weight: 600;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="TraspFiltPrinc">
        <div class="TrasFiltHeader">
            <span>
                Lista de Traspasos
            </span>
            <button class="NewTras" data-cy="nuevo-traspaso" @click="$emit('abrirModal')">
                <span class="material-icons">add</span>
                <text>Nuevo</text>
            </button>
        </div>
        <div class="TrasFiltRow">
            <div class="TrasFiltColmn">
                <text>
                    Estatus
                </text>
                <div class="DropWrap">
                    <div class="TrasSelect" data-cy="filtro-estatus" @click="toggleMenu('estatus')">
                        <text>
                            {{ estatus ?? 'Todos' }}
                        </text>
                        <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'estatus'">
                        <div class="DropItem" :class="{ activo: !estatus }" @click="seleccionar('estatus', null)">Todos</div>
                        <div
                            v-for="e in estatusLista"
                            :key="e"
                            class="DropItem"
                            :class="{ activo: estatus === e }"
                            @click="seleccionar('estatus', e)"
                        >{{ e }}</div>
                    </div>
                </div>
            </div>
            <div class="TrasFiltColmn">
                <text>
                    Origen
                </text>
                <div class="DropWrap">
                    <div class="TrasSelect" data-cy="filtro-origen" @click="toggleMenu('origen')">
                        <text>
                            {{ origen?.sucursal ?? 'Todos' }}
                        </text>
                        <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'origen'">
                        <div class="DropItem" :class="{ activo: !origen }" @click="seleccionar('origen', null)">Todos</div>
                        <div
                            v-for="s in sucursales"
                            :key="s.id"
                            class="DropItem"
                            :class="{ activo: origen?.id === s.id }"
                            @click="seleccionar('origen', s)"
                        >{{ s.sucursal }}</div>
                    </div>
                </div>
            </div>
            <div class="TrasFiltColmn">
                <text>
                    Destino
                </text>
                <div class="DropWrap">
                    <div class="TrasSelect" data-cy="filtro-destino" @click="toggleMenu('destino')">
                        <text>
                            {{ destino?.sucursal ?? 'Todos' }}
                        </text>
                        <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                    </div>
                    <div class="DropMenu" v-if="menuAbierto === 'destino'">
                        <div class="DropItem" :class="{ activo: !destino }" @click="seleccionar('destino', null)">Todos</div>
                        <div
                            v-for="s in sucursales"
                            :key="s.id"
                            class="DropItem"
                            :class="{ activo: destino?.id === s.id }"
                            @click="seleccionar('destino', s)"
                        >{{ s.sucursal }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSucursales } from '../../../services/SucursalesServices'
import { getEstatusTraspaso } from '../../../services/TraspasosServices'

const emit = defineEmits(['abrirModal', 'filtrar'])

const estatus = ref(null)
const origen = ref(null)
const destino = ref(null)
const sucursales = ref([])
const estatusLista = ref([])
const menuAbierto = ref(null)

const campos = { estatus, origen, destino }

const toggleMenu = (menu) => {
    menuAbierto.value = menuAbierto.value === menu ? null : menu
}

const seleccionar = (campo, valor) => {
    campos[campo].value = valor
    menuAbierto.value = null
    emit('filtrar', {
        estatus: estatus.value,
        origen_id: origen.value?.id ?? null,
        destino_id: destino.value?.id ?? null,
    })
}

onMounted(async () => {
    const [s, e] = await Promise.allSettled([getSucursales(), getEstatusTraspaso()])
    if (s.status === 'fulfilled') sucursales.value = s.value
    else console.error('Error al cargar sucursales:', s.reason)
    if (e.status === 'fulfilled') estatusLista.value = e.value
    else console.error('Error al cargar estatus de traspaso:', e.reason)
})
</script>