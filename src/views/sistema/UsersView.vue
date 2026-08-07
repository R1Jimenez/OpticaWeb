<style scoped>
.UsersPrincipal {
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

.UsersContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.UserUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: 1%;
    overflow-y: auto;
}

.UserTituloRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 7%;
    padding-left: 1%;
}

.UserTituloRow h1 {
    font-size: 2.7rem;
    font-weight: 900;
    color: white;
}
</style>

<template>
    <div class="UsersPrincipal">
        <Header />
        <div class="UsersContenido">
            <NavBar />
            <div class="UserUsages">
                <div class="UserTituloRow">
                    <h1>Lista de Usuarios</h1>
                </div>
                <UserFilters
                    @nuevo-usuario="showCreateModal = true"
                    @filter-applied="onFilterApplied"
                />
                <UsersTable
                    ref="tableRef"
                    :filters="activeFilters"
                    @edit="onEdit"
                />
            </div>
        </div>
        <CreateUserModal
            v-if="showCreateModal"
            @close="showCreateModal = false"
            @created="onUserCreated"
        />
        <EditUserModal
            v-if="usuarioAEditar"
            :usuario="usuarioAEditar"
            @close="usuarioAEditar = null"
            @updated="onUserUpdated"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import NavBar from '../../components/NavBar.vue'
import UserFilters from '../../components/sist/usersview/UsersFilters.vue'
import UsersTable from '../../components/sist/usersview/UsersTable.vue'
import CreateUserModal from '../../components/sist/usersview/CreateUserModal.vue'
import EditUserModal from '../../components/sist/usersview/EditUserModal.vue'

const activeFilters = ref({ usuario: null, sucursalId: null, rolId: null, activos: null })
const tableRef = ref(null)
const usuarioAEditar = ref(null)
const showCreateModal = ref(false)

const onFilterApplied = (filters) => {
    activeFilters.value = filters
}

const onEdit = (usuario) => {
    usuarioAEditar.value = usuario
    console.log('Editar:', usuario)
}

const onUserCreated = () => {
    tableRef.value?.reload()
}

const onUserUpdated = () => {
    tableRef.value?.reload()
    usuarioAEditar.value = null
}
</script>