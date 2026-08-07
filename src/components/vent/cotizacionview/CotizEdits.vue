<style scoped>
.Cotizacion {
    display: flex;
    flex-direction: column;
    height: 35%;
    width: 98%;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 3px solid #FB1C2E;
    border-radius: 22px;
}

.CotizTitulo {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 22%;
    width: 5%;
    background: radial-gradient(
        ellipse at top,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 1.5px solid #FB1C2E;
    border-radius: 22px;
    margin-left: 1.6%;
    margin-top: 1.7%;
}

.CotizTitulo span {
    position: relative;
    font-size: 1.7rem;
    font-weight: bold;
    color:#130348;
    display: inline-block;
    transform: rotate(270deg);
    white-space:  nowrap;
}

.CotizComponents {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    width: 100%;
    height: 30%;
    background: radial-gradient(
        ellipse at center,
        #130348 50%,
        #07072C 100%
    );
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    gap: .5%;
}

.VentaColumn {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 10%;
    align-items: center;
    justify-content: center;
    gap: .5%;
    position: relative;
}

.Venta-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 2px solid #130348;
    border-radius: 8px;
    z-index: 100;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.Venta-dropdown-item {
    padding: 11px 12px;
    font-size: 0.95rem;
    color: #130348;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
}

.Venta-dropdown-item:hover {
    background: #F0F0F0;
}

.VentaRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    cursor: pointer;
}

.VentaRow text {
    font-size: 1.1rem;
    font-weight: bold;
    color:white;
}

.LentRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 25%;
    width: 100%;
    cursor: pointer;
    padding-left: 10%;
    padding-right: 10%;
}

.LentRow text {
    font-size: .9rem;
    font-weight: bold;
    color:white;
}

.EddResults {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.EddResults text {
    font-size: 1.1rem;
    font-weight: bold;
    color:white;
}

.IconSpace {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: 6%;
    border-radius: 10px;
    background: radial-gradient(
        ellipse at center,
        #F0F0F0 50%,
        #BCBCBC 100%
    );
}

.Edits {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: 25%;
}

.StatsDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 13%;
    background: radial-gradient(
        ellipse at bottom, 
        #130348 100%,
        #07072C 50%
    );
    border-top-right-radius: 20px;
    position: relative;  /* ← needed for ::before */
}

.StatsDiv::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;        /* ← same as your border-left width */
    height: 100%;
    background: radial-gradient(
        ellipse at bottom,
        #F0F0F0 20%,
        #BCBCBC 80%
    );
}

.RowInf {
    display: flex;
    flex-direction: row;
    height: 70%;
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-left: 8%;
}

thead tr {
    background-color: #F5F5F5;
}

thead th {
    padding: 9px 72px;
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    color: #130348;
    white-space: nowrap;
    border-bottom: 1px solid #BCBCBC;
}

.Costos {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5%;
    border-left: 10px solid #130348;
    background: radial-gradient(
        ellipse at top,
        #F0F0F0 20%,
        #BCBCBC 80%
    );
    border-bottom-right-radius: 20px;
}

.CostRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 25%;
}

.CostRow text {
    font-size: 1.3rem;
    font-weight: bold;
    color: #130348;
}
</style>

<template>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
    </head>
    <div class="Cotizacion">
        <div class="CotizTitulo">
            <span>Cotizacion 1</span>
        </div>
        <div class="CotizComponents">
            <div class="VentaColumn">
                <div class="VentaRow" @click="toggleDropdown">
                    <text>Tipo de Venta</text>
                    <span class="material-icons" style="color:white; font-size:25px;">
                        {{ showDropdown ? 'arrow_drop_up' : 'arrow_drop_down' }}
                    </span>
                </div>
                <div class="EddResults">
                    <text>{{ selectedVenta?.venta ?? '—' }}</text>
                </div>
                <div v-if="showDropdown" class="Venta-dropdown">
                    <div v-if="loadingVentas" class="Venta-dropdown-item">Cargando...</div>
                    <div
                        v-else
                        v-for="venta in tiposVenta"
                        :key="venta.id"
                        class="Venta-dropdown-item"
                        @click="selectVenta(venta)"
                    >
                        {{ venta.venta }}
                    </div>
                </div>
            </div>
            <div class="IconSpace">
                <span class="material-symbols-outlined" style="color:#130348; font-size:45px;">eyeglasses_2</span>
            </div>
            <div class="Edits">
                <div class="VentaRow">
                    <text>Tipo</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
                <div class="VentaRow">
                    <text> Marca</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
                <div class="VentaRow">
                    <text>Modelo</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
            </div>
            <div class="IconSpace">
                <span class="material-symbols-outlined" style="color:#130348; font-size:45px;">mystery</span>
            </div>
            <div class="Edits">
                <div class="LentRow">
                    <text>Tipo</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
                <div class="LentRow">
                    <text> Material</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
                <div class="LentRow">
                    <text>Color</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
                <div class="LentRow">
                    <text>Rango</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                    <text></text>
                </div>
            </div>
            <div class="StatsDiv">
                <div class="VentaRow">
                    <text>STATUS</text>
                    <span class="material-icons" style="color:white; font-size:25px;">arrow_drop_down</span>
                </div>
                <div class="EddResults">
                    <text>Cotizacion</text>
                </div>
            </div>
        </div>
        <div class="RowInf">
            <div class="TableInf">
                <table>
                    <thead>
                        <tr>
                            <th>CODIGO</th>
                            <th>DESCRIPCION</th>
                            <th>PRECIO</th>
                            <th>DESCUENTO</th>
                            <th>P.NETO</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="Costos">
                <div class="CostRow">
                    <text>
                        Precio
                    </text>
                    <text>
                        $6,590
                    </text>
                </div>
                <div class="CostRow">
                    <text>
                        Descuento
                    </text>
                    <text>
                        $600
                    </text>
                </div>
                <div class="CostRow">
                    <text>
                        Neto
                    </text>
                    <text>
                        $5,990
                    </text>
                </div>
                <div class="CostRow">
                    <text>
                        DLLS
                    </text>
                    <text>
                        $310
                    </text>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ── Tipo de Venta ──────────────────────────────────────
const tiposVenta    = ref([])
const selectedVenta = ref(null)
const showDropdown  = ref(false)
const loadingVentas = ref(false)

onMounted(async () => {
    loadingVentas.value = true
    try {
        const res = await fetch('http://127.0.0.1:8000/tipo_venta/all')
        tiposVenta.value = await res.json()
    } catch (e) {
        console.error('Error cargando tipos de venta:', e)
    } finally {
        loadingVentas.value = false
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick)
})

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const selectVenta = (venta) => {
    selectedVenta.value = venta
    showDropdown.value = false
}

const handleOutsideClick = (e) => {
    if (!e.target.closest('.VentaColumn')) {
        showDropdown.value = false
    }
}
</script>