<template>
    <div class="main">
        <HeaderBackComponent title="Kategori" />
        <div class="row px-3 py-3">
            <div class="col-3 col-lg-3 my-2" v-for="category in datas" :key="category.id">
                <div class="item d-flex flex-column justify-content-center align-items-center text-center gap-2">
                    <img :src="category.image" :alt="category.slug" class="img-item">
                    <p>{{ category.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBackComponent from '../components/HeaderBack.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'AllCategoryComponent',
    components: {
        HeaderBackComponent
    },
    setup() {
        const store = useStore()
        onMounted(() => {
            store.dispatch('global/getCategory')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const datas = computed(() => {
            return store.state.global.category
        })

        return {
            datas,

        }

    }
}
</script>