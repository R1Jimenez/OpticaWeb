// Ticket de venta (80mm). Lo usan la cotización al cobrar y la reimpresión de tickets.
import { escapeHtml } from './formato'

const dinero = (valor) => `$${Number(valor || 0).toFixed(2)}`

export function formatearFechaTicket(fecha) {
    return fecha.toLocaleString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

// La promesa de entrega es una fecha de calendario: se muestra tal cual, sin convertir zona horaria
function formatearPromesa(valor) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valor ?? ''))
    return m ? `${m[3]}/${m[2]}/${m[1]}` : (valor || 'N/A')
}

// Se abre antes de cualquier await para que el navegador no la bloquee como popup
export function abrirVentanaTicket() {
    return window.open('', '_blank')
}

/**
 * datos: { folio, sucursal, fecha: Date, vendedor, cliente: { nombre, direccion, telefono, tipo },
 *          paciente, items: [{ cantidad, nombre, precioUnitario }], descuentoPct, totalNormal,
 *          totalVenta, plazo, pagoInicial, pagoRestante, promesaEntrega }
 * Sin folio se imprime como cotización muestra.
 */
export function escribirTicket(ventana, datos) {
    if (!ventana) return

    const esTicketReal = datos.folio != null
    const descuentoPct = Number(datos.descuentoPct) || 0
    const totalNormal = Number(datos.totalNormal) || 0
    const totalVenta = Number(datos.totalVenta) || 0
    const ahorro = totalNormal - totalVenta
    const titulo = esTicketReal ? `Cotización #${escapeHtml(datos.folio)}` : 'Cotización Muestra'
    const cliente = datos.cliente ?? {}

    const filas = (datos.items ?? []).map(item => {
        const precioUnit = Number(item.precioUnitario || 0)
        const descuentoUnit = precioUnit * descuentoPct / 100
        const subtotal = (precioUnit - descuentoUnit) * item.cantidad

        return `
            <tr>
                <td>${escapeHtml(item.cantidad)}</td>
                <td>${escapeHtml(item.nombre)}</td>
                <td>${dinero(precioUnit)}</td>
                <td>${dinero(descuentoUnit)}</td>
                <td>${dinero(subtotal)}</td>
            </tr>
        `
    }).join('')

    const bloqueCliente = esTicketReal ? `
        <p>Tipo Cliente: ${escapeHtml(cliente.tipo || 'N/A')}</p>
        <p>Nombre: ${escapeHtml(cliente.nombre || 'N/A')}</p>
        <p>Dirección: ${escapeHtml(cliente.direccion || 'N/A')}</p>
        <p>Teléfono: ${escapeHtml(cliente.telefono || 'N/A')}</p>
        <hr>
    ` : `
        <p>Cliente: ${escapeHtml(cliente.nombre || 'N/A')}</p>
    `

    const bloquePago = esTicketReal ? `
        <hr>
        <p>Plazo: ${escapeHtml(datos.plazo || 'N/A')}</p>
        <p>Pago Inicial: ${dinero(datos.pagoInicial)}</p>
        <p>Pago Restante: ${dinero(datos.pagoRestante)}</p>
        <p>Promesa de Entrega: ${escapeHtml(formatearPromesa(datos.promesaEntrega))}</p>
    ` : ''

    ventana.document.write(`
        <html>
        <head>
            <title>${titulo}</title>
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
            <h2>${titulo}</h2>
            ${!esTicketReal ? `<p style="text-align:center;">(sin validez fiscal)</p>` : ''}
            <hr>
            <p>Sucursal: ${escapeHtml(datos.sucursal || 'N/A')}</p>
            <p>Fecha: ${escapeHtml(formatearFechaTicket(datos.fecha ?? new Date()))}</p>
            <p>Vendedor: ${escapeHtml(datos.vendedor || 'N/A')}</p>
            <hr>
            ${bloqueCliente}
            <p>Paciente: ${escapeHtml(datos.paciente || 'N/A')}</p>
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
            <p>Total Normal: ${dinero(totalNormal)}</p>
            <p class="ahorro">Descuento (${escapeHtml(descuentoPct)}%): -${dinero(ahorro)}</p>
            <p class="total">Total: ${dinero(totalVenta)}</p>
            ${bloquePago}
            <hr>
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
