<template>
    <div class="home">
        <HeaderComponent />
        <div class=" px-3">
            
            <div class="d-flex mt-4 ">
                <input type="text" placeholder="pencarian" class="form-control forms">
                <button class="btn-search"><i class="fa fa-search text-white"></i></button>
            </div>
    
            <div class="card mt-3 " v-if="user.name">
                <div class="card-body d-flex align-items-center gap-2 bg-orange">
                    <div class="img">
                        <img src="/src/assets/5.png" alt="" class="img-fluid rounded">
                    </div>
                    <div class="data-user d-flex flex-column ">
                        <h5 class="m-0 fw-semibold">Halo {{ user.name }}</h5>
                        <p>Total Order : 10</p>
                    </div>
    
                </div>
            </div>
    
            <Carousel />
    
            <Category />
    
            <BestSeller />
    
            <HomeProduct />
    
        </div>
    </div>
   
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Carousel from '../components/Carousel.vue'
import Category from '../components/Category.vue'
import BestSeller from '../components/BestSeller.vue'
import HomeProduct from '../components/HomeProduct.vue'
import HeaderComponent from '../components/Header.vue'
export default {
    name: 'HomeComponent',
    components: {
        Carousel,
        Category,
        BestSeller,
        HomeProduct,
        HeaderComponent
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

        //return a state and function
        return {
            store,
            user
        }

    }
}
</script>