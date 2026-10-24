// El backend guarda las fechas en UTC sin zona horaria
export function parsearFechaUTC(fecha) {
    if (!fecha) return null
    return new Date(/[zZ]|[+-]\d{2}:\d{2}$/.test(fecha) ? fecha : `${fecha}Z`)
}

export function formatearMoneda(valor) {
    return Number(valor ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
}

export const escapeHtml = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]))

// Fechas de calendario (promesas de entrega): se guardan como medianoche sin zona horaria y no deben convertirse
export function parsearFechaCalendario(valor) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valor ?? ''))
    return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null
}

export function fechaCalendarioISO(fecha) {
    if (!fecha) return null
    const d = new Date(fecha)
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00:00`
}
