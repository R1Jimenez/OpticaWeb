<style scoped>
.AtributosPrincipal {
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

.AtributosContenido {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-height: 0;
}

.AtributosUsages {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin-top: 1%;
    overflow: hidden;
    padding-bottom: 1%;
    box-sizing: border-box;
}

.HeaderRow {
    padding: 10px 30px;
    width: 100%;
}

.HeaderRow span {
    font-size: 2rem;
    font-weight: 600;
    color: white;
}

.AtRowPrin {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden; 
}

.AtriMidColumn {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.AtriMidColumn2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    gap: 15px;
}

.rowsubt {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 5px;
    padding: 5px 50px;
}

.rowsubt span {
    font-size: 2rem;
    font-weight: 600;
    color: white;
}

.dimmed {
    opacity: 0.4;
    pointer-events: none;
    transition: opacity 0.2s ease;
}
</style>

<template>
    <div class="AtributosPrincipal">
        <Header />
        <div class="AtributosContenido">
            <NavBar />
            <div class="AtributosUsages">
                <div class="HeaderRow">
                    <span>Definición de Atributos</span>
                </div>
                <div class="AtRowPrin">
                    <div class="AtriMidColumn">
                        <AtributosEdits @editando="enEdicion = $event" />
                        <div class="rowsubt" :class="{ dimmed: enEdicion }">
                            <span>Seleccione un valor de Atributo</span>
                        </div>
                        <AtriVal :class="{ dimmed: enEdicion }" />
                    </div>
                    <div class="AtriMidColumn2" :class="{ dimmed: enEdicion }">
                        <AtribTable />
                        <CodTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AtributosEdits from '../../components/prod/atributosview/AtributosEdits.vue';
import Header from '../../components/Header.vue';
import NavBar from '../../components/NavBar.vue';
import AtriVal from '../../components/prod/atributosview/AtriVal.vue';
import AtribTable from '../../components/prod/atributosview/AtribTable.vue';
import CodTable from '../../components/prod/atributosview/CodTable.vue';

const enEdicion = ref(false)
</script>