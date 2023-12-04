//import vue router
import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'
//define a routes
const routes = [
   
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue'),


    },
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "login" */ '../views/Home.vue')
    },

    {
        path: '/kategori',
        name: 'kategori',
        component: () => import( /* webpackChunkName: "login" */ '../views/AllCategory.vue')
    },

    {
        path: '/akun',
        name: 'akun',
        component: () => import( /* webpackChunkName: "login" */ '../views/Account.vue'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/order',
        name: 'order',
        component: () => import( /* webpackChunkName: "login" */ '../views/HistoryOrder.vue'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/keranjang',
        name: 'keranjang',
        component: () => import( /* webpackChunkName: "login" */ '../views/Cart.vue'),
        meta: {
            requiresAuth: true
        }
    },


    {
        path: '/detail-order/:ids',
        name: 'detail-order',
        component: () => import( /* webpackChunkName: "login" */ '../views/DetailHistoryOrder.vue'),
        meta: {
            requiresAuth: true
        }
    },

   


]


//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes
})

//define route for handle authentication
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //cek nilai dari getters isLoggedIn di module auth
        if (store.getters['auth/isLoggedIn']) {
            next();
            return
        }
        next('/login')
    } else {
        next()
    }
})


export default router