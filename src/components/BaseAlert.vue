<template>
  <div v-if="mensaje" :class="claseAlerta" class="p-4 mb-4 text-sm rounded shadow-sm">
    {{ mensaje }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tipo: { type: String, default: 'error' }, // puede ser: 'error', 'exito', 'info'
  mensaje: { type: String, required: true }
});

const claseAlerta = computed(() => {
  if (props.tipo === 'exito') return 'bg-green-100 text-green-800 border-l-4 border-green-500';
  if (props.tipo === 'info') return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
  return 'bg-red-100 text-red-800 border-l-4 border-red-500'; // Error por defecto
});
</script>