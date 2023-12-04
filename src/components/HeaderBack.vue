<template>
    <div class="pt-3">
        <div class="header d-flex justify-content-between align-items-center py-3 px-3">
            <span @click="goBack" v-if="!title" class="icon-cart align-items-center text-center">
                <i class="fa fa fa-angle-left text-white" aria-hidden="true"></i>
            </span>
            <span v-if="title" class="title">{{ title }}</span>
            <span v-if="title_center" class="title">{{ title_center }}</span>
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
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'HeaderBackComponent',
    props: {
        title: String,
        title_center: String
    },
    setup() {

        const router = useRouter()
        const store = useStore()
        // Fungsi untuk kembali ke halaman sebelumnya
        const goBack = () => {
            router.go(-1);
        };

        onMounted(() => {
            store.dispatch('cart/cartCount')

        })
        const cartCount = computed(() => {

//get getter "cartCount" dari module "auth"
return store.getters['cart/cartCount']
})

        return {

            goBack,
            router,
            cartCount
        };
    },
}
</script>