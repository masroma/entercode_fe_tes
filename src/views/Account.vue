<template>
    <div class="akun">
        <HeaderBackComponent title="Akun"/>
        <div class=" px-3 py-3">
          
            <!-- <div class="card mt-3 ">
                <div class="card-body d-flex align-items-center gap-2 bg-orange">
                    <div class="img">
                        <img src="/src/assets/5.png" alt="" class="img-fluid rounded">
                    </div>
                    <div class="data-user d-flex flex-column ">
                        <h5 class="m-0 fw-semibold">Halo {{ user.name }}</h5>
                        <p>Total Order : 10</p>
                    </div>
                </div>
            </div> -->
            <div class=" d-flex flex-column gap-2 mt-3">
                <div class="card">
                    <router-link :to="{ name: 'order' }" style="text-decoration: none; color:#999">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div><i class="fa fa-list"></i> History Order</div>
                            <div><i class="fas fa-angle-right"></i></div>
                        </div>
                    </router-link>
                </div>
              
              
                <div class="card">
                    <a @click="logout" style="text-decoration: none; color:#999; cursor:pointer">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div><i class="fas fa-power-off"></i> Keluar</div>
                            <div><i class="fas fa-angle-right"></i></div>
                        </div>
                    </a>
                </div>
    
    
    
            </div>
    
        </div>
    </div>
   
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import HeaderBackComponent from '../components/HeaderBack.vue'

export default {
    name: 'AccountComponent',
    components: {
        HeaderBackComponent
    },
    setup() {

        //store vuex
        const store = useStore()

        //mounted
        onMounted(() => {

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

        })

        //computed
        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        const router = useRouter()

        //method logout
        function logout() {

            //panggil action "logout" di dalam module "auth"
            store.dispatch('auth/logout')
                .then(() => {

                    //jika berhasil, akan di arahkan ke route login
                    router.push({
                        name: 'home'
                    })

                })

        }
        //return a state and function
        return {
            store,
            user,
            logout
        }

    }
}
</script>