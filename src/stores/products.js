import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { useStockStore } from './stock';

export const useProductStore = defineStore('products', () => {
    const stockStore = useStockStore();

    const productos = ref([
        { id: 1, name: 'Laptop Pro', price: 3500.00, stock: 15 },
        { id: 2, name: 'Teclado Mecánico', price: 250.00, stock: 8 },
        { id: 3, name: 'Taladro Percutor', price: 450.00, stock: 5 },
        { id: 4, name: 'Silla Ergonómica', price: 700.00, stock: 3 }
    ]);

    const cargando = ref(false);
    const itemsPorPagina = 4;

    const paginacion = reactive({
        paginaActual: 1
    });

    const filtros = reactive({
        busqueda: ''
    });

    const productosFiltrados = computed(() => {
        return productos.value.filter(p => 
            p.name.toLowerCase().includes(filtros.busqueda.toLowerCase())
        );
    });

    const totalPaginas = computed(() => {
        return Math.ceil(productosFiltrados.value.length / itemsPorPagina) || 1;
    });

    const productosPaginados = computed(() => {
        const inicio = (paginacion.paginaActual - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        return productosFiltrados.value.slice(inicio, fin);
    });

    const obtenerProductos = async () => {
        cargando.value = true;
        await new Promise(resolve => setTimeout(resolve, 100));
        cargando.value = false;
    };

    const agregarProducto = (nuevoProducto) => {
        const nuevoId = productos.value.length ? Math.max(...productos.value.map(p => p.id)) + 1 : 1;
        productos.value.push({ id: nuevoId, ...nuevoProducto });
        stockStore.registrarMovimientoAutomatico(nuevoProducto.name, 'ENTRADA', Number(nuevoProducto.stock));
    };

    const actualizarProducto = (id, datosActualizados) => {
        const index = productos.value.findIndex(p => p.id === id);
        if (index !== -1) {
            const stockAnterior = Number(productos.value[index].stock);
            const stockNuevo = Number(datosActualizados.stock);

            productos.value[index] = { id, ...datosActualizados };

            const diferenciaStock = stockNuevo - stockAnterior;
            if (diferenciaStock !== 0) {
                const tipo = diferenciaStock > 0 ? 'ENTRADA' : 'SALIDA';
                stockStore.registrarMovimientoAutomatico(datosActualizados.name, tipo, Math.abs(diferenciaStock));
            }
        }
    };

    const eliminarProducto = (id) => {
        const productoAEliminar = productos.value.find(p => p.id === id);
        if (productoAEliminar) {
            stockStore.registrarMovimientoAutomatico(productoAEliminar.name, 'SALIDA', Number(productoAEliminar.stock));
        }

        productos.value = productos.value.filter(p => p.id !== id);
        if (paginacion.paginaActual > totalPaginas.value) {
            paginacion.paginaActual = totalPaginas.value;
        }
    };

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas.value) {
            paginacion.paginaActual = nuevaPagina;
        }
    };

    return { 
        productos,
        cargando, 
        paginacion, 
        filtros, 
        totalPaginas,
        productosPaginados,
        obtenerProductos, 
        agregarProducto, 
        actualizarProducto,
        eliminarProducto,
        cambiarPagina
    };
});