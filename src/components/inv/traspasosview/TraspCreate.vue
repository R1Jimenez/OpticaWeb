<style scoped>
.ModOver {
    display: flex;
    flex-direction: column;
    gap: 5%;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.NewTraspModal {
    display: flex;
    flex-direction: column;
    width: 75%;
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    padding-bottom: 16px;
}

.TrasModHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 3%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
    box-sizing: border-box;
}

.TrasModHeader span {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
}

.FormGrid {
    display: grid;
    grid-template-columns: 22% 1fr;
    align-items: start;
    row-gap: 18px;
    column-gap: 4%;
    width: 90%;
    margin-top: 16px;
}

.FormLabel {
    font-size: 1.2rem;
    font-weight: 600;
    color: #130348;
    text-align: right;
    padding-top: 6px;
}

.texta {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
    resize: none;
    font-family: inherit;
    min-height: 2.2rem;
    box-sizing: border-box;
}

.EstatusColumn {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;
}

.estbox {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 12px;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
}

.EstatusColumn span {
    font-size: 0.95rem;
    font-weight: 500;
    color: #130348;
}

.SelectBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1rem;
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

.SelectBox.placeholder {
    color: #999;
}

.ProRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100;
    margin-top: 16px;
    margin-bottom: 16px;
}

.RowProd {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 16px;
    width: 60%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1.5px solid #FB1C2E;
    border-radius: 10px;
}

.RowProd text {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.barrmov {
    width: 20%;
    padding: 5px 16px;
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.AddProd {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;
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

.AddProd:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
    color: #58B358;
}

.ProdModTab {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.ProdHeModTab tr {
    background-color: #F0F0F0;
}

.ProdHeModTab th {
    padding: 5px 1px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-top: 1px solid #130348;
    border-bottom: 1px solid #130348;
}

.ProdBodModTab tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
}

.ProdBodModTab tr:hover { background-color: #FAFAFA; }

.ProdBodModTab td {
    padding: 5px 5px;
    font-size: 1rem;
    color: #130348;
    text-align: center;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    border: 1px solid #130348;   
}

.barrmovtab {
    width: 80%;
    padding: 5px 16px;
    border: 2px solid #FB1C2E;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.2s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 50%,
        #BCBCBC 150%
    );
    color: #130348;
}

.LesTabMov {
    margin-left: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 5px;
    background: radial-gradient(
        ellipse at center,
        #FB1C2E 10%,
        #bb1724 100%
    );
    border: 1px solid white;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
}

.LesTabMov:hover {
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
}
</style>

<template>
    <div class="ModOver" @click.self="$emit('cerrar')">
        <div class="NewTraspModal">
            <div class="TrasModHeader">
                <span>Información General</span>
            </div>

            <div class="FormGrid">
                <span class="FormLabel">Comentarios</span>
                <textarea
                    class="texta"
                    v-model="comentarios"
                    rows="3"
                ></textarea>

                <span class="FormLabel">Estatus</span>
                <div class="EstatusColumn">
                    <div class="estbox">Nuevo</div>
                    <span>El traspaso no ha sido guardado</span>
                </div>

                <span class="FormLabel">Origen</span>
                <div class="SelectBox">
                    <span>{{ origen || 'Almacén Central' }}</span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <span class="FormLabel">Destino</span>
                <div class="SelectBox" :class="{ placeholder: !destino }">
                    <span>{{ destino || 'Seleccione una sucursal' }}</span>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>

                <span class="FormLabel">Promesa de Entrega</span>
                <DatePicker
                    v-model="fechaFin"
                    :masks="{ input: 'DD/MM/YYYY' }"
                    locale="es"
                    :min-date="fechaInicio"
                >
                    <template #default="{ inputValue, inputEvents }">
                        <input
                            class="texta"
                            :value="inputValue"
                            v-on="inputEvents"
                            placeholder="dd/mm/aaaa"
                            readonly
                        />
                    </template>
                </DatePicker>
            </div>
        </div>
        <div class="NewTraspModal">
            <div class="TrasModHeader">
                <span>Productos</span>
            </div>
            <div class="ProRow">
                <div class="RowProd">
                    <text>
                        Buscar Producto...
                    </text>
                    <span class="material-icons" style="font-size:20px;">arrow_drop_down</span>
                </div>
                <input
                    class="barrmov"
                    :value="inputValue"
                    v-on="inputEvents"
                    placeholder="Cantidad"
                    readonly
                />
                <button class="AddProd">
                    <span class="material-icons">add</span>
                </button>
            </div>
            <table class="ProdModTab">
                <colgroup>
                    <col style="width:13%">
                    <col style="width:14%">
                    <col style="width:25%">
                    <col style="width:13%">
                    <col style="width:7.666666667%">
                    <col style="width:7.666666667%">
                    <col style="width:12%">
                    <col style="width:7.666666667%">
                </colgroup>
                <thead class="ProdHeModTab">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Código Externo</th>
                        <th>Punto de Reorden</th>
                        <th>Unidades en Existencia</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="ProdBodModTab">
                    <tr>
                        <td>0102690223900000000</td>
                        <td>@VER AR 254 UNISEX</td>
                        <td>OFTALMICO @VER AR 254 UNISEX (0102690223900000000)</td>
                        <td>COMPLETO PASTA</td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                            <input
                                class="barrmovtab"
                                :value="inputValue"
                                v-on="inputEvents"
                                placeholder="Cantidad"
                                readonly
                            />
                        </td>
                        <td>
                            <button class="LesTabMov">
                                <span class="material-icons">remove</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'

defineEmits(['cerrar'])

const comentarios = ref('')
const origen = ref('Almacen Central')
const destino = ref('')
const fechaPromesa = ref('')
</script>