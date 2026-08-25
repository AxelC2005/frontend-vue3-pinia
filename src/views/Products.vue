<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
      <BaseButton @click="abrirModalCrear">
        {{ modoEdicion ? 'Cancelar' : 'Nuevo Producto' }}
      </BaseButton>
    </div>

    <div v-if="modoEdicion || form.id" class="p-4 mb-6 bg-gray-50 border rounded shadow-sm">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <input v-model="form.name" type="text" placeholder="Nombre" class="p-2 border rounded" />
        <input v-model.number="form.price" type="number" placeholder="Precio" class="p-2 border rounded" />
        <input v-model.number="form.stock" type="number" placeholder="Stock" class="p-2 border rounded" />
        <BaseButton @click="guardar" :deshabilitado="!form.name || form.price <= 0">
          {{ form.id ? 'Actualizar' : 'Guardar' }}
        </BaseButton>
      </div>
    </div>

    <div class="flex gap-4 mb-6">
      <input 
        v-model="productStore.filtros.busqueda"
        type="text" 
        placeholder="Buscar producto..." 
        class="p-2 border rounded w-1/3"
      />
    </div>

    <BaseLoading :mostrar="productStore.cargando" />

    <table v-if="!productStore.cargando" class="w-full bg-white rounded shadow-md overflow-hidden">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="p-3 text-left">Nombre</th>
          <th class="p-3 text-left">Precio</th>
          <th class="p-3 text-left">Stock</th>
          <th class="p-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productStore.productosPaginados" :key="producto.id" class="border-b hover:bg-gray-50">
          <td class="p-3 font-semibold">{{ producto.name }}</td>
          <td class="p-3">S/ {{ producto.price }}</td>
          <td class="p-3">
            <span :class="producto.stock < 10 ? 'text-red-500 font-bold' : 'text-green-600'">
              {{ producto.stock }}
            </span>
          </td>
          <td class="flex justify-center gap-2 p-3">
            <BaseButton tipo="primario" @click="cargarEdicion(producto)">Editar</BaseButton>
            <BaseButton tipo="peligro" @click="borrar(producto.id)">Eliminar</BaseButton>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-between mt-4" v-if="productStore.totalPaginas > 1">
      <BaseButton 
        :deshabilitado="productStore.paginacion.paginaActual === 1"
        @click="productStore.cambiarPagina(productStore.paginacion.paginaActual - 1)"
      >
        Anterior
      </BaseButton>
      
      <span class="font-bold text-gray-700">
        Página {{ productStore.paginacion.paginaActual }} de {{ productStore.totalPaginas }}
      </span>

      <BaseButton 
        :deshabilitado="productStore.paginacion.paginaActual === productStore.totalPaginas"
        @click="productStore.cambiarPagina(productStore.paginacion.paginaActual + 1)"
      >
        Siguiente
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useProductStore } from '../stores/products';

const productStore = useProductStore();
const modoEdicion = ref(false);

const form = reactive({
    id: null,
    name: '',
    price: 0,
    stock: 0
});

onMounted(() => {
    productStore.obtenerProductos();
});

const abrirModalCrear = () => {
    modoEdicion.value = !modoEdicion.value;
    form.id = null;
    form.name = '';
    form.price = 0;
    form.stock = 0;
};

const cargarEdicion = (prod) => {
    modoEdicion.value = true;
    form.id = prod.id;
    form.name = prod.name;
    form.price = prod.price;
    form.stock = prod.stock;
};

const guardar = () => {
    if (form.id) {
        productStore.actualizarProducto(form.id, { name: form.name, price: form.price, stock: form.stock });
    } else {
        productStore.agregarProducto({ ...form });
    }
    form.id = null;
    form.name = '';
    form.price = 0;
    form.stock = 0;
    modoEdicion.value = false;
};

const borrar = (id) => {
    if(confirm("¿Estás seguro de eliminar este producto?")) {
        productStore.eliminarProducto(id);
    }
};
</script>