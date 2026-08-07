<style scoped>
.TraspFiltPrinc {
    display: flex;
    flex-direction: column;
    width: 93%;
    min-height: 20px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    flex-shrink: 0;
    gap: 15px;
    padding-bottom: 1%;
}

.TrasFiltHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    padding-left: 2%;
    padding-right: 2%;
    width: 100%;
    margin-bottom: auto;
    background: radial-gradient(
        ellipse at left,
        #130348 10%,
        #07072C 100%
    );
}

.TrasFiltHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.NewTras {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 7%;
    justify-content: space-around;
    padding: 5px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.NewTras span {
    font-size: 25px;
    color: white;
}

.NewTras:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #58B358;
    color: #58B358;
}

.NewTras:hover span {
    color: #58B358;
}

.TrasFiltRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

.TrasFiltColmn {
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 2px;
}

.TrasFiltColmn text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    padding-left: 2%;
}

.TrasSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 10px;
    cursor: pointer;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="TraspFiltPrinc">
        <div class="TrasFiltHeader">
            <span>
                Lista de Traspasos
            </span>
            <button class="NewTras" @click="$emit('abrirModal')">
                <span class="material-icons">add</span>
                <text>Nuevo</text>
            </button>
        </div>
        <div class="TrasFiltRow">
            <div class="TrasFiltColmn">
                <text>
                    Estatus
                </text>
                <div class="TrasSelect">
                    <text>
                        Todos
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
            <div class="TrasFiltColmn">
                <text>
                    Origen
                </text>
                <div class="TrasSelect">
                    <text>
                        Todos
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
            <div class="TrasFiltColmn">
                <text>
                    Destino
                </text>
                <div class="TrasSelect">
                    <text>
                        Todos
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineEmits(['abrirModal'])
</script>