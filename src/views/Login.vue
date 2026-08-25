<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded shadow-md">
      <h2 class="mb-6 text-2xl font-bold text-center">Iniciar Sesión</h2>
      
      <BaseAlert v-if="errorGlobal" tipo="error" :mensaje="errorGlobal" />

      <form @submit.prevent="procesarLogin">
        <div class="mb-4">
          <label class="block mb-1 text-sm font-bold">Correo Electrónico</label>
          <input 
            v-model="formulario.email" 
            type="email" 
            class="w-full p-2 border rounded"
          />
          <span v-if="errores.email" class="text-xs text-red-500">{{ errores.email }}</span>
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-sm font-bold">Contraseña</label>
          <input 
            v-model="formulario.password" 
            type="password" 
            class="w-full p-2 border rounded"
          />
          <span v-if="errores.password" class="text-xs text-red-500">{{ errores.password }}</span>
        </div>

        <BaseButton 
          type="submit" 
          class="w-full"
          :cargando="cargando"
        >
          Entrar
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const enrutador = useRouter()
const authStore = useAuthStore()

const cargando = ref(false)
const errorGlobal = ref(null)
const formulario = reactive({ email: '', password: '' })
const errores = reactive({ email: '', password: '' })

const procesarLogin = async () => {
  errores.email = ''
  errores.password = ''
  errorGlobal.value = null
  let esValido = true

  if (!formulario.email) {
    errores.email = 'El correo es obligatorio'
    esValido = false
  }
  if (!formulario.password) {
    errores.password = 'La contraseña es obligatoria'
    esValido = false
  }

  if (!esValido) return

  cargando.value = true
  try {
    await authStore.iniciarSesion(formulario)
    enrutador.push('/dashboard')
  } catch (err) {
    if (err.response && err.response.status === 401) {
      errorGlobal.value = 'Credenciales incorrectas'
    } else {
      errorGlobal.value = 'Ocurrió un error en el servidor'
    }
  } finally {
    cargando.value = false
  }
}
</script>
