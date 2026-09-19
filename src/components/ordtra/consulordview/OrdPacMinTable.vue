<style scoped>
.DetalleTitulo {
    font-weight: 700;
    font-size: 0.85rem;
    color: #130348;
    text-align: left;
    padding-bottom: 4px;
    border-bottom: 1px solid #DDD;
    margin-bottom: 4px;
}

.MiniTablaPaciente {
    width: 100%;
    border-collapse: collapse;
    background: transparent;
}

.MiniTablaPaciente th {
    font-size: 0.8rem;
    font-weight: 700;
    color: #130348;
    text-align: center;
    padding: 2px 6px;
    border: none;
}

.MiniTablaPaciente td {
    font-size: 0.8rem;
    color: #130348;
    text-align: center;
    padding: 2px 6px;
    border: none;
    white-space: nowrap;
}

.MiniTablaPaciente .EtiquetaFila {
    text-align: left;
    font-weight: 600;
}
</style>

<template>
    <div class="DetalleTitulo">{{ nombrePaciente }}</div>
        <table class="MiniTablaPaciente">
            <thead>
                <tr>
                    <th></th>
                    <th>OI</th>
                    <th>OD</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="EtiquetaFila">Esfera</td>
                    <td>{{ oi.esfera }}</td>
                    <td>{{ od.esfera }}</td>
                </tr>
                <tr>
                    <td class="EtiquetaFila">Cilindro</td>
                    <td>{{ oi.cilindro }}</td>
                    <td>{{ od.cilindro }}</td>
                </tr>
                <tr>
                    <td class="EtiquetaFila">Eje</td>
                    <td>{{ oi.eje }}</td>
                    <td>{{ od.eje }}</td>
                </tr>
            </tbody>
        </table>
</template>

<script setup>
defineProps({
    nombrePaciente: { type: String, default: 'TERRAZAS AMBERLYN' },
    oi: { type: Object, default: () => ({ esfera: '-0.5', cilindro: '-0.75', eje: '85' }) },
    od: { type: Object, default: () => ({ esfera: '-0.5', cilindro: '-0.5', eje: '90' }) },
})
</script>