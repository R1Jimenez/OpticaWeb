<style scoped>
.EntPrinc {
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

.EntCont {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.EntUsages {
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

/* padding-bottom no se respeta al final de un contenedor flex con scroll */
.EntUsages::after {
    content: '';
    flex-shrink: 0;
    height: 20px;
}

.EntAviso {
    width: 93%;
    flex-shrink: 0;
    padding: 14px 20px;
    background: white;
    border: 1px solid #BCBCBC;
    border-radius: 12px;
    color: #6C757D;
    font-style: italic;
    text-align: center;
}

.EntAviso b {
    color: #130348;
    font-style: normal;
}
</style>

<template>
    <div class="EntPrinc">
        <Header />
        <div class="EntCont">
            <NavBar />
            <div class="EntUsages">
                <ReporteFilt
                    :key="route.name"
                    :titulo="titulo"
                    :campos="route.meta.campos"
                    @desplegar="parametros = $event"
                />
                <div v-if="parametros" class="EntAviso">
                    Reporte de {{ titulo.toLowerCase() }} de <b>{{ parametros.sucursal.sucursal }}</b>
                    <template v-if="parametros.fechaInicio">
                        del <b>{{ fecha(parametros.fechaInicio) }}</b> al <b>{{ fecha(parametros.fechaFin) }}</b>
                    </template>
                    en formato <b>{{ parametros.formato }}</b>: pendiente de conexión con el servidor.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../../components/Header.vue'
import NavBar from '../../components/NavBar.vue'
import ReporteFilt from '../../components/rep/ReporteFilt.vue'

// Vista compartida por varios reportes; título y filtros vienen de meta.titulo / meta.campos de la ruta
const route = useRoute()
const titulo = computed(() => route.meta.titulo)

const parametros = ref(null)

watch(() => route.name, () => { parametros.value = null })

const fecha = (valor) => new Date(valor).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
</script>
