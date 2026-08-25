import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStockStore = defineStore('stock', () => {
    const movimientos = ref([
        { id: 1, product_name: 'Laptop Pro', type: 'ENTRADA', quantity: 15, date: '2026-08-25 10:00' },
        { id: 2, product_name: 'Teclado Mecánico', type: 'ENTRADA', quantity: 8, date: '2026-08-25 11:30' }
    ]);

    const cargando = ref(false);

    const obtenerMovimientos = async () => {
        cargando.value = true;
        await new Promise(resolve => setTimeout(resolve, 200));
        cargando.value = false;
    };

    const registrarMovimientoAutomatico = (productName, type, quantity) => {
        const nuevoId = movimientos.value.length ? Math.max(...movimientos.value.map(m => m.id)) + 1 : 1;
        const fechaActual = new Date().toISOString().slice(0, 16).replace('T', ' ');
        movimientos.value.unshift({ 
            id: nuevoId, 
            product_name: productName, 
            type: type, 
            quantity: quantity, 
            date: fechaActual 
        });
    };

    return { movimientos, cargando, obtenerMovimientos, registrarMovimientoAutomatico };
});