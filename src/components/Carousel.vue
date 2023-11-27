<template>
    <div class="mt-3">
        <Splide :options="splideOptions" aria-label="My Favorite Images">
            <SplideSlide v-for="(slider, id) in datas" :class="{ active: id == 0 }" :key='slider.id'>
               <div class="m-2">
                <img :src="slider.image" class="w-100" alt="carousel-image">
               </div>
            </SplideSlide>
        </Splide>

    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {

    name: 'CarouselComponent',
    components: {
        Splide,
        SplideSlide,
    },


    setup() {

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('global/getCarousel')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const datas = computed(() => {
            return store.state.global.carousel
        })

        const splideOptions = computed(() => {
            return {
                type: 'loop',
                padding: '20px',
                margin: 10,
                // Add other Splide options as needed
            };
        });

        return {
            datas,
            splideOptions,
        }

    }

}
</script>