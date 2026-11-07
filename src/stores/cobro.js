import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const EFECTIVO = 'Efectivo'
export const CREDITO = 'Crédito'
// Mismo orden que en caja; "Crédito" solo informa el saldo que se va a cuentas por cobrar
export const FORMAS_PAGO = [
    [EFECTIVO, 'Nota de Crédito', 'Vale', 'Cheque', 'Tarjeta de Crédito', CREDITO, 'Cortesía'],
    ['Depósito Bancario', 'Vale de Descuento', 'Bancomer', 'Banamex', 'Santander', 'AMEX', 'CLIP'],
]
const CAPTURABLES = FORMAS_PAGO.flat().filter(f => f !== CREDITO)

const centavos = (valor) => Math.round(Number(valor || 0) * 100)
const formasVacias = () => Object.fromEntries(CAPTURABLES.map(f => [f, { referencia: '', importe: '' }]))

// Formas de pago capturadas en Cobrar; las comparten la pestaña activa y el panel de formas de pago
export const useCobroStore = defineStore('cobro', () => {
    const formas = reactive(formasVacias())
    const observaciones = ref('')
    const totalGlobal = ref(0)
    const credito = ref(0)

    const totalPagado = computed(() => CAPTURABLES.reduce((acc, f) => acc + centavos(formas[f].importe), 0) / 100)
    const diferencia = computed(() => (centavos(totalPagado.value) - centavos(totalGlobal.value)) / 100)
    const efectivo = computed(() => centavos(formas[EFECTIVO].importe) / 100)
    // el cambio solo puede entregarse en efectivo
    const cambioInvalido = computed(() => diferencia.value > 0 && centavos(diferencia.value) > centavos(efectivo.value))
    const cubreTotal = computed(() => totalGlobal.value > 0 && diferencia.value >= 0 && !cambioInvalido.value)

    function limpiar() {
        Object.assign(formas, formasVacias())
        observaciones.value = ''
    }

    function payloadFormas() {
        return CAPTURABLES
            .filter(f => centavos(formas[f].importe) > 0)
            .map(f => ({
                forma: f,
                referencia: formas[f].referencia.trim() || null,
                importe: (centavos(formas[f].importe) / 100).toFixed(2),
            }))
    }

    return {
        formas, observaciones, totalGlobal, credito,
        totalPagado, diferencia, efectivo, cambioInvalido, cubreTotal,
        limpiar, payloadFormas,
    }
})
