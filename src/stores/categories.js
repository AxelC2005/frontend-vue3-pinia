import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categories', () => {
    const categorias = ref([
        { id: 1, name: 'Electrónica', description: 'Dispositivos y gadgets' },
        { id: 2, name: 'Ferretería', description: 'Herramientas pesadas' },
        { id: 3, name: 'Oficina', description: 'Suministros de escritorio' }
    ]);

    const cargando = ref(false);

    const obtenerCategorias = async () => {
        cargando.value = true;
        await new Promise(resolve => setTimeout(resolve, 150));
        cargando.value = false;
    };

    const agregarCategoria = (nuevaCategoria) => {
        const nuevoId = categorias.value.length ? Math.max(...categorias.value.map(c => c.id)) + 1 : 1;
        categorias.value.push({ id: nuevoId, ...nuevaCategoria });
    };

    const actualizarCategoria = (id, datosActualizados) => {
        const index = categorias.value.findIndex(c => c.id === id);
        if (index !== -1) {
            categorias.value[index] = { id, ...datosActualizados };
        }
    };

    const eliminarCategoria = (id) => {
        categorias.value = categorias.value.filter(c => c.id !== id);
    };

    return { 
        categorias, 
        cargando, 
        obtenerCategorias, 
        agregarCategoria, 
        actualizarCategoria, 
        eliminarCategoria 
    };
});