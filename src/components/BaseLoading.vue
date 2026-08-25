<template>
  <div v-if="mostrar" class="flex flex-col items-center justify-center p-6">
    <span class="mt-2 text-sm font-medium text-gray-500">Cargando...</span>
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