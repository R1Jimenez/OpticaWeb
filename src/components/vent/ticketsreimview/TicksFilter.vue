<style scoped>
.TicksFilterPrinc {
    display: flex;
    flex-direction: column;
    height: 15%;
    width: 93%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
}

.CliBar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    width: 100%;
}

.CliBar2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    width: 100%;
    padding-right: 10%;
}

.MinCliRows {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    height: 100%;
}

.MinCliRows text{
    font-size: 1rem;
    color: #130348;
    font-weight: 600;
}

.FechasInp {
    width: 50%;
    height: 50%;
    padding: 0.625rem 0.1rem 0.625rem 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.ConsTicks {
    padding: 10px 35px;
    border: 1px solid #FFFFFF;
    border-radius: 15px;
    background-color: #130348;
    color: #FFFFFF;
    font-size: 1rem;
    font-weight: 500;
}
</style>

<template>
    <div class="TicksFilterPrinc">
        <div class="CliBar">
            <div class="MinCliRows">
                <text>
                    Fecha Inicial:
                </text>
                <input 
                    type="text"
                    placeholder="Consultar Fecha"
                    class="FechasInp"
                    v-model="searchQuery"
                    autocomplete="off"
                />
            </div>
            <div class="MinCliRows">
                <text>
                    Fecha Inicial:
                </text>
                <input 
                    type="text"
                    placeholder="Consultar Frcha"
                    class="FechasInp"
                    v-model="searchQuery"
                    autocomplete="off"
                />
            </div>
        </div>
        <div class="CliBar2">
            <div class="MinCliRows">
                <text>
                    Folio:
                </text>
                <input 
                    type="text"
                    placeholder="Consultar Folio"
                    class="FechasInp"
                    v-model="searchQuery"
                    autocomplete="off"
                />
            </div>
            <button class="ConsTicks">
                Consultar
            </button>
        </div>
    </div>
</template>

<script setup>


</script>