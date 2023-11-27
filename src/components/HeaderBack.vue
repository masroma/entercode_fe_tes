<template>
    <div>
        <div class="header d-flex justify-content-between align-items-center py-3 px-3">
            <span @click="goBack" v-if="!title" class="icon-cart align-items-center text-center">
                <i class="fa fa fa-angle-left text-white" aria-hidden="true"></i>
            </span>
            <span v-if="title" class="title">{{ title }}</span>
            <span v-if="title_center" class="title">{{ title_center }}</span>
            <span class="icon-cart align-items-center text-center">
                <i class="fa fa-shopping-bag text-white" aria-hidden="true"></i>
            </span>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: 'HeaderBackComponent',
    props: {
        title: String,
        title_center: String
    },
    setup() {
        const router = useRouter()
        // Fungsi untuk kembali ke halaman sebelumnya
        const goBack = () => {
            router.go(-1);
        };

        return {
            goBack,
            router
        };
    },
}
</script>