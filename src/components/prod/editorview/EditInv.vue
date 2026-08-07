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
        <EdInvModal />
        <ProdTable />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import EdInvModal from './editinv/EdInvModal.vue';
import ProdTable from './editinv/ProdTable.vue';

defineEmits(['CerrInv'])
</script>