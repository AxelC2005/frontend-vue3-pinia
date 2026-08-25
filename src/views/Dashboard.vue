<template>
  <div class="p-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="p-6 bg-white border-l-4 border-blue-500 rounded shadow">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Total Productos</h3>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ totalProductos }}</p>
      </div>

      <div class="p-6 bg-white border-l-4 border-green-500 rounded shadow">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Categorías Activas</h3>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ totalCategorias }}</p>
      </div>

      <div class="p-6 bg-white border-l-4 border-red-500 rounded shadow">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Productos Bajo Stock</h3>
        <p class="mt-2 text-3xl font-bold text-red-600">{{ productosBajoStock }}</p>
      </div>

      <div class="p-6 bg-white border-l-4 border-purple-500 rounded shadow">
        <h3 class="text-sm font-semibold text-gray-500 uppercase">Total Movimientos</h3>
        <p class="mt-2 text-3xl font-bold text-gray-800">{{ totalMovimientos }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProductStore } from '../stores/products';
import { useCategoryStore } from '../stores/categories';
import { useStockStore } from '../stores/stock';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const stockStore = useStockStore();

const totalProductos = computed(() => {
    return Array.isArray(productStore?.productos) ? productStore.productos.length : 0;
});

const totalCategorias = computed(() => {
    return Array.isArray(categoryStore?.categorias) ? categoryStore.categorias.length : 0;
});

const productosBajoStock = computed(() => {
    return Array.isArray(productStore?.productos) 
        ? productStore.productos.filter(p => Number(p?.stock) < 10).length 
        : 0;
});

const totalMovimientos = computed(() => {
    return Array.isArray(stockStore?.movimientos) ? stockStore.movimientos.length : 0;
});
</script>