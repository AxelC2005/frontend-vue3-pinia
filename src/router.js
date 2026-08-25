import { createRouter, createWebHistory } from 'vue-router';

const Login = () => import('./views/Login.vue');
const Dashboard = () => import('./views/Dashboard.vue');
const Products = () => import('./views/Products.vue');
const Categories = () => import('./views/Categories.vue');
const Stock = () => import('./views/StockMovements.vue');

const routes = [
    { path: '/', redirect: '/dashboard' },
    { 
        path: '/login', 
        name: 'Login', 
        component: Login, 
        meta: { isPublic: true } 
    },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/products', name: 'Products', component: Products },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/stock', name: 'Stock', component: Stock }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('auth_token');

    if (!to.meta.isPublic && !token) {
        next('/login');
    } else if (to.meta.isPublic && token) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;