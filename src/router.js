import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import Products from './views/Products.vue';
import Categories from './views/Categories.vue';
import StockMovements from './views/StockMovements.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard, meta: { requiereAuth: true } },
    { path: '/products', component: Products, meta: { requiereAuth: true } },
    { path: '/categories', component: Categories, meta: { requiereAuth: true } },
    { path: '/stock-movements', component: StockMovements, meta: { requiereAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    
    if (to.meta.requereAuth && !token) {
        next('/login');
    } else if (to.path === '/login' && token) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;