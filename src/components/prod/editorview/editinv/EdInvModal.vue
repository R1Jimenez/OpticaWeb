<style scoped>
.EdInvModal {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 85%;
    padding-bottom: 20px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeadEdInv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 16px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
    flex-shrink: 0;
}

.HeadEdInv span {
    font-size: 1.5rem;
    font-weight: 550;
    color: white;
}

.guar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5px;
    padding: 3px 10px;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #459B45 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.guar span {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.guar:hover {
    background: white;
    border: 1px solid #58B358;
}

.guar:hover span{
    color: #58B358;
    font-weight: 600;
}

.CliBarEdInv {
    width: 70%;
    padding: 5px 1rem;
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

.CliBarEdInvCod {
    width: 50%;
    padding: 5px 1rem;
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

.Rowop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
}

.Rowop2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    width: 100%;
    margin-top: 20px;
    padding-left: 99px;
}

.Rowop2 span {
    font-size: 1.5rem;
    font-weight: 600;
    color: #130348;
}

.minrow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 50%;
}

.minrow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.minrow2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 20%;
}

.minrow2 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.minrow3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    width: 30%;
}

.minrow3 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.SectBoxINPE {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    font-size: 1rem;
    cursor: pointer;
    box-sizing: border-box;
}

.SectBoxINPE.placeholder {
    color: #999;
}

.ConsBut {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 10%;
    padding: 7px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    cursor: pointer;
}

.ConsBut:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
}

.ConsBut span {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.ConsBut:hover span {
    color: #130348;
}

.FogRid {
    display: grid;
    grid-template-columns: 35% 5fr;
    align-items: start;
    row-gap: 15px;
    column-gap: 4%;
    width: 50%;
    margin-left: 99px;
    margin-top: 25px;
    margin-bottom: auto;
}

.FogRid text{
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}
</style>

<template>
    <div class="EdInvModal">
            <div class="HeadEdInv">
                <span>Edición de Inventario</span>
                <button class="guar">
                    <span class="material-icons">
                        save
                    </span>
                    <span>Guardar</span>
                </button>
            </div>

            <div class="Rowop">
                <div class="minrow">
                    <text>Producto:</text>
                    <input
                        type=double
                        placeholder="Ingresar Producto"
                        class="CliBarEdInv"
                        v-model="searchQuery"
                        autocomplete="off"
                    />
                </div>

                <div class="minrow2">
                    <text>Estatus:</text>
                    <div class="SectBoxINPE">
                        <span>
                            Activo
                        </span>
                        <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                    </div>
                </div>
            </div>

            <div class="Rowop">
                <div class="minrow3">
                    <text>Código:</text>
                    <input
                        type=double
                        placeholder="Ingresar Código"
                        class="CliBarEdInvCod"
                        v-model="searchQuery"
                        autocomplete="off"
                    />
                </div>

                <div class="minrow3">
                    <text>Sucursal:</text>
                    <div class="SectBoxINPE">
                        <span>
                            Smart Torres Del Sur
                        </span>
                        <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                    </div>
                </div>

                <button class="ConsBut">
                    <span class="material-icons">search</span>
                    <span>Consultar</span>
                </button>
            </div>

            <div class="Rowop2">
                <span>Atributos de Producto</span>
            </div>
            <div class="FogRid">
                <text>Tipo</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Marca</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Modelo</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Colores</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <text>Tamaño</text>
                <div class="SectBoxINPE">
                    <span>
                        Todos
                    </span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
            </div>
        </div>
</template>

<script setup>

</script>