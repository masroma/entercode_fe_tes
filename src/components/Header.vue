<template>
    <div>
        <div class="header d-flex justify-content-between align-items-center py-3 px-3">
            <div class="d-flex flex-column align-items-start" v-if="isLoggedIn">
                <span class="logo fw-bold">MonMon</span>
                <h6 class="m-0 fw-semibold">Halo {{ user.name }}</h6>
            </div>
            <div class="logo" v-else>
                <span class="logo fw-bold">MonMon</span>
                <!-- <span class="d-flex lokasi align-items-center gap-1">
                    <i class="fa fa-location"></i> pademangan timur
                </span> -->
            </div>
            <span class="icon-cart align-items-center text-center">
                <i class="fa fa-shopping-bag text-white" aria-hidden="true"></i>
            </span>
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

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

        })

        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        const isLoggedIn = computed(() => {

            //get getters isLoggedIn dari module auth
            return store.getters['auth/isLoggedIn']

        })

        return {
            store,
            user,
            isLoggedIn
        }

    }
}
</script>