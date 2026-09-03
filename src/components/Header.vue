<style>
.Principal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 98.5%;
    height: 10%;
    background-color: white;
    border: 2px solid #FB1C2E;
    border-radius: 30px;
    padding: .5%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    padding-left: 1.5%;
    padding-right: 1.5%;
}

.logobox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 12%;
    height: 100%;
    border: 1.5px solid #FB1C2E;
    border-radius: 20px;
    background: radial-gradient(
        ellipse at center,
        #130348 0%,
        #07072C 100%
    );
    cursor: pointer;
}

.logoheadimg {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.Sucursalindicator {
    font-size: 1.8rem;
    line-height: 2rem;
    font-weight: 700;
    color: #130348;
    cursor: pointer;
}

.rowUs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 25px;
}

.rowUs span {
    font-size: 1.5rem;
    color: #130348;
    cursor: pointer;
}

.userDa {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    margin-left: 1.5%;
    gap: 5px;
    padding: 1px 8px;
    border: solid 2px #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at center,
        #130348 0%,
        #07072C 100%
    );
}

.userDa span {
    font-size: 1.6rem;
    color: white;
}

.sucursalMenu {
    position: relative;
}

.sucursalDropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 220px;
    padding: 10px;
    border: 2px solid #FB1C2E;
    border-radius: 14px;
    background: white;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
    z-index: 20;
}

.sucursalOption {
    padding: 6px 10px;
    border-radius: 8px;
    color: #130348;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
}

.sucursalOption + .sucursalOption {
    margin-top: 4px;
}

.sucursalEmpty {
    color: #666666;
    font-size: 0.95rem;
}
</style>

<template>
    <div class="Principal">
        <div class="logobox" @click="handleHome">
            <img :src="logo" alt="logo" class="logoheadimg" />
        </div>
        <div class="userDa">
                <span class="material-icons">person</span>
                <span>{{ displayName }}</span>
            </div>
        <div class="rowUs">
            <div class="sucursalMenu">
                <text class="Sucursalindicator" @click="toggleSucursalMenu">
                    Sucursal: {{ currentSucursal }}
                </text>
                <div v-if="showSucursalMenu" class="sucursalDropdown">
                    <div v-if="accessibleSucursales.length === 0" class="sucursalEmpty">
                        Sin sucursales disponibles
                    </div>
                    <div
                        v-for="sucursal in accessibleSucursales"
                        v-else
                        :key="sucursal.id"
                        class="sucursalOption"
                        @click="selectSucursal(sucursal)"
                    >
                        {{ sucursal.nombre }}
                    </div>
                </div>
            </div>
            <span class="material-icons" @click="showSalirModal = true">logout</span>
        </div>

        <SalirModal v-if="showSalirModal" @cerrar="showSalirModal = false" />
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useSucursalStore } from '../stores/sucursal';
import { getSucursales } from '../services/UserServices';
import { useCotizacionStore } from '../stores/cotizacion';
import SalirModal from './SalirModal.vue';
import logo from '../assets/logo.png'

const router = useRouter()
const authStore = useAuthStore()
const sucursalStore = useSucursalStore()
const cotizacionStore = useCotizacionStore()
const sucursales = ref([])
const showSucursalMenu = ref(false)
const selectedSucursal = ref(null)
const showSalirModal = ref(false)

const currentUser = computed(() => authStore.user?.user ?? authStore.user)

const displayName = computed(() => {
    if (!currentUser.value) {
        return ''
    }

    const fullName = [currentUser.value.nombres, currentUser.value.apellidos]
        .filter(Boolean)
        .join(' ')
        .trim()

    return currentUser.value.usuario || currentUser.value.username || fullName || currentUser.value.name || ''
})

const currentSucursal = computed(() => {
    if (selectedSucursal.value) return selectedSucursal.value
    return currentUser.value?.Sucursal || currentUser.value?.sucursal || 'N/A'
})

const accessibleSucursales = computed(() => {
    const accesos = currentUser.value?.sucursal_acces ?? []

    // sucursal_acces guarda nombres de sucursal, no IDs; se busca el id real en el catálogo.
    return accesos.map((nombreSucursal) => {
        const sucursal = sucursales.value.find((item) => item.sucursal === nombreSucursal)

        return {
            id: sucursal?.id ?? null,
            nombre: sucursal?.sucursal || nombreSucursal,
        }
    })
})

const toggleSucursalMenu = async () => {
    showSucursalMenu.value = !showSucursalMenu.value

    if (!showSucursalMenu.value || sucursales.value.length > 0) {
        return
    }

    try {
        sucursales.value = await getSucursales()
    } catch (error) {
        console.error('Error al cargar sucursales del header:', error)
    }
}

const selectSucursal = (sucursal) => {
    selectedSucursal.value = sucursal.nombre
    showSucursalMenu.value = false
    sucursalStore.setSucursal(sucursal)
    cotizacionStore.setSucursal(sucursal)

    // Keep selected branch in auth store so it survives route changes/reloads.
    if (!authStore.user) return

    if (authStore.user.user) {
        authStore.setUser({
            ...authStore.user,
            user: {
                ...authStore.user.user,
                Sucursal: sucursal.nombre,
            },
        })
        return
    }

    authStore.setUser({
        ...authStore.user,
        Sucursal: sucursal.nombre,
    })
}

onMounted(async () => {
    selectedSucursal.value = currentUser.value?.Sucursal || currentUser.value?.sucursal || null

    if ((currentUser.value?.sucursal_acces?.length ?? 0) === 0) {
        return
    }

    try {
        sucursales.value = await getSucursales()

        const match = accessibleSucursales.value.find((s) => s.nombre === selectedSucursal.value)
        if (match) {
            sucursalStore.setSucursal(match)
            cotizacionStore.setSucursal(match)
        }
    } catch (error) {
        console.error('Error al precargar sucursales del header:', error)
    }
})

const handleHome = () => {
    router.push('/Home')
}
</script>