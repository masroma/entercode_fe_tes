<template>
    <div class="pb-5 mb-5">
        <div class="d-flex justify-content-between align-items-center mt-5">
            <h4 class="fw-semibold">Semua Produk</h4>
            <p>selengkapnya</p>
        </div>
    
        <div class="row g-2 semua-produk mt-3">
            
            <div class="col-6" v-for="d in datas.data" :key="d.id">
                <div class="card my-2">
                    <div class="image" style="position: relative;">
                        <div class="rating d-flex align-items-center py-1 px-2 m-1 gap-1" style="position: absolute; top: 0; left:0; width: auto; z-index: 1; background:#ffffff; border-radius:10px; font-size:12px">
                            <img src="/src/assets/icon-bintang.png" alt=""> <span>4.5</span>
                        </div>
                        <img :src="`${Url()}/products/${d.image}`" class="card-img-top" :alt="d.slug">
                    </div>
                    <div class="card-body">
                        <router-link :to="{name:'detail-product',params:{slug:d.slug}}" class="no-text-decoration">
                        <p class="m-0" style="text-transform: capitalize; font-size:18px;color:black">{{ d.title }}</p>
                        </router-link>
                       
                        <div class="d-flex justify-content-between align-items-center ">
                            <p class="fw-semibold orange mt-3" style="font-size: 20px;">Rp {{ moneyFormat(d.price) }}</p>
                            <button class="px-2 py-1" style="background-color: orange; color:#ffffff; border:none; border-radius:10px"><i class="fa fa-plus"></i></button>
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