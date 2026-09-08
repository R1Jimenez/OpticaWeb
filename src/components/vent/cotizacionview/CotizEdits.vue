<style scoped>
.CotizEditsPrinc {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 98%;
    height: auto;
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: solid 2px #FB1C2E;
    border-radius: 22px;
    overflow: hidden;
}

.HeaderCotiz {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 16px;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border-bottom: 1.5px solid #FB1C2E;
    gap: 10px;
    flex-shrink: 0;
}

.HeaderCotiz span {
    font-size: 1.3rem;
    font-weight: 550;
    color: white;
}

.pacienteDropdownWrap {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.HeaderCotiz .material-icons.arrow-paciente {
    cursor: pointer;
}

.HeaderCotiz .material-icons.arrow-paciente.disabled {
    cursor: default;
    opacity: 0.4;
}

.dropdownPacientes {
    position: absolute;
    top: 130%;
    left: 0;
    width: max-content;
    min-width: 220px;
    background: white;
    border: 2px solid #FB1C2E;
    border-radius: 15px;
    z-index: 100;
    max-height: 260px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.itemPaciente {
    display: flex;
    align-items: center;
    padding: 10px 18px;
    cursor: pointer;
    gap: 10px;
    transition: background 0.15s;
    border-bottom: 1px solid #f0f0f0;
}

.itemPaciente:last-child {
    border-bottom: none;
}

.itemPaciente:hover {
    background-color: #f5f5f5;
}

.nombrePaciente {
    font-size: 1rem;
    font-weight: 600;
    color: #130348;
}

.sinPacientes, .loadingPacientes {
    padding: 14px 18px;
    color: #888;
    font-size: 0.9rem;
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead tr {
    background-color: #F5F5F5;
}

thead th {
    padding: 9px;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    line-height: 1.2;
    word-break: break-word;
    white-space: normal;
    border-bottom: 1px solid #130348;
}

tbody tr {
    border-bottom: 1px solid #F0F0F0;
    transition: background 0.15s;
    cursor: pointer;
}

tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background-color: #FAFAFA; }

tbody td {
    padding: 10px;
    font-size: 1rem;
    font-weight: 550;
    color: #130348;
    white-space: nowrap;
    border: 1px solid #130348;
    text-align: center;
}

.TablaProductos tbody td:nth-child(1) {
    text-align: left;
}

.TablaProductos tbody td:nth-child(2) {
    text-align: left;
}

.producto-wrapper {
    overflow: hidden;
    width: 100%;
}

.producto-text {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
}

.producto-text.is-scrolling {
    max-width: none;
    text-overflow: clip;
}

.Eliminar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: #FB1C2E;
    border: 1px solid white;
    border-radius: 15px;
    padding: 3px 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.Eliminar:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #FB1C2E;
    color: #FB1C2E;
}

.accept {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: radial-gradient(
        ellipse at center,
        #130348 10%,
        #07072C 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: 3px 7px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.accept:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #130348;
    color: #130348;
}

.Cobr {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background: radial-gradient(
        ellipse at center,
        #58B358 10%,
        #2E8B57 100%
    );
    border: 1px solid white;
    border-radius: 15px;
    padding: 1px 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.Cobr:disabled {
    opacity: 0.6;
    cursor: default;
}

.errorCobro {
    color: #FB1C2E;
    font-weight: 600;
    text-align: left;
}

.Cobr:hover {
    background: radial-gradient(
        #F0F0F0 10%,
        #BCBCBC 100%
    );
    border: 1px solid #58B358;
    color: #58B358;
}

.CliBarEdInv {
    width: 100%;
    padding: 3px 5px 3px 5px;
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
</style>

<template>
    <div class="CotizEditsPrinc">
        <div class="HeaderCotiz">
            <span>Cotizacion: </span>
            <span>{{ nombreCliente }}</span>
            <div class="pacienteDropdownWrap">
                <span
                    class="material-icons arrow-paciente"
                    :class="{ disabled: !cotizacionStore.clienteSeleccionado }"
                    @click="toggleDropdownPacientes"
                >arrow_right</span>
                <span>{{ nombrePaciente }}</span>
                <div class="dropdownPacientes" v-if="mostrarDropdownPacientes">
                    <div v-if="isLoadingPacientes" class="loadingPacientes">Cargando...</div>
                    <div v-else-if="pacientes.length === 0" class="sinPacientes">
                        No hay pacientes registrados
                    </div>
                    <div
                        v-else
                        v-for="paciente in pacientes"
                        :key="paciente.id"
                        class="itemPaciente"
                        @click="seleccionarPaciente(paciente)"
                    >
                        <span class="material-icons" style="color: #130348;">person</span>
                        <span class="nombrePaciente" style="color: #130348;">{{ paciente.nombres }} {{ paciente.apellidos }}</span>
                    </div>
                </div>
            </div>
        </div>
        <table class="TablaProductos">
            <colgroup>
                <col style="width: 73.5%;">
                <col style="width: 7%;">
                <col style="width: 4%;">
                <col style="width: 8%;">
                <col style="width: 7.5%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio Venta</th>
                    <th>Piezas</th>
                    <th>Total Producto</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="cotizacionStore.items.length === 0">
                    <td colspan="5">Sin productos agregados</td>
                </tr>
                <tr v-for="item in cotizacionStore.items" :key="item.producto.id">
                    <td>
                        <div class="producto-wrapper" @mouseenter="onProductoHover" @mouseleave="onProductoLeave">
                            <span class="producto-text">{{ item.producto.nombre }}</span>
                        </div>
                    </td>
                    <td>${{ Number(item.precio?.precio || 0).toFixed(2) }}</td>
                    <td>{{ item.piezas }}</td>
                    <td>${{ totalItem(item).toFixed(2) }}</td>
                    <td>
                        <button class="Eliminar" @click="quitarProducto(item)">
                            <span class="material-icons">close</span>
                            <span>Eliminar</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table>
            <colgroup>
                <col style="width: 69%;">
                <col style="width: 8%;">
                <col style="width: 8%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th>Total Normal</th>
                    <th>Total Venta</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>${{ cotizacionStore.totalNormal.toFixed(2) }}</td>
                    <td>${{ cotizacionStore.totalVenta.toFixed(2) }}</td>
                    <td>
                        <button class="accept" @click="imprimirMuestra">
                            <span>Imprimir Cotización Muestra</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <table>
            <colgroup>
                <col style="width: 76%;">
                <col style="width: 8%;">
                <col style="width: 8%;">
                <col style="width: 8%;">
            </colgroup>
            <tbody>
                <tr>
                    <td></td>
                    <td>Ahorro:</td>
                    <td>
                        <input
                            type="text"
                            class="CliBarEdInv"
                            :value="`$${ahorro.toFixed(2)}`"
                            readonly
                        />
                    </td>
                    <td>
                        <button class="Cobr" :disabled="enviandoCotizacion" @click="cobrar">
                            <span class="material-icons">attach_money</span>
                            <span>{{ enviandoCotizacion ? 'Enviando...' : 'Cobrar' }}</span>
                        </button>
                    </td>
                </tr>
                <tr v-if="errorCobro">
                    <td colspan="4" class="errorCobro">{{ errorCobro }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { useCotizacionStore } from '../../../stores/cotizacion'
import { getPacientesByCliente } from '../../../services/PacientesServices'

const cotizacionStore = useCotizacionStore()
const authStore = useAuthStore()

const pacientes = ref([])
const isLoadingPacientes = ref(false)
const mostrarDropdownPacientes = ref(false)
const enviandoCotizacion = ref(false)
const errorCobro = ref(null)

const nombreCliente = computed(() => {
    const cliente = cotizacionStore.clienteSeleccionado
    if (!cliente) return ''
    return `${cliente.nombres} ${cliente.apellidos}`
})

const nombrePaciente = computed(() => {
    const paciente = cotizacionStore.pacienteSeleccionado
    if (!paciente) return ''
    return `${paciente.nombres} ${paciente.apellidos}`
})

const sucursalNombre = computed(() => {
    return cotizacionStore.sucursalSeleccionada?.nombre || 'N/A'
})

const vendedorNombre = computed(() => {
    const u = authStore.user?.user ?? authStore.user
    if (!u) return 'N/A'
    if (u.nombres) return `${u.nombres} ${u.apellidos || ''}`.trim()
    return u.nombre || u.usuario || u.username || 'N/A'
})

const fechaTicket = computed(() => {
    return new Date().toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
})

const totalItem = (item) => Number(item.precio?.precio || 0) * item.piezas

const quitarProducto = (item) => {
    cotizacionStore.quitarItem(item)
}

const imprimirMuestra = () => {
    const ventana = window.open('', '_blank')
    if (!ventana) return

    const descuentoPct = cotizacionStore.descuentoPorcentaje || 0
    const ahorroTotal = cotizacionStore.totalNormal - cotizacionStore.totalVenta

    const filas = cotizacionStore.items.map(item => {
        const precioUnit = Number(item.precio?.precio || 0)
        const descuentoUnit = precioUnit * descuentoPct / 100
        const precioConDescuento = precioUnit - descuentoUnit
        const subtotal = precioConDescuento * item.piezas

        return `
            <tr>
                <td>${item.piezas}</td>
                <td>${item.producto.nombre}</td>
                <td>$${precioUnit.toFixed(2)}</td>
                <td>$${descuentoUnit.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `
    }).join('')

    ventana.document.write(`
        <html>
        <head>
            <title>Cotización Muestra</title>
            <style>
                @page {
                    size: 80mm auto;
                    margin: 0;
                }
                * { box-sizing: border-box; }
                body {
                    width: 80mm;
                    margin: 0;
                    padding: 4mm;
                    font-family: 'Courier New', monospace;
                    font-size: 11px;
                    color: #000;
                }
                h2 {
                    margin: 0 0 4px 0;
                    font-size: 13px;
                    text-align: center;
                }
                p {
                    margin: 2px 0;
                }
                hr {
                    border: none;
                    border-top: 1px dashed #000;
                    margin: 6px 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 6px;
                }
                th, td {
                    padding: 2px 0;
                    font-size: 10px;
                    text-align: left;
                }
                th {
                    border-bottom: 1px dashed #000;
                }
                .pz, .pu, .sub {
                    text-align: right;
                }
                .total, .ahorro {
                    text-align: right;
                    font-weight: bold;
                    margin-top: 4px;
                    font-size: 12px;
                }
                .footer {
                    text-align: center;
                    margin-top: 8px;
                    font-size: 10px;
                }
            </style>
        </head>
        <body>
            <h2>Visual Optics</h2>
            <h2>Cotización Muestra</h2>
            <p style="text-align:center;">(sin validez fiscal)</p>
            <hr>
            <p>Sucursal: ${sucursalNombre.value}</p>
            <p>Fecha: ${fechaTicket.value}</p>
            <p>Vendedor: ${vendedorNombre.value}</p>
            <hr>
            <p>Cliente: ${nombreCliente.value || 'N/A'}</p>
            <p>Paciente: ${nombrePaciente.value || 'N/A'}</p>
            <hr>
            <table>
                <thead>
                    <tr>
                        <th>Cant.</th>
                        <th>Prod.</th>
                        <th class="pz">Precio Unit</th>
                        <th class="pu">Desc. Unit.</th>
                        <th class="sub">Subt.</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
            <hr>
            <p>Total Normal: $${cotizacionStore.totalNormal.toFixed(2)}</p>
            <p class="ahorro">Descuento (${descuentoPct}%): -$${ahorroTotal.toFixed(2)}</p>
            <p class="total">Total: $${cotizacionStore.totalVenta.toFixed(2)}</p>
            <p class="footer">Visual Optics</p>
            <p class="footer">Despues de 60 dias, no nos hacemos</p>
            <p class="footer">responsables por ningun trabajo.</p>
            <p class="footer">Ordenado el trabajo, no se admiten</p>
            <p class="footer">cancelaciones ni devoluciones.</p>
            <p class="footer">Gracias por su preferencia.</p>
            <p class="footer">Aviso de privacidad disponible en nuestra</p>
            <p class="footer">página web.</p>
        </body>
        </html>
    `)
    ventana.document.close()
    ventana.focus()
    ventana.print()
}

const cobrar = async () => {
    errorCobro.value = null
    enviandoCotizacion.value = true
    try {
        const cotizacion = await cotizacionStore.crearCotizacion()
        cotizacionStore.limpiarItems()
        cotizacionStore.setPagoInicial(0)
        alert(`Cotización #${cotizacion.id} creada correctamente. Total: $${Number(cotizacion.total_venta).toFixed(2)}`)
    } catch (error) {
        errorCobro.value = error.message
    } finally {
        enviandoCotizacion.value = false
    }
}

const cargarPacientes = async (clienteId) => {
    isLoadingPacientes.value = true
    try {
        pacientes.value = await getPacientesByCliente(clienteId)
    } catch (error) {
        console.error('Error al cargar pacientes:', error)
        pacientes.value = []
    } finally {
        isLoadingPacientes.value = false
    }
}

const toggleDropdownPacientes = () => {
    if (!cotizacionStore.clienteSeleccionado) return

    mostrarDropdownPacientes.value = !mostrarDropdownPacientes.value
    if (mostrarDropdownPacientes.value) {
        cargarPacientes(cotizacionStore.clienteSeleccionado.id)
    }
}

const seleccionarPaciente = (paciente) => {
    cotizacionStore.setPaciente(paciente)
    mostrarDropdownPacientes.value = false
}

watch(() => cotizacionStore.clienteSeleccionado, () => {
    mostrarDropdownPacientes.value = false
    pacientes.value = []
})

const onProductoHover = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.classList.add('is-scrolling')

    const overflow = text.scrollWidth - wrapper.clientWidth
    if (overflow > 0) {
        const duration = Math.max(1, overflow / 40)
        text.style.transition = `transform ${duration}s linear`
        text.style.transform = `translateX(-${overflow}px)`
    } else {
        text.classList.remove('is-scrolling')
    }
}

const onProductoLeave = (event) => {
    const wrapper = event.currentTarget
    const text = wrapper.querySelector('.producto-text')
    text.style.transform = 'translateX(0)'
    text.addEventListener('transitionend', () => {
        text.classList.remove('is-scrolling')
        text.style.transition = ''
    }, { once: true })
}

const ahorro = computed(() => {
    return cotizacionStore.totalNormal - cotizacionStore.totalVenta
})
</script>