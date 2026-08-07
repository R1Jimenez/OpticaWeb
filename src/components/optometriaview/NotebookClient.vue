<style scoped>
.notebook-wrapper {
    position: relative;
    width: 93%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.notebook-container {
    background-color: #F0F0F0;
    border: 2px solid #FB1C2E;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

/* ── Header ── */
.notebook-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    border-bottom: 1px solid #BCBCBC;
}

.header-icon {
    color: #130348;
    font-size: 24px;
    flex-shrink: 0;
}

.header-title {
    flex: 1;
    font-size: 1.125rem;
    font-weight: 700;
    color: #130348;
}

/* ── Notebook body ── */
.notebook-body {
    padding: 24px;
}

.notebook-page {
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.notebook-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.notebook-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #BCBCBC;
}

.notebook-line.thick {
    height: 2px;
    background-color: #130348;
}

/* ── Content ── */
.notebook-content {
    position: relative;
    padding: 8px 16px;
    height: 600px; /* 20 lines × 30px */
    z-index: 1;
}

.notebook-row {
    height: 30px;
    display: flex;
    align-items: center;
}

.notebook-row span {
    font-size: 0.875rem;
    color: #130348;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<template>
    <div class="notebook-wrapper" v-if="paciente">
        <div class="notebook-container">

            <!-- Header -->
            <div class="notebook-header">
                <span class="material-icons header-icon">assignment</span>
                <span class="header-title">
                    Información del Paciente: {{ paciente.nombres }} {{ paciente.apellidos }}
                </span>
            </div>

            <!-- Notebook body -->
            <div class="notebook-body">
                <div class="notebook-page">

                    <!-- Ruled lines (SVG equivalent of NotebookLinePainter) -->
                    <div class="notebook-lines">
                        <div
                            v-for="i in 20"
                            :key="i"
                            class="notebook-line"
                            :class="{ thick: i === 18 }"
                            :style="{ top: `${i * 30}px` }"
                        />
                    </div>

                    <!-- Content rows -->
                    <div class="notebook-content">
                        <div class="notebook-row">
                            <span>Nombres: {{ paciente.nombres }}</span>
                        </div>
                        <div class="notebook-row">
                            <span>Apellidos: {{ paciente.apellidos }}</span>
                        </div>
                        <div class="notebook-row">
                            <span>Edad: {{ paciente.edad }} años</span>
                        </div>
                        <div v-if="paciente.ocupacion" class="notebook-row">
                            <span>Ocupación: {{ paciente.ocupacion }}</span>
                        </div>
                        <div v-if="paciente.problema_ocular" class="notebook-row">
                            <span>Problema Ocular: {{ paciente.problema_ocular }}</span>
                        </div>
                        <div v-if="paciente.medicamento_actual" class="notebook-row">
                            <span>Medicamento Actual: {{ paciente.medicamento_actual }}</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
defineProps({
    paciente: { type: Object, default: null }
})
</script>