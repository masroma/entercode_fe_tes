<template>
    <div>
        <div id="carouselExample" class="carousel slide mt-4">
            <div class="carousel-inner h-100">
                <div class="carousel-item h-100" v-for="(slider, id) in datas" :class="{ active: id==0 }" :key='slider.id'>
                    <img :src="slider.image" class="d-block w-100 h-100" alt="carousel-image">
                </div>
               
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                data-bs-slide="prev">
                <img src="assets/previus.png" alt="">
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                data-bs-slide="next">
                <img src="assets/next.png" alt="">
            </button>
        </div>
    </div>
</template>

<script>
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'

    export default {

        name: 'CarouselComponent',

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

            return {
                datas
            }

        }

    }
</script>