import { defineStore } from 'pinia'
import api  from '../api' 
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || localStorage.getItem('auth_token') || null);
    const usuario = ref(null);

    const iniciarSesion = async (credenciales) => {
        const respuesta = await api.post('/login', credenciales);
        
        token.value = respuesta.data.token;
        usuario.value = respuesta.data.user;

        localStorage.setItem('token', token.value);
        localStorage.setItem('auth_token', token.value);
    };

    const cerrarSesion = () => {
        token.value = null;
        usuario.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('auth_token');
    };

    return { token, usuario, iniciarSesion, cerrarSesion };
});