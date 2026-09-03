<style scoped>
.EdInvMod {
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

</style>

<template>
    <div class="EdInvMod" @click.self="$emit('CerrInv')">
        <EdInvModal @consultar="onConsultar" />
        <ProdTable ref="prodTableRef" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import EdInvModal from './editinv/EdInvModal.vue';
import ProdTable from './editinv/ProdTable.vue';
import { useSucursalStore } from '../../../stores/sucursal'
import { useInventarioEdicionStore } from '../../../stores/inventarioEdicion'

const props = defineProps({
    productoId: { type: [Number, String], default: null },
})
defineEmits(['CerrInv'])

const sucursalStore = useSucursalStore()
const inventarioEdicionStore = useInventarioEdicionStore()

// arranca el store con el producto seleccionado y la sucursal activa del header
inventarioEdicionStore.setProducto(props.productoId)
inventarioEdicionStore.setSucursal(sucursalStore.sucursalSeleccionada?.id ?? null)

const prodTableRef = ref(null)

const onConsultar = () => {
    prodTableRef.value?.consultar()
}
</script>