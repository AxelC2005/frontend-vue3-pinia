<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Movimientos de Stock</h1>
      <BaseButton @click="modoCrear = !modoCrear">
        {{ modoCrear ? 'Cancelar' : 'Registrar Movimiento' }}
      </BaseButton>
    </div>

    <div v-if="modoCrear" class="p-4 mb-6 bg-gray-50 border rounded shadow-sm">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <input v-model="form.product_name" type="text" placeholder="Producto" class="p-2 border rounded" />
        <select v-model="form.type" class="p-2 border rounded">
          <option value="ENTRADA">ENTRADA</option>
          <option value="SALIDA">SALIDA</option>
        </select>
        <input v-model.number="form.quantity" type="number" placeholder="Cantidad" class="p-2 border rounded" />
        <BaseButton @click="guardar" :deshabilitado="!form.product_name || form.quantity <= 0">Registrar</BaseButton>
      </div>
    </div>

    <BaseLoading :mostrar="stockStore.cargando" />

    <table v-if="!stockStore.cargando" class="w-full bg-white rounded shadow-md overflow-hidden">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="p-3 text-left">Fecha</th>
          <th class="p-3 text-left">Producto</th>
          <th class="p-3 text-left">Tipo</th>
          <th class="p-3 text-left">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mov in stockStore.movimientos" :key="mov.id" class="border-b hover:bg-gray-50">
          <td class="p-3 text-gray-600">{{ mov.date }}</td>
          <td class="p-3 font-semibold">{{ mov.product_name }}</td>
          <td class="p-3">
            <span :class="mov.type === 'ENTRADA' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
              {{ mov.type }}
            </span>
          </td>
          <td class="p-3">{{ mov.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStockStore } from '../stores/stock';

const stockStore = useStockStore();
const modoCrear = ref(false);

const form = reactive({
    product_name: '',
    type: 'ENTRADA',
    quantity: 1
});

onMounted(() => {
    stockStore.obtenerMovimientos();
});

const guardar = () => {
    stockStore.registrarMovimiento({ ...form });
    form.product_name = '';
    form.quantity = 1;
    modoCrear.value = false;
};
</script>