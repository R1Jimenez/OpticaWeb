<style scoped>
/* ── Outer card ── */
.consult-card {
    display: flex;
    height: 80%;
    flex: 1;
    margin: 50px;
    background: linear-gradient(135deg, #F0F0F0, #BCBCBC);
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    padding: 20px;
    gap: 20px;
    min-height: 0;
}

/* ── Left panel ── */
.panel-left {
    flex: 1;
    background-color: #B8B8B8;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
}

.panel-title {
    font-size: 2rem;
    font-weight: 700;
    color: #130348;
    text-align: center;
    margin: 0 0 10px;
}

/* ── Dropdown section ── */
.dropdown-section { display: flex; flex-direction: column; gap: 8px; }

.dropdown-label {
    font-size: 1.2rem;
    font-weight: 900;
    color: #130348;
}

.dropdown-label.disabled { color: #999999; font-weight: 600; font-size: 1rem; }

.dropdown-box {
    background: white;
    border: 2px solid #130348;
    border-radius: 10px;
    padding: 9px 12px;
}

.dropdown-box.disabled {
    background: #E0E0E0;
    border-color: #AAAAAA;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999999;
}

.dropdown-box select {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.95rem;
    color: #130348;
    padding: 8px 0;
    cursor: pointer;
    appearance: none;
}

.dropdown-box select:disabled { color: #999999; cursor: not-allowed; }

.loading-indicator {
    display: flex;
    justify-content: center;
    padding: 8px 0;
    color: #130348;
    font-size: 0.875rem;
}

/* ── Right panel ── */
.panel-right {
    flex: 1;
    background: radial-gradient(ellipse at center, #07072C 0%, #130348 100%);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    color: white;
}

.summary-title {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    text-align: center;
    margin: 0 0 5px;
}

/* ── Selection info card ── */
.info-block { display: flex; flex-direction: column; gap: 6px; }

.info-label {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
}

.info-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}

.info-name {
    font-size: 0.95rem;
    font-weight: 500;
    color: white;
    flex: 1;
}

.info-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
}

/* ── Divider ── */
.divider {
    border: none;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    margin: 4px 0;
}

/* ── Total ── */
.total-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid white;
    border-radius: 15px;
}

.total-label { font-size: 1.4rem; font-weight: 700; color: white; }
.total-amount { font-size: 1.6rem; font-weight: 700; color: white; }
</style>

<template>
    <div class="consult-card">

        <!-- Left: Product selection -->
        <div class="panel-left">
            <p class="panel-title">Selección de Productos</p>

            <!-- Armazón -->
            <div class="dropdown-section">
                <span class="dropdown-label">Armazón</span>
                <div class="dropdown-box">
                    <div v-if="loadingArmazones" class="loading-indicator">Cargando...</div>
                    <select v-else v-model="selectedArmazon">
                        <option :value="null">Seleccionar Armazón</option>
                        <option v-for="a in armazones" :key="a.id" :value="a">
                            {{ a.marca }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Servicio -->
            <div class="dropdown-section">
                <span class="dropdown-label">Servicio</span>
                <div class="dropdown-box">
                    <div v-if="loadingServicios" class="loading-indicator">Cargando...</div>
                    <select v-else v-model="selectedServicio">
                        <option :value="null">Seleccionar Servicio</option>
                        <option v-for="s in servicios" :key="s.id" :value="s">
                            {{ s.servicio }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- L/C (disabled) -->
            <div class="dropdown-section">
                <span class="dropdown-label disabled">L/C</span>
                <div class="dropdown-box disabled">
                    <span>Seleccionar L/C</span>
                    <span class="material-icons" style="color:#999; font-size:20px;">arrow_drop_down</span>
                </div>
            </div>

            <!-- Mostrador (disabled) -->
            <div class="dropdown-section">
                <span class="dropdown-label disabled">Mostrador</span>
                <div class="dropdown-box disabled">
                    <span>Seleccionar Mostrador</span>
                    <span class="material-icons" style="color:#999; font-size:20px;">arrow_drop_down</span>
                </div>
            </div>
        </div>

        <!-- Right: Summary -->
        <div class="panel-right">
            <p class="summary-title">Resumen de Selección</p>

            <!-- Armazón summary -->
            <div class="info-block">
                <span class="info-label">Armazón</span>
                <div class="info-row">
                    <span class="info-name">{{ selectedArmazon?.marca ?? 'Armazón no Seleccionado' }}</span>
                    <span class="info-price">${{ (selectedArmazon?.precio ?? 0).toFixed(2) }}</span>
                </div>
            </div>

            <!-- Servicio summary -->
            <div class="info-block">
                <span class="info-label">Servicio</span>
                <div class="info-row">
                    <span class="info-name">{{ selectedServicio?.servicio ?? 'Servicio no Seleccionado' }}</span>
                    <span class="info-price">${{ (selectedServicio?.precio ?? 0).toFixed(2) }}</span>
                </div>
            </div>

            <!-- L/C summary -->
            <div class="info-block">
                <span class="info-label">L/C</span>
                <div class="info-row">
                    <span class="info-name">L/C no Seleccionado</span>
                    <span class="info-price">$0.00</span>
                </div>
            </div>

            <!-- Mostrador summary -->
            <div class="info-block">
                <span class="info-label">Mostrador</span>
                <div class="info-row">
                    <span class="info-name">Mostrador no Seleccionado</span>
                    <span class="info-price">$0.00</span>
                </div>
            </div>

            <hr class="divider" />

            <!-- Total -->
            <div class="total-box">
                <span class="total-label">TOTAL:</span>
                <span class="total-amount">${{ total.toFixed(2) }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const armazones       = ref([])
const servicios       = ref([])
const selectedArmazon  = ref(null)
const selectedServicio = ref(null)
const loadingArmazones = ref(false)
const loadingServicios = ref(false)

onMounted(async () => {
    loadingArmazones.value = true
    loadingServicios.value = true
    try {
        const [armRes, serRes] = await Promise.all([
            fetch('http://127.0.0.1:8000/armazones/all'),
            fetch('http://127.0.0.1:8000/servicios/all'),
        ])
        armazones.value = await armRes.json()
        servicios.value = await serRes.json()
    } catch (e) {
        console.error('Error cargando catálogos:', e)
    } finally {
        loadingArmazones.value = false
        loadingServicios.value = false
    }
})

const total = computed(() =>
    (selectedArmazon.value?.precio ?? 0) + (selectedServicio.value?.precio ?? 0)
)
</script>