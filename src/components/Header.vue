<template>
    <div class="pt-3">
        <div class="header d-flex justify-content-between align-items-center py-3 px-3">
            <div class="d-flex flex-column align-items-start" v-if="isLoggedIn">
                <span class="logo fw-bold">EnterCode</span>
                <h6 class="m-0 fw-semibold">Halo {{ user.name }}</h6>
            </div>
            <div class="logo" v-else>
                <span class="logo fw-bold">EnterCode</span>
                <!-- <span class="d-flex lokasi align-items-center gap-1">
                    <i class="fa fa-location"></i> pademangan timur
                </span> -->
            </div>
           <router-link :to="{ name: 'keranjang' }" class="icon-cart align-items-center text-center" style="position: relative;">
                <span v-if="cartCount"
                    style="background-color: red; color:#fff; position: absolute; top: -15px; right:-5px; z-index: 1; border-radius:50%; width:23px">{{
                        cartCount }}</span>
                <i class="fa fa-shopping-bag text-white" aria-hidden="true"></i>
           </router-link>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
export default {
    name: 'HeaderComponent',

    setup() {

        //store vuex
        const store = useStore()

        //mounted
        onMounted(() => {

            store.dispatch('auth/getUser')
            store.dispatch('cart/cartCount')

        })

        const cartCount = computed(() => {

            //get getter "cartCount" dari module "auth"
            return store.getters['cart/cartCount']
        })

        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        const isLoggedIn = computed(() => {

            //get getters isLoggedIn dari module auth
            return store.getters['auth/isLoggedIn']

        })

        const cartTotalQty = computed(() => {
            return store.getters['cart/getTotal']
        })

        return {
            user,
            isLoggedIn,
            cartTotalQty,
            cartCount
        }

    }
}
</script>