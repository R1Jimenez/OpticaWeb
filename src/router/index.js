import {createRouter, createWebHistory} from 'vue-router'
import Login from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/Home',
            name: 'Home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/Optometria',
            name: 'Optometria',
            component: () => import('../views/OptometriaView.vue')
        },
        {
            path: '/Sucursales',
            name: 'Sucursales',
            component: () => import('../views/sistema/SucursalesView.vue')
        },
        {
            path: '/Usuarios',
            name: 'Usuarios',
            component: () => import('../views/sistema/UsersView.vue')
        },
        {
            path: '/Ventas',
            name: 'Ventas',
            component: () => import('../views/VentasMenuView.vue')
        },
        {
            path: '/Consultas',
            name: 'Consultas',
            component: () => import('../views/ConsultasView.vue')
        },
        {
            path: '/Cotizacion',
            name: 'Cotizacion',
            component: () => import('../views/ventas/CotizacionView.vue')
        },
        {
            path: '/Cobrar',
            name: 'Cobrar',
            component: () => import('../views/ventas/CobrarView.vue')
        },
        {
            path: '/Inventario',
            name: 'Inventario',
            component: () => import('../views/ventas/InventarioView.vue')
        },
        {
            path: '/TicketsReimp',
            name: 'TicketsReimp',
            component: () => import('../views/ventas/TicketsReim.vue')
        },
        {
            path: '/OrdenTrabajo',
            name: 'OrdenTrabajo',
            component: () => import('../views/ordenesdetrabajo/ConsulOrdView.vue')
        },
        {
            path: '/ReportePendientes',
            name: 'ReportePendientes',
            component: () => import('../views/ordenesdetrabajo/ReportePendientesView.vue')
        },
        {
            path: '/OrdenesEntregadasalCliente',
            name: 'OrdenesEntregadasalCliente',
            component: () => import('../views/ordenesdetrabajo/OrdEnCliView.vue')
        },
        {
            path: '/OrdenesDiaSucursalLaboratorio',
            name: 'OrdenesDiaSucursalLaboratorio',
            component: () => import('../views/ordenesdetrabajo/OrdDiaSucLabView.vue')
        },
        {
            path: '/OrdenesDiaSucursalSucursal',
            name: 'OrdenesDiaSucursalSucursal',
            component: () => import('../views/ordenesdetrabajo/OrdDiaSucSucView.vue')
        },
        {
            path: '/Promociones',
            name: 'Promociones',
            component: () => import('../views/comercializacion/Promociones.vue')
        },
        {
            path: '/ConsultarPromociones',
            name: 'ConsultarPromociones',
            component: () => import('../views/comercializacion/PromConsView.vue')
        },
        {
            path: '/Movimientos',
            name: 'Movimientos',
            component: () => import('../views/inventario/MovimientosView.vue')
        },
        {
            path: '/Traspasos',
            name: 'Traspasos',
            component: () => import('../views/inventario/TraspasosView.vue')
        },
        {
            path: '/ResumenDeVentas',
            name: 'ResumenDeVentas',
            component: () => import('../views/reportesdeventas/ResumVentView.vue')
        },
        {
            path: '/ReporteOperaciones',
            name: 'ReporteOperaciones',
            component: () => import('../views/reportesdeventas/ReporteOperView.vue')
        },
        {
            path: '/VentasPorCliente',
            name: 'VentasPorCliente',
            component: () => import('../views/reportesdeventas/VentsPorClview.vue')
        },
        {
            path: '/VentasTipoVenta',
            name: 'VentasTipoVenta',
            component: () => import('../views/reportesdeventas/VentasTipVenView.vue')
        },
        {
            path: '/VentasTipoCliente',
            name: 'VentasTiporCliente',
            component: () => import('../views/reportesdeventas/VentasTiCliView.vue')
        },
        {
            path: '/VentasAPlazos',
            name: 'VentasAPlazos',
            component: () => import('../views/reportesdeventas/VentasPlazView.vue')
        },
        {
            path: '/Pagos',
            name: 'Pagos',
            component: () => import('../views/reportesdeventas/PagosView.vue')
        },
        {
            path: '/CortesCaja',
            name: 'CortesCaja',
            component: () => import('../views/reportesdeventas/CortesCaja.vue')
        },
        {
            path: '/ConcentradoPagos',
            name: 'ConcentradoPagos',
            component: () => import('../views/reportesdeventas/ConcentradoPagoView.vue')
        },
        {
            path: '/ReportedeTickets',
            name: 'ReportedeTickets',
            component: () => import('../views/reportesdeventas/ReporteTicketsView.vue')
        },
        {
            path: '/PagosCorteCaja',
            name: 'PagosCorteCaja',
            component: () => import('../views/reportesdeventas/PagosYCCView.vue')
        },
        {
            path: '/ReporteVentasPP',
            name: 'ReporteVentasPP',
            component: () => import('../views/reportesdeventas/ReporteVentasPPView.vue')
        },
        {
            path: '/PreciosyExistencias',
            name: 'PreciosyExistencias',
            component: () => import('../views/reportes/PreciosExtView.vue')
        },
        {
            path: '/ReporteInventario',
            name: 'ReporteInventario',
            component: () => import('../views/reportes/InventarioReportesView.vue')
        },
        {
            path: '/MovimientosdeInventario',
            name: 'MovimientosdeInventario',
            component: () => import('../views/reportes/MovInventarioView.vue')
        },
        {
            path: '/ValordeInventario',
            name: 'ValordeInventario',
            component: () => import('../views/reportes/InValoView.vue')
        },
        {
            path: '/ValorHistoricodeInventario',
            name: 'ValorHistoricodeInventario',
            component: () => import('../views/reportes/HistoInvView.vue')
        },
        {
            path: '/Atributos',
            name: 'Atributos',
            component: () => import('../views/productos/AtributosView.vue')
        },
        {
            path: '/Editor',
            name: 'Editor',
            component: () => import('../views/productos/EditorView.vue')
        }
    ]
})

export default router