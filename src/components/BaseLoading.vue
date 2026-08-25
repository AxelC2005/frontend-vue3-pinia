<template>
  <div v-if="mostrar" class="flex flex-col items-center justify-center p-8">
    <!-- Spinner SVG animado usando Tailwind -->
    <svg class="w-10 h-10 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
    <span class="mt-4 font-medium text-gray-600">Cargando datos...</span>
  </div>
</template>

<script setup>
defineProps({
  mostrar: {
    type: Boolean,
    default: false
  }
});
</script>