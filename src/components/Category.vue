<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mt-5">
            <h4 class="fw-bold">Kategori</h4>
            <p>selengkapnya</p>
        </div>

        <div class="kategori">
            <div class="swift d-flex justify-content-between gap-1 overflow-x-auto" id="swift" ref="swiftContainer">
                <div class="item d-flex flex-column justify-content-center align-items-center text-center"
                    v-for="category in datas" :key="category.id">
                    <img :src="category.image" :alt="category.slug" class="img-item">
                    <p>{{ category.name }}</p>
                </div>
            </div>

            <button @click="scrollLeft" class="btn-prev fw-bold align-items-center d-none d-md-none d-lg-block "> <i
                    class="fa-solid fa-chevron-left text-white "></i> </button>
            <button @click="scrollRight" class="btn-next align-items-center d-none d-md-none d-lg-block"> <i
                    class="fa-solid fa-chevron-right text-white"></i></button>
        </div>

    </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {

    name: 'CategoryComponent',

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
            store.dispatch('global/getCategory')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const datas = computed(() => {
            return store.state.global.category
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