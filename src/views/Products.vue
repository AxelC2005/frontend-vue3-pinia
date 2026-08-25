<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Gestión de Productos</h1>
      
      <BaseButton @click="abrirModalCrear">Nuevo Producto</BaseButton>
    </div>

    <div class="flex gap-4 mb-6">
      <input 
        v-model="productStore.filtros.busqueda"
        @input="buscarConRetraso"
        type="text" 
        placeholder="Buscar producto..." 
        class="p-2 border rounded w-1/3"
      />
      
      <select v-model="productStore.filtros.ordenar_por" @change="productStore.obtenerProductos" class="p-2 border rounded">
        <option value="created_at">Últimos agregados</option>
        <option value="price">Por Precio</option>
        <option value="stock">Por Stock</option>
      </select>
    </div>

    <div v-if="productStore.cargando" class="py-10 text-center text-blue-600">
      Cargando catálogo...
    </div>

    <div v-else-if="productStore.errorGlobal" class="p-4 text-red-700 bg-red-100 rounded">
      {{ productStore.errorGlobal }}
    </div>

    <table v-else class="w-full bg-white rounded shadow-md">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-3 text-left">Nombre</th>
          <th class="p-3 text-left">Precio</th>
          <th class="p-3 text-left">Stock</th>
          <th class="p-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productStore.productos" :key="producto.id" class="border-b">
          <td class="p-3">{{ producto.name }}</td>
          <td class="p-3">S/ {{ producto.price }}</td>
          <td class="p-3">
            <span :class="producto.stock < 10 ? 'text-red-500 font-bold' : 'text-green-600'">
              {{ producto.stock }}
            </span>
          </td>
          <td class="flex justify-center gap-2 p-3">
            <BaseButton tipo="primario" @click="editar(producto.id)">Editar</BaseButton>
            <BaseButton tipo="peligro" @click="eliminar(producto.id)">Eliminar</BaseButton>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-between mt-4" v-if="productStore.paginacion.totalPaginas > 1">
      <BaseButton 
        :deshabilitado="productStore.paginacion.paginaActual === 1"
        @click="productStore.cambiarPagina(productStore.paginacion.paginaActual - 1)"
      >
        Anterior
      </BaseButton>
      
      <span class="font-bold">
        Página {{ productStore.paginacion.paginaActual }} de {{ productStore.paginacion.totalPaginas }}
      </span>

      <BaseButton 
        :deshabilitado="productStore.paginacion.paginaActual === productStore.paginacion.totalPaginas"
        @click="productStore.cambiarPagina(productStore.paginacion.paginaActual + 1)"
      >
        Siguiente
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/products';

const productStore = useProductStore();

onMounted(() => {
    productStore.obtenerProductos();
});

let timeoutBusqueda;
const buscarConRetraso = () => {
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(() => {
        productStore.obtenerProductos();
    }, 500);
};

const abrirModalCrear = () => {
    console.log("Abrir formulario de creación");
};

const editar = (id) => {
    console.log("Editar producto", id);
};

const eliminar = (id) => {
    if(confirm("¿Estás seguro de eliminar este producto?")) {
        console.log("Disparar action de eliminar en Pinia para el ID:", id);
    }
};
</script>