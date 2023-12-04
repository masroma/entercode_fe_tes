<template>
    <div class="main mb-5 pb-5">
        <HeaderBackComponent title_center="Keranjang" />
        <div class="px-3 py-3 ">
            <div class="row mt-4">
                <div class="col-12 d-flex flex-column gap-2">
                   

                    <div class="card">
                        <div class="card-body d-flex flex-column gap-2">
                            <h6 class="m-0 fw-bold">Keranjang</h6>
                            <div class="d-flex justify-content-between align-items-center" v-for="p in detailOrder">
                                <div class="d-flex gap-2">
                                    <img :src="p.data_products.image" :alt="p.data_products.name"
                                        class="img-fluid rounded">
                                    <div class="d-flex flex-column">
                                        <p class="m-0 fw-semibold">{{ p.data_products.name }}</p>
                                        <p class="m-0 text-sm">Qty : {{ p.qty }} x Rp.{{ moneyFormat(p.data_products.price) }}</p>
                                        <p class="m-0 text-sm">
                                            Total : Rp.{{ moneyFormat(p.qty * p.data_products.price) }}
                                        </p>
                                    </div>


                                </div>
                            </div>

                            <div class="d-grid gap-2">
                                <button @click.prevent="Checkout" class="btn btn-primary" type="button">Checkout</button>
                                </div>
                        </div>
                    </div>

                  


                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import HeaderBackComponent from '../components/HeaderBack.vue'

export default {

    name: 'DetailHistoryOrderComponent',
    components: {
        HeaderBackComponent
    },


    setup() {

        //store vuex
        const store = useStore()

        //router and route vue router
        const route = useRoute()
        const router = useRouter()

        //mounted
        onMounted(() => {

            //panggil action "detailOrder" di dalam module "order" di Vuex
            store.dispatch('cart/getCart')

        })

        function Checkout() {
                  
                  //check token terlebih dahulu
                  const token = store.state.auth.token
  
                  if(!token) {
                      return router.push({name: 'login'})
                  }
  
                  //panggil action addToCart di module cart
                  store.dispatch('cart/checkout') 

                  router.push({ name: 'home' });
  
              }


        //computed
        const detailOrder = computed(() => {

            //panggil getter dengan nama "detailOrder" di dalam module "order" Vuex
            return store.getters['cart/getCart']

        })

        //computed


        //function payment "Midtrans"
       

        return {
            store,
            route,
            router,
            detailOrder,
            Checkout
        }

    }
}
</script>

<style scoped>
.main .card {
    color: #999;
}

.card img {
    max-width: 70px;
    max-height: 70px;
}

.text-sm {
    font-size: 12px;
}
</style>