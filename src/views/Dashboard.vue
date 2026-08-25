<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>
    
    <BaseLoading :mostrar="cargando" />

    <div v-if="!cargando" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      
      <div class="p-6 bg-white border-l-4 border-blue-500 rounded shadow-sm">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Total Productos</h3>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ kpis.totalProductos }}</p>
      </div>

      <div class="p-6 bg-white border-l-4 border-green-500 rounded shadow-sm">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Categorías Activas</h3>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ kpis.totalCategorias }}</p>
      </div>

      <div class="p-6 bg-white border-l-4 border-red-500 rounded shadow-sm">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Productos Bajo Stock</h3>
        <p class="mt-2 text-3xl font-bold text-red-600">{{ kpis.bajoStock }}</p>
      </div>

      <div class="p-6 bg-white border-l-4 border-purple-500 rounded shadow-sm">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Movimientos (Hoy)</h3>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ kpis.movimientosHoy }}</p>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cargando = ref(true);
const kpis = ref({
    totalProductos: 0,
    totalCategorias: 0,
    bajoStock: 0,
    movimientosHoy: 0
});

const cargarDatosDashboard = async () => {
    cargando.value = true;
    try {

        setTimeout(() => {
            kpis.value = {
                totalProductos: 1245,
                totalCategorias: 18,
                bajoStock: 12,
                movimientosHoy: 34
            };
            cargando.value = false;
        }, 800);

    } catch (error) {
        console.error("Error cargando KPIs", error);
        cargando.value = false;
    }
};

onMounted(() => {
    cargarDatosDashboard();
});
</script>