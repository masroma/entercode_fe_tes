<template>
    <div>
      <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h4 class="fw-semiold">Kategori</h4>
        <p>selengkapnya</p>
      </div>
  
      <Splide :options="splideOptions" aria-label="My Favorite Images" >
        <SplideSlide v-for="category in datas" :key="category.id">
         <div class="d-flex flex-column align-items-center gap-2">
            <img :src="category.image" :alt="category.slug" class="img-item">
            <p>{{ category.name }}</p>
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
    name: 'CategoryComponent',
    components: {
      Splide,
      SplideSlide,
    },
    setup() {
      // store vuex
      const store = useStore()
  
      // onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
      onMounted(() => {
        store.dispatch('global/getCategory')
      })
  
      // computed properti digunakan untuk get data categories dari state di module category
      const datas = computed(() => {
        return store.state.global.category
      })
  
      // Splide options for multiple slides
      const splideOptions = computed(() => {
        return {
          perPage: 4, // Number of slides per page
          rewind: true,
          pagination: false,
          arrows: false, 
        };
      });
  
      return {
        datas,
        splideOptions,
      }
    }
  }
  </script>
  