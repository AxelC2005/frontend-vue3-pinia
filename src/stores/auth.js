import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    const error = ref(null);

    const login = async (email, password) => {
        error.value = null;
        await new Promise(resolve => setTimeout(resolve, 200));

        if (email === 'admin@example.com' && password === '123456') {
            token.value = 'fake-jwt-token-12345';
            localStorage.setItem('token', token.value);
            return true;
        } else {
            error.value = 'Credenciales incorrectas.';
            return false;
        }
    };

    const logout = () => {
        token.value = null;
        localStorage.removeItem('token');
    };

    return { token, error, login, logout };
});