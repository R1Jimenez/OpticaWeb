<style scoped>
.TipCliFilt {
    display: flex;
    flex-direction: column;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #FB1C2E;
    border-radius: 18px;
    flex-shrink: 0;
    box-sizing: border-box;
}

.TipCliFiltHeader {
    padding: 7px 20px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid #FB1C2E;
    background: radial-gradient(
        ellipse at left,
        #130348 10%,
        #07072C 100%
    );
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
}

.TipCliFiltBody {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 12px 20px;
}

.BuscarWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    width: 420px;
    padding: 3px 12px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
    box-sizing: border-box;
}

.BuscarWrap .material-icons {
    color: #130348;
    font-size: 20px;
}

.BuscarWrap input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: #130348;
    font-size: 1rem;
}

.BtnLimpiar {
    display: flex;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
}

.BtnAgregar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 4px 14px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
}

.BtnAgregar .material-icons {
    font-size: 20px;
}

.BtnAgregar:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border-color: #58B358;
    color: #58B358;
}
</style>

<template>
    <div class="TipCliFilt">
        <div class="TipCliFiltHeader">Tipos de Cliente</div>
        <div class="TipCliFiltBody">
            <label class="BuscarWrap">
                <span class="material-icons">search</span>
                <input
                    :value="busqueda"
                    placeholder="Buscar tipo de cliente"
                    autocomplete="off"
                    data-cy="buscar-tipo"
                    @input="$emit('update:busqueda', $event.target.value)"
                />
                <button v-if="busqueda" class="BtnLimpiar" title="Limpiar" @click="$emit('update:busqueda', '')">
                    <span class="material-icons">close</span>
                </button>
            </label>
            <button class="BtnAgregar" data-cy="agregar-tipo" @click="$emit('agregar')">
                <span class="material-icons">add</span>
                Agregar
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    busqueda: { type: String, default: '' },
})

defineEmits(['update:busqueda', 'agregar'])
</script>
