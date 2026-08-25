<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestión de Categorías</h1>
      <BaseButton @click="abrirModalCrear">
        {{ modoEdicion ? 'Cancelar' : 'Nueva Categoría' }}
      </BaseButton>
    </div>

    <div v-if="modoEdicion || form.id" class="p-4 mb-6 bg-gray-50 border rounded shadow-sm">
      <div class="flex gap-4">
        <input v-model="form.name" type="text" placeholder="Nombre" class="w-1/3 p-2 border rounded" />
        <input v-model="form.description" type="text" placeholder="Descripción" class="w-1/2 p-2 border rounded" />
        <BaseButton @click="guardar" :deshabilitado="!form.name">
          {{ form.id ? 'Actualizar' : 'Guardar' }}
        </BaseButton>
      </div>
    </div>

    <BaseLoading :mostrar="categoryStore.cargando" />

    <table v-if="!categoryStore.cargando" class="w-full bg-white rounded shadow-md overflow-hidden">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Nombre</th>
          <th class="p-3 text-left">Descripción</th>
          <th class="p-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categoryStore.categorias" :key="cat.id" class="border-b hover:bg-gray-50">
          <td class="p-3">{{ cat.id }}</td>
          <td class="p-3 font-semibold">{{ cat.name }}</td>
          <td class="p-3 text-gray-600">{{ cat.description }}</td>
          <td class="flex justify-center gap-2 p-3">
            <BaseButton tipo="primario" @click="cargarEdicion(cat)">Editar</BaseButton>
            <BaseButton tipo="peligro" @click="borrar(cat.id)">Eliminar</BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCategoryStore } from '../stores/categories';

const categoryStore = useCategoryStore();
const modoEdicion = ref(false);

const form = reactive({
    id: null,
    name: '',
    description: ''
});

onMounted(() => {
    categoryStore.obtenerCategorias();
});

const abrirModalCrear = () => {
    modoEdicion.value = !modoEdicion.value;
    form.id = null;
    form.name = '';
    form.description = '';
};

const cargarEdicion = (cat) => {
    modoEdicion.value = true;
    form.id = cat.id;
    form.name = cat.name;
    form.description = cat.description;
};

const guardar = () => {
    if (form.id) {
        categoryStore.actualizarCategoria(form.id, { name: form.name, description: form.description });
    } else {
        categoryStore.agregarCategoria({ name: form.name, description: form.description });
    }
    form.id = null;
    form.name = '';
    form.description = '';
    modoEdicion.value = false;
};

const borrar = (id) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
        categoryStore.eliminarCategoria(id);
    }
};
</script>