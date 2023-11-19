<template>
    <div class="pb-5 mb-5">
        <div class="d-flex justify-content-between align-items-center mt-5">
            <h4 class="fw-bold">Semua Produk</h4>
            <p>selengkapnya</p>
        </div>
    
        <div class="row semua-produk mt-3">
            
            <div class="col-6" v-for="d in datas.data" :key="d.id">
                <div class="card my-2">
                    <img  :src="`${Url()}/products/${d.image}`" class="card-img-top" alt="image">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">{{d.title}}</h5>
                        <p class="card-text">Rp {{ moneyFormat(d.price) }}</p>
                        <div class="d-flex rating">
                            <img src="/src/assets/icon-bintang.png" alt="">
                            <img src="/src/assets/icon-bintang.png" alt="">
                            <img src="/src/assets/icon-bintang.png" alt="">
                            <img src="/src/assets/icon-bintang.png" alt="">
                            <img src="/src/assets/icon-bintang-2.png" alt="">
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

    export default {

        name: 'HomeProductComponent',

        setup() {
            
            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
            onMounted(() => {
                store.dispatch('global/getProduct')
            })

            //computed properti digunakan untuk get data categories dari state di module category 
            const datas = computed(() => {
                return store.state.global.products
            })

            return {
                datas
            }

        }

    }
</script>