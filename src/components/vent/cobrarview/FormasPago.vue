<style scoped>
.FormPaPrincipal {
    display: flex;
    flex-direction: column;
    width: 98%;
    flex-shrink: 0;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.FormPaHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
    background: radial-gradient(
        ellipse at left,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1px solid #FB1C2E;
    color: white;
}

.FormPaHeader .Titulo {
    font-size: 1.2rem;
    font-weight: 600;
}

.FormPaHeader .PorCobrar {
    font-size: 0.95rem;
}

.FormPaPagsRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2%;
    padding: 14px 2% 0;
}

.FormPaPagosBox {
    flex: 1;
    border-radius: 16px;
    border: 1.5px solid #130348;
    background: white;
    overflow: hidden;
}

.FormPaPagosBox table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.FormPaPagosBox th {
    padding: 8px 12px;
    background-color: #F5F5F5;
    text-align: left;
    font-size: 0.95rem;
    font-weight: 700;
    color: #130348;
    border-bottom: 1px solid #130348;
}

.FormPaPagosBox td {
    padding: 5px 12px;
    font-size: 0.95rem;
    color: #130348;
    border-bottom: 1px solid #F0F0F0;
    vertical-align: middle;
}

.FormPaPagosBox tr:last-child td {
    border-bottom: none;
}

.FormPaPagosBox col.Forma { width: 34%; }
.FormPaPagosBox col.Importe { width: 26%; }

.FormPaInput {
    width: 100%;
    padding: 5px 8px;
    border: 1px solid #BCBCBC;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #130348;
    outline: none;
    box-sizing: border-box;
    background: white;
}

.FormPaInput.Importe {
    text-align: right;
}

.FormPaInput:focus {
    border-color: #130348;
    box-shadow: 0 0 0 1px #130348;
}

.FormPaInput:disabled {
    background: #F0F0F0;
    color: #6C757D;
}

.FormPaResumen {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 2%;
    padding: 14px 2% 16px;
}

.FormPaTotales {
    display: flex;
    flex-direction: row;
    gap: 14px;
}

.FormPaTotal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    min-width: 170px;
    padding: 8px 16px;
    border: 1.5px solid #130348;
    border-radius: 16px;
    background: white;
}

.FormPaTotal span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #6C757D;
}

.FormPaTotal strong {
    font-size: 1.4rem;
    color: #130348;
}

.FormPaTotal.negativa strong { color: #FB1C2E; }
.FormPaTotal.positiva strong { color: #2E8B57; }

.FormPaTotal small {
    font-size: 0.75rem;
    font-weight: 600;
}

.FormPaTotal.negativa small { color: #FB1C2E; }
.FormPaTotal.positiva small { color: #2E8B57; }

.FormPaObs {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;
}

.FormPaObs label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #130348;
}

.FormPaObs textarea {
    flex: 1;
    min-height: 60px;
    padding: 8px 12px;
    border: 1.5px solid #130348;
    border-radius: 16px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #130348;
    resize: vertical;
    outline: none;
}
</style>

<template>
    <div class="FormPaPrincipal">
        <div class="FormPaHeader">
            <span class="Titulo">Formas de Pago</span>
            <span v-if="cobro.totalGlobal > 0" class="PorCobrar">Por cobrar: {{ formatearMoneda(cobro.totalGlobal) }}</span>
        </div>
        <div class="FormPaPagsRow">
            <div v-for="(columna, i) in FORMAS_PAGO" :key="i" class="FormPaPagosBox">
                <table>
                    <colgroup>
                        <col class="Forma">
                        <col>
                        <col class="Importe">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Forma de Pago</th>
                            <th>Referencia</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="forma in columna" :key="forma">
                            <td>{{ forma }}</td>
                            <template v-if="forma === CREDITO">
                                <td></td>
                                <td>
                                    <input
                                        class="FormPaInput Importe"
                                        :value="Number(cobro.credito).toFixed(2)"
                                        title="Saldo que queda en cuentas por cobrar"
                                        data-cy="forma-credito"
                                        disabled
                                    />
                                </td>
                            </template>
                            <template v-else>
                                <td>
                                    <input
                                        v-if="forma !== EFECTIVO"
                                        v-model="cobro.formas[forma].referencia"
                                        class="FormPaInput"
                                        maxlength="100"
                                        :aria-label="`Referencia ${forma}`"
                                    />
                                </td>
                                <td>
                                    <input
                                        v-model="cobro.formas[forma].importe"
                                        class="FormPaInput Importe"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        :aria-label="`Importe ${forma}`"
                                        :data-cy="`importe-${forma}`"
                                    />
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="FormPaResumen">
            <div class="FormPaTotales">
                <div class="FormPaTotal">
                    <span>Total Pagado</span>
                    <strong data-cy="total-pagado">{{ formatearMoneda(cobro.totalPagado) }}</strong>
                </div>
                <div class="FormPaTotal" :class="estadoDiferencia">
                    <span>Diferencia</span>
                    <strong data-cy="diferencia">{{ formatearMoneda(cobro.diferencia) }}</strong>
                    <small v-if="avisoDiferencia" data-cy="diferencia-aviso">{{ avisoDiferencia }}</small>
                </div>
            </div>
            <div class="FormPaObs">
                <label for="cobro-observaciones">Observaciones:</label>
                <textarea
                    id="cobro-observaciones"
                    v-model="cobro.observaciones"
                    maxlength="500"
                    data-cy="observaciones"
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCobroStore, FORMAS_PAGO, EFECTIVO, CREDITO } from '../../../stores/cobro'
import { formatearMoneda } from '../../../utils/formato'

const cobro = useCobroStore()

const estadoDiferencia = computed(() => {
    if (cobro.diferencia < 0 || cobro.cambioInvalido) return 'negativa'
    return cobro.diferencia > 0 ? 'positiva' : ''
})

const avisoDiferencia = computed(() => {
    if (cobro.totalGlobal <= 0) return ''
    if (cobro.diferencia < 0) return 'Falta por cubrir'
    if (cobro.cambioInvalido) return 'El cambio solo puede darse en efectivo'
    return cobro.diferencia > 0 ? 'Cambio a entregar' : ''
})
</script>