<style scoped>
.navbar-wrapper {
  padding: 16px;
  width: 18%;
}
 
.navbar {
  background: radial-gradient(
    ellipse at left,
    #F0F0F0 0%,
    #BCBCBC 100%
    );
  border: 2px solid #FB1C2E;
  border-radius: 25px;
  padding: 12px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
 
.menu-item {
  width: 100%;
}
 
.menu-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 12px;
}
 
.menu-header:hover {
  background-color: rgba(19, 3, 72, 0.08);
}
 
.menu-icon {
  color: #130348;
  font-size: 24px;
  flex-shrink: 0;
}
 
.menu-label {
  flex: 1;
  color: #130348;
  font-size: 16px;
  font-weight: bold;
}
 
.arrow-icon {
  color: #130348;
  font-size: 20px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
 
.arrow-icon.rotated {
  transform: rotate(180deg);
}
 
/* Submenu */
.submenu {
  padding: 0 0 8px 24px;
  overflow: hidden;
}
 
.submenu-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}
 
.submenu-item:hover {
  background-color: rgba(19, 3, 72, 0.06);
}
 
.submenu-icon {
  color: rgba(19, 3, 72, 0.7);
  font-size: 20px;
  flex-shrink: 0;
}
 
.submenu-label {
  color: rgba(19, 3, 72, 0.8);
  font-size: 14px;
  line-height: 1.3;
}
 
/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  max-height: 600px;
  overflow: hidden;
}
 
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

.navbar {
    background: radial-gradient(
        ellipse at left,
        #F0F0F0 0%,
        #BCBCBC 100%
    );
    border: 2px solid #FB1C2E;
    border-radius: 25px;
    padding: 12px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    overflow-y: auto;
    max-height: 90vh;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}

.navbar-wrapper {
    padding: 16px;
    width: 18%;
    overflow: hidden;
    height: 100vh;
    box-sizing: border-box;
}

.navbar::-webkit-scrollbar {
    display: none;
}
</style>

<template>
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
  <div class="navbar-wrapper">
    <div class="navbar">
      <div
        v-for="(menu, index) in dropdownMenus"
        :key="index"
        class="menu-item"
      >
        <div class="menu-header" @click="toggleMenu(index)">
          <span class="material-icons menu-icon">{{ menu.icon }}</span>
          <span class="menu-label">{{ menu.label }}</span>
          <span
            class="material-icons arrow-icon"
            :class="{ rotated: expandedIndex === index }"
          >
            keyboard_arrow_down
          </span>
        </div>
 
        <Transition name="dropdown">
          <div v-if="expandedIndex === index" class="submenu">
            <div
              v-for="(item, i) in menu.items"
              :key="i"
              class="submenu-item"
              @click="navigate(item.route)"
            >
              <span class="material-icons submenu-icon">{{ item.icon }}</span>
              <span class="submenu-label">{{ item.label }}</span>
            </div>
          </div>
        </Transition>
      </div>
 
      <!-- Simple buttons -->
      <div class="menu-item">
        <div class="menu-header" @click="navigate('/Optometria')">
          <span class="material-icons menu-icon">visibility</span>
          <span class="menu-label">Optometría</span>
        </div>
      </div>
 
      <div class="menu-item">
        <div class="menu-header" @click="navigate('/cuentas_por_cobrar')">
          <span class="material-icons menu-icon">visibility</span>
          <span class="menu-label">Cuentas por Cobrar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
 
const router = useRouter()
const expandedIndex = ref(null)
 
const toggleMenu = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
 
const navigate = (route) => {
  router.push(route)
}
 
const dropdownMenus = [
  {
    icon: 'shopping_cart',
    label: 'Ventas',
    items: [
      { label: 'Cotizar',               icon: 'add_shopping_cart',  route: '/Cotizacion' },
      { label: 'Cobrar',                icon: 'attach_money',       route: '/Cobrar' },
      { label: 'Inventario',            icon: 'inventory',          route: '/Inventario' },
      { label: 'Reimpresion Tickets',   icon: 'print',              route: '/TicketsReimp' },
    ],
  },
  {
    icon: 'assignment',
    label: 'Ordenes de Trabajo',
    items: [
      { label: 'Consultar',                                       icon: 'note_add',        route: '/OrdenTrabajo' },
      { label: 'Reporte de Pendientes',                           icon: 'pending_actions', route: '/ReportePendientes' },
      { label: 'Ordenes Entregadas al Cliente',                   icon: 'check_circle',    route: '/OrdenesEntregadasalCliente' },
      { label: 'Ordenes del Dia de Sucursales a Laboratorio',     icon: 'note_add',        route: '/OrdenesDiaSucursalLaboratorio' },
      { label: 'Ordenes del Dia de Sucursales a Sucursales',      icon: 'note_add',        route: '/OrdenesDiaSucursalSucursal' },
    ],
  },
  {
    icon: 'campaign',
    label: 'Comercialización',
    items: [
      { label: 'Promociones',         icon: 'local_offer',  route: '/Promociones' },
      { label: 'Consulta Promociones', icon: 'trending_up', route: '/ConsultarPromociones' },
    ],
  },
  {
    icon: 'inventory_2',
    label: 'Inventario',
    items: [
      { label: 'Movimientos', icon: 'inventory', route: '/Movimientos' },
      { label: 'Traspasos',   icon: 'add_box',   route: '/Traspasos' },
    ],
  },
  {
    icon: 'show_chart',
    label: 'Reportes de Ventas',
    items: [
      { label: 'Resumen de Ventas',               icon: 'today',          route: '/ResumenDeVentas' },
      { label: 'Reporte de Operaciones',          icon: 'calendar_month', route: '/ReporteOperaciones' },
      { label: 'Ventas por Cliente',              icon: 'calendar_today', route: '/VentasPorCliente' },
      { label: 'Ventas por tipo de Venta',        icon: 'add_box',        route: '/VentasTipoVenta' },
      { label: 'Ventas por tipo de Cliente',      icon: 'add_box',        route: '/VentasTipoCliente' },
      { label: 'Ventas a Plazos',                 icon: 'add_box',        route: '/VentasAPlazos' },
      { label: 'Pagos',                           icon: 'add_box',        route: '/Pagos' },
      { label: 'Cortes de Caja',                  icon: 'add_box',        route: '/CortesCaja' },
      { label: 'Concentrado de Pagos',            icon: 'add_box',        route: '/ConcentradoPagos' },
      { label: 'Reporte de Tickets',              icon: 'add_box',        route: '/ReportedeTickets' },
      { label: 'Pagos y Corte de Caja',           icon: 'add_box',        route: '/PagosCorteCaja' },
      { label: 'Reporte de Ventas por Producto',  icon: 'add_box',        route: '/ReporteVentasPP' },
    ],
  },
  {
    icon: 'note',
    label: 'Reportes',
    items: [
      { label: 'Precios y Existencias',             icon: 'note',    route: '/PreciosyExistencias' },
      { label: 'Inventario',                        icon: 'note',    route: '/ReporteInventario' },
      { label: 'Movimientos de inventario',         icon: 'add_box', route: '/MovimientosdeInventario' },
      { label: 'Inventario Valorizado',             icon: 'note',    route: '/ValordeInventario' },
      { label: 'Inv. Valorizado Hist.',             icon: 'note',    route: '/ValorHistoricodeInventario' },
      { label: 'Entregas',                          icon: 'note',    route: '/ruta2' },
      { label: 'Entregas (comisiones)',             icon: 'note',    route: '/ruta2' },
      { label: 'Diario de Operaciones',             icon: 'note',    route: '/ruta2' },
      { label: 'Ordenes de Trabajo con Utilidad',   icon: 'note',    route: '/ruta2' },
      { label: 'Listado de Inventario',             icon: 'note',    route: '/ruta2' },
      { label: 'Diario de Operaciones Totalizado',  icon: 'note',    route: '/ruta2' },
      { label: 'Business Intelligence',             icon: 'note',    route: '/ruta2' },
      { label: 'Inventario con Costo y Precio',     icon: 'note',    route: '/ruta2' },
      { label: 'Ventas con Saldo Pendiente',        icon: 'note',    route: '/ruta2' },
      { label: 'Reporte de Clientes',               icon: 'note',    route: '/ruta2' },
      { label: 'Reporte Consolidado',               icon: 'note',    route: '/ruta2' },
    ],
  },
  {
    icon: 'warehouse',
    label: 'Almacen',
    items: [
      { label: 'Alta de Órden',             icon: 'warehouse', route: '/ruta1' },
      { label: 'Consulta',                  icon: 'warehouse', route: '/ruta2' },
      { label: 'Compra Externa y Mermas',   icon: 'note',      route: '/ruta2' },
    ],
  },
  {
    icon: 'settings',
    label: 'Sistema',
    items: [
      { label: 'Accesos',           icon: 'lock',   route: '/sistema/permisos' },
      { label: 'Sucursales',        icon: 'gite',   route: '/Sucursales' },
      { label: 'Usuarios',          icon: 'person', route: '/Usuarios' },
      { label: 'Tipos de Cliente',  icon: 'note',   route: '/ruta2' },
    ],
  },
  {
    icon: 'shelves',
    label: 'Productos',
    items: [
      { label: 'Atributos', icon: 'shelves', route: '/Atributos' },
      { label: 'Editor',    icon: 'shelves', route: '/Editor' },
      { label: 'Buscador',  icon: 'note',    route: '/ruta2' },
    ],
  },
  {
    icon: 'biotech',
    label: 'Laboratorio',
    items: [
      { label: 'Laboratorio',               icon: 'biotech', route: '/ruta1' },
      { label: 'Laboratorio (Panel)',        icon: 'biotech', route: '/ruta2' },
      { label: 'Editor Ordenes de Trabajo', icon: 'biotech', route: '/ruta1' },
    ],
  },
]
</script>