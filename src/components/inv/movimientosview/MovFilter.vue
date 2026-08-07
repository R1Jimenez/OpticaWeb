<style scoped>
.PrincFilt {
    display: flex;
    flex-direction: column;
    width: 93%;
    min-height: 20px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 5%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
    gap: 10px;
    padding-bottom: 1%;
    flex-shrink: 0;
}

.HeadRow {
    padding: 10px 30px;
    border-bottom: 1px solid #FB1C2E;
    background: radial-gradient(
        ellipse at center,
        #130348 0%,
        #07072C 100%
    );
    margin-bottom: auto;
}

.HeadRow text {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
}

.rowfilt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5%;
    width: 100%;
}

.rowfiltdate {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5%;
    width: 100%;
}

.rowfilt text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.rowfiltdate text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.rowfiltdate2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 5%;
    width: 100%;
    padding-left: 3%;
    padding-right: 3%;
}

.rowfiltdate2 text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
}

.barrmov {
    width: 60%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.barrmov2 {
    width: 100%;
    padding: 0.2rem 0.2rem 0.2rem 1rem;
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

.rowcolmn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 20%;
    gap: 2px;
}

.SelectBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 2px 15px;
    min-width: 100%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    border-radius: 15px;
}

.Cons {
    padding: 7px 25px;
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
}
</style>

<template>
    <div class="PrincFilt">
        <div class="HeadRow">
            <text>
                Movimientos de Inventario
            </text>
        </div>
        <div class="rowfilt">
            <text>
                Producto: 
            </text>
            <input
                class="barrmov"
                :value="inputValue"
                v-on="inputEvents"
                placeholder="Ingresar Producto"
                readonly
            />
            <button class="Cons">
                Consultar
            </button>
        </div>
        <div class="rowfiltdate">
            <div class="rowcolmn">
                <text>
                    Fecha Inicial: 
                </text>
                <DatePicker
                    v-model="fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="fechaInicio"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="barrmov2"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
            <div class="rowcolmn">
                <text>
                    Fecha Inicial: 
                </text>
                <DatePicker
                    v-model="fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="fechaInicio"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="barrmov2"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
        </div>
        <div class="rowfiltdate2">
            <div class="rowcolmn">
                <text>
                    Sucursal: 
                </text>
                <div class="SelectBox">
                    <text>
                        Smart Torres Del Sur
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
            <div class="rowcolmn">
                <text>
                    Código:
                </text>
                <input
                    class="barrmov2"
                    :value="inputValue"
                    v-on="inputEvents"
                    placeholder="Ingresar Código"
                    readonly
                />
            </div>
            <div class="rowcolmn">
                <text>
                    Tipo: 
                </text>
                <div class="SelectBox">
                    <text>
                        Todos
                    </text>
                    <span class="material-icons" style="color:#130348; font-size:25px;">arrow_drop_down</span>
                </div>
            </div>
            <div class="rowcolmn">
                <text>
                    Referencia:
                </text>
                <input
                    class="barrmov2"
                    :value="inputValue"
                    v-on="inputEvents"
                    placeholder="Ingresar Referencia"
                    readonly
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'
</script>