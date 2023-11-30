<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
            <h4 class="fw-semiold">Best seller</h4>
            <p>selengkapnya</p>
        </div>

        <!-- v-for="b in datas" :key="b.id" -->

        <Splide :options="splideOptions" aria-label="My Favorite Images">
            <SplideSlide v-for="b in datas" :key="b.id">
                <div class="m-1" style="width: 15rem;">
                    <div class="image" style="position: relative;">
                        <div class="rating d-flex align-items-center py-1 px-2 m-1 gap-1" style="position: absolute; top: 0; left:0; width: auto; z-index: 1; background:#ffffff; border-radius:10px; font-size:12px">
                            <img src="/src/assets/icon-bintang.png" alt=""> <span>4.5</span>
                        </div>
                       
                            <img :src="`${Url()}/products/${b.product.image}`" class="card-img-top" :alt="b.product.slug">
                       
                    </div>
                    
                    <div class="card-body border border-radius-none p-2">
                        <router-link :to="{name:'detail-product',params:{slug:b.product.slug}}" class="no-text-decoration">
                        <p class="m-0" style="text-transform: capitalize; font-size:18px;color:black">{{ b.product.title }}</p>
                        </router-link>
                       
                        <div class="d-flex justify-content-between align-items-center ">
                            <p class="fw-semibold orange mt-3" style="font-size: 20px;">Rp {{ moneyFormat(b.product.price) }}</p>
                            <button class="px-2 py-1" style="background-color: orange; color:#ffffff; border:none; border-radius:10px"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </SplideSlide>
        </Splide>


    </div>
</template>



<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {

    name: 'BestSellerComponent',
    components: {
        Splide,
        SplideSlide,
    },

    setup() {

        //store vuex
        const store = useStore()


        //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('global/getBestSeller')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const datas = computed(() => {
            return store.state.global.bestseller
        })

        const splideOptions = computed(() => {
            return {
                perPage: 2,
                // type: 'loop',
                focus: 'center',
                autoWidth: true,
                pagination: false,
                arrows: true, 

            };
        });

        return {
            datas,
            splideOptions,
        }

    }

}
</script>

<style>
.no-text-decoration {
  text-decoration: none;
}
</style>