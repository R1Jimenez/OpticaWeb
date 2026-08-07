<style scoped>
.SucPrincipal {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    padding: .5%;
    padding-top: 1%;
    padding-bottom: 0%;
    gap: 1.5%;
}

.SuContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.sucursales {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: 1%;
    overflow-y: auto;
}

.SucTituloRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 7%;
    padding-left: 1%;
}

.TextoTituloSUC {
    font-size: 2.7rem;
    font-weight: 900;
    color: white;
}
</style>

<template>
    <div class = 'SucPrincipal'>
        <Header />
        <div class="SuContenido">
            <NavBar />
            <div class="sucursales">
                <div class="SucTituloRow">
                    <h1 class="TextoTituloSUC">
                        Expediente de Optometria
                    </h1>
                </div>
                <SucursalFilters
                    @nueva-sucursal="showCreateModal = true"
                    @filter-applied="onFilterApplied"
                />
                <CreateSucursalModal
                    v-if="showCreateModal"
                    @close="showCreateModal = false"
                    @sucursal-creada="onSucursalCreada"
                />
                <SucursalesTable
                    ref="tableRef"
                    :filters="activeFilters"
                    @edit="onEdit"
                />
                <EditSucursalModal
                    v-if="sucursalAEditar"
                    :sucursal="sucursalAEditar"
                    @close="sucursalAEditar = null"
                    @sucursal-actualizada="onSucursalActualizada"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import SucursalFilters from '../../components/sist/sucursalesview/SucursalFilters.vue'
import SucursalesTable from '../../components/sist/sucursalesview/SucursalesTable.vue'
import CreateSucursalModal from '../../components/sist/sucursalesview/CreateSucursalModal.vue';
import EditSucursalModal from '../../components/sist/sucursalesview/EditSucursalModal.vue';

const activeFilters = ref({ tipoSucursalId: null, estadoSucursalId: null })
const tableRef = ref(null)
const showCreateModal = ref(false)
const sucursalAEditar = ref(null)

const onEdit = (sucursal) => {
    sucursalAEditar.value = sucursal
}

const onFilterApplied = ({ tipoSucursalId, estadoSucursalId }) => {
    activeFilters.value = { tipoSucursalId, estadoSucursalId }
}

const onSucursalCreada = () => {
    showCreateModal.value = false
    tableRef.value?.reload()
}

const onSucursalActualizada = () => {
    sucursalAEditar.value = null
    tableRef.value?.reload()
}
</script>