<style scoped>
.ButSecc {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 8px;
    padding: 6px;
    box-sizing: border-box;
}

.button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 3px;
    width: 100%;
    padding: 8px 14px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 1px solid #FB1C2E;
    border-radius: 15px;
    box-sizing: border-box;
    cursor: pointer;
}

.button .material-icons {
    color: #130348;
    font-size: 20px;
    flex-shrink: 0;
}

.button span.label {
    color: #130348;
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
}
</style>

<template>
    <div class="ButSecc">
        <div class="button">
            <span class="material-icons">topic</span>
            <span class="label">Detalle</span>
        </div>
        <div class="button">
            <span class="material-icons">print</span>
            <span class="label">Imprimir</span>
        </div>
        <div class="button">
            <span class="material-icons">label</span>
            <span class="label">Etiqueta</span>
        </div>
        <div class="button">
            <span class="material-icons">view_in_ar</span>
            <span class="label">Orden</span>
        </div>
    </div>
</template>

<script setup>
</script>