<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded shadow-md">
      <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
      
      <div v-if="authStore.error" class="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
        {{ authStore.error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-semibold text-gray-600">Correo</label>
          <input v-model="email" type="email" required class="w-full p-2 border rounded" placeholder="admin@example.com" />
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-semibold text-gray-600">Contraseña</label>
          <input v-model="password" type="password" required class="w-full p-2 border rounded" placeholder="123456" />
        </div>

        <button type="submit" class="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Ingresar
        </button>
      </form>

      <p class="mt-4 text-xs text-center text-gray-500">
        Demo: <b>admin@example.com</b> / <b>123456</b>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    await authStore.login(email.value, password.value);
    
    if (localStorage.getItem('token')) {
        router.push('/dashboard');
    }
};
</script>