<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mt-5">
            <h4 class="fw-bold">Produk Terlaris</h4>
            <p>selengkapnya</p>
        </div>

        <div class="list-produk-terlaris">
            <div class="mt-3 produk-terlaris d-flex gap-2 overflow-x-auto" id="swift" ref="swiftContainer">
                <div class="card" v-for="b in datas" :key="b.id">
                    <img :src="`${Url()}/products/${b.product.image}`" class="card-img-top" :alt="b.product.slug">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">{{ b.product.title }}</h5>
                        <p class="card-text">Rp {{ moneyFormat(b.product.price) }}</p>
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
            <button @click="scrollLeft" class="btn-prev fw-bold align-items-center d-none d-md-none d-lg-block "> <i
                class="fa-solid fa-chevron-left text-white "></i> </button>
        <button @click="scrollRight" class="btn-next align-items-center  d-none d-md-none d-lg-block"> <i
                class="fa-solid fa-chevron-right text-white"></i></button>
            <!-- <button class="btn-prev fw-bold  align-items-center"> <i class="fa-solid fa-chevron-left text-white"></i> </button>
            <button class="btn-next  align-items-center"> <i class="fa-solid fa-chevron-right text-white"></i></button> -->
        </div>
    </div>
</template>



<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {

    name: 'BestSellerComponent',

    setup() {

        //store vuex
        const store = useStore()
        const currentIndex = ref(0);
        const itemWidth = 150; // Adjust this based on your item width
        const swiftContainer = ref(null);

        const scrollLeft = () => {
            currentIndex.value = Math.max(currentIndex.value - 1, 0);
            scrollContainer();
        };

        const scrollRight = () => {
            currentIndex.value = Math.min(currentIndex.value + 1, datas.value.length - 1);
            scrollContainer();
        };

        const scrollContainer = () => {
            const scrollAmount = currentIndex.value * itemWidth;
            swiftContainer.value.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
        };


        //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('global/getBestSeller')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const datas = computed(() => {
            return store.state.global.bestseller
        })

        return {
            datas,
            currentIndex,
            scrollLeft,
            scrollRight,
            swiftContainer,
        }

    }

}
</script>