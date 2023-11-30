//import vue router
import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'
//define a routes
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
    },
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
        path: '/detail-order/:snap_token',
        name: 'detail-order',
        component: () => import( /* webpackChunkName: "login" */ '../views/DetailHistoryOrder.vue'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/detail-product/:slug',
        name: 'detail-product',
        component: () => import( /* webpackChunkName: "login" */ '../views/DetailProduct.vue'),
       
    },

    {
        path: '/update-profile',
        name: 'update-profile',
        component: () => import( /* webpackChunkName: "login" */ '../views/UpdateProfile.vue'),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/update-password',
        name: 'update-password',
        component: () => import( /* webpackChunkName: "login" */ '../views/UpdatePassword.vue'),
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