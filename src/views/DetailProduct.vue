<template>
    <div style="position: relative;">
        <HeaderBackComponent style="position: absolute; top: 0;  width: 100%; z-index: 1;" />
        <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
            <SplideSlide>
                <img :src="`${Url()}/products/${detail.image}`" :alt="detail.slug" class="w-100">
            </SplideSlide>
            <SplideSlide v-if="detail.image1 != ''">
                <img :src="`${Url()}/products/${detail.image1}`" :alt="detail.slug" class="w-100">
            </SplideSlide>
            <SplideSlide v-if="detail.image2 != ''">
                <img :src="`${Url()}/products/${detail.image2}`" :alt="detail.slug" class="w-100">
            </SplideSlide>
            <SplideSlide v-if="detail.image3 != ''">
                <img :src="`${Url()}/products/${detail.image3}`" :alt="detail.slug" class="w-100">
            </SplideSlide>
            <SplideSlide v-if="detail.image4 != ''">
                <img :src="`${Url()}/products/${detail.image4}`" :alt="detail.slug" class="w-100">
            </SplideSlide>
        </Splide>

        <div class="mt-3 px-3">
            <h4 class="fw-semibold text-dark m-0" v-html="detail.title"></h4>
            <div class="d-flex justify-content-between align-items-center mt-2 mb-4">
                <div class="price d-flex gap-2">
                    <h5 class="fw-bold" style="color: orange">Rp. {{ moneyFormat(calculateDiscount(detail))
                    }}</h5>
                    <s class="fw-bold" style="text-decoration-color:red">Rp. {{ moneyFormat(detail.price) }}</s>
                </div>
                <span class="badge bg-orange">{{ capitalizeFirstLetter(detail.kategori) }}</span>
            </div>

            <p v-html="detail.desc"></p>
        </div>


    </div>
</template>
<script>
import { computed, onMounted, reactive, watch } from 'vue'   // computed dan onMounted
import { useStore } from 'vuex' // store Vuex
import { useRoute, useRouter } from 'vue-router' // vue router
import HeaderBackComponent from '../components/HeaderBack.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {

    name: 'HistoryOrderComponent',
    components: {
        HeaderBackComponent,
        Splide,
        SplideSlide,
    },
    setup() {

        const detail = reactive({
            image: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            title: '',
            price: '',
            reviews_avg_rating: '',
            reviews_count: '',
            kategori: '',
            discount: '',
            slug: '',
            desc: ''
        })

        //vue route
        const route = useRoute()

        //vue router
        const router = useRouter()

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action "getDetailProduct" di module "product" Vuex
        onMounted(() => {
            store.dispatch('global/getDetailProduct', route.params.slug)
        })

        const capitalizeFirstLetter = (text) => {
            // Membuat huruf awal besar
            return text.charAt(0).toUpperCase() + text.slice(1);
        };

        //computed properti digunakan untuk mendapatkan data detail product dari state "product" di module "product" Vuex 
        const datas = computed(() => {
            return store.state.global.product.data
        })

        const splideOptions = computed(() => {
            return {
                type: 'loop',
                padding: '20px',
                margin: 10,
                // Add other Splide options as needed
            };
        });

        watch(
            () => store.state.global.product.data,
            (newdata) => {
                if (newdata) {
                    const {
                        image,
                        image_1,
                        image_2,
                        image_3,
                        image_4,
                        title,
                        discount,
                        price,
                        reviews_avg_rating,
                        reviews_count,
                        category,
                        slug,
                        description,

                    } = newdata;
                    detail.image = image ?? '';
                    detail.image1 = image_1 ?? '';
                    detail.image2 = image_2 ?? '';
                    detail.image3 = image_3 ?? '';
                    detail.image4 = image_4 ?? '';
                    detail.title = title;
                    detail.discount = discount;
                    detail.price = price;
                    detail.reviews_avg_rating = reviews_avg_rating;
                    detail.reviews_count = reviews_count;
                    detail.kategori = category ? category.name : '';
                    detail.slug = slug;
                    detail.desc = description;


                }
            }
        );

        return {
            route,
            router,
            store,
            datas,
            splideOptions,
            detail,
            capitalizeFirstLetter
        }

    }
}
</script>