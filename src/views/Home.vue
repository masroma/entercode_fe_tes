<template>
    <div class="home">
        <HeaderComponent />
        <div class=" px-3">
            
            <div class="d-flex mt-4 ">
                <input type="text" placeholder="pencarian" class="form-control forms">
                <button class="btn-search"><i class="fa fa-search text-white"></i></button>
            </div>
    
            <BestSeller />
    
            <HomeProduct />
    
        </div>
    </div>
   
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BestSeller from '../components/BestSeller.vue'
import HomeProduct from '../components/HomeProduct.vue'
import HeaderComponent from '../components/Header.vue'
export default {
    name: 'HomeComponent',
    components: {
       
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