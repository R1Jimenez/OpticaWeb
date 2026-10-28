<style scoped>
.PromoPrincipal {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: .5%;
    padding-top: 1%;
    padding-bottom: 0%;
    gap: 1.5%;
}

.PromoContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.PromoUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin-top: 1%;
    gap: 1.5%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #130348 #F0F0F0;
    padding-bottom: 1%;
    box-sizing: border-box;
}

.TitRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 100%;
    padding-left: 3%;
}

.TitProm {
    font-size: 2rem;
    font-weight: 600;
    color: #F0F0F0;
}

.ErrorCarga {
    width: 98%;
    padding: 8px 14px;
    border: 2px solid #FB1C2E;
    border-radius: 12px;
    background: white;
    color: #FB1C2E;
    font-weight: 600;
}
</style>

<template>
    <div class="PromoPrincipal">
        <Header />
        <div class="PromoContenido">
            <NavBar />
            <div class="PromoUsages">
                <div class="TitRow">
                    <span class="TitProm">
                        Promociones
                    </span>
                </div>
                <PromConEdits />
                <div v-if="errorCarga" class="ErrorCarga">{{ errorCarga }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import PromConEdits from '../../components/comer/promociones/PromConEdits.vue';
import { usePromocionStore } from '../../stores/promocion'

// /Promociones?id=N abre la promoción N para editarla; sin id inicia una nueva
const route = useRoute()
const promo = usePromocionStore()
const errorCarga = ref(null)

watch(() => route.query.id, async (id) => {
    errorCarga.value = null
    promo.resetear()
    if (!id) return
    try {
        await promo.cargar(Number(id))
    } catch (e) {
        errorCarga.value = e.message
    }
}, { immediate: true })

</script>