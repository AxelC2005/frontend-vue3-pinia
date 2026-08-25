<template>
  <button 
    :disabled="cargando || deshabilitado"
    class="px-4 py-2 font-bold text-white transition-colors rounded"
    :class="colorFondo"
  >
    <span v-if="cargando">Procesando...</span>
    
    <slot v-else></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cargando: {
    type: Boolean,
    default: false
  },
  deshabilitado: {
    type: Boolean,
    default: false
  },
  tipo: {
    type: String,
    default: 'primario' // Puede ser 'primario', 'peligro', 'exito'
  }
});

const colorFondo = computed(() => {
  if (props.tipo === 'peligro') return 'bg-red-600 hover:bg-red-700';
  if (props.tipo === 'exito') return 'bg-green-600 hover:bg-green-700';
  return 'bg-blue-600 hover:bg-blue-700'; // Primario por defecto
});
</script>