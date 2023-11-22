<template>
    <div class="main mb-5 pb-5">
        <HeaderBackComponent title_center="Detail Order" />
        <div class="px-3 py-3 ">
            <div class="row mt-4">
                <div class="col-12 d-flex flex-column gap-2">
                    <div class="card">
                        <div class="card-body d-flex flex-column gap-2">
                            <h6 class="m-0 fw-bold">Detail Order</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 text-sm">invoice</p>
                                <p class="m-0 text-sm">{{ detailOrder.invoice }}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 text-sm">Tanggal</p>
                                <p class="m-0 text-sm">{{
                                    new Date(detailOrder.created_at).toLocaleString("id-ID", {
                                        timeZone: "Asia/Jakarta",
                                        hourCycle: "h23",
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })
                                }}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 text-sm">Type</p>
                                <p class="m-0 text-sm">Take Away</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 text-sm">Status</p>
                                <button @click="payment(detailOrder.snap_token)" v-if="detailOrder.status == 'pending'"
                                    class="btn btn-primary btn-sm text-sm">Bayar Sekarang</button>
                                <button v-else-if="detailOrder.status == 'success'" class="btn btn-success btn-sm">{{
                                    detailOrder.status }}</button>
                                <button v-else-if="detailOrder.status == 'expired'" class="btn btn-warning btn-sm">{{
                                    detailOrder.status }}</button>
                                <button v-else-if="detailOrder.status == 'failed'" class="btn btn-danger btn-sm">{{
                                    detailOrder.status }}</button>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body d-flex flex-column gap-2">
                            <h6 class="m-0 fw-bold">Rincian Order</h6>
                            <div class="d-flex justify-content-between align-items-center" v-for="p in detailOrder.orders">
                                <div class="d-flex gap-2">
                                    <img :src="`${Url()}/products/${p.product.image}`" :alt="p.product.slug"
                                        class="img-fluid rounded">
                                    <div class="d-flex flex-column">
                                        <p class="m-0 fw-semibold">{{ p.product.title }}</p>
                                        <p class="m-0 text-sm">Qty : {{ p.qty }} x Rp.{{ moneyFormat(p.product.price) }}</p>
                                        <p class="m-0 text-sm">
                                            Total : Rp.{{ moneyFormat(p.qty * p.product.price) }}
                                        </p>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body d-flex flex-column gap-2">
                            <h6 class="m-0 fw-bold">Grand Total</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 text-sm">Nominal</p>
                                <p class="m-0 text-sm">Rp.{{ moneyFormat(detailOrder.grand_total) }}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 text-sm">PPN</p>
                                <p class="m-0 text-sm">10% (Rp.{{ moneyFormat(detailOrder.grand_total * 10 / 100) }})</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0 fw-bold">Total</p>
                                <p class="m-0 fw-bold">Rp.{{ moneyFormat((detailOrder.grand_total * 10 / 100) +
                                    detailOrder.grand_total) }}</p>
                            </div>
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
import { useRoute, useRouter } from 'vue-router'
import HeaderBackComponent from '../components/HeaderBack.vue'

export default {

    name: 'DetailHistoryOrderComponent',
    components: {
        HeaderBackComponent
    },


    setup() {

        //store vuex
        const store = useStore()

        //router and route vue router
        const route = useRoute()
        const router = useRouter()

        //mounted
        onMounted(() => {

            //panggil action "detailOrder" di dalam module "order" di Vuex
            store.dispatch('order/getOrderDetail', route.params.snap_token)

        })

        //computed
        const detailOrder = computed(() => {

            //panggil getter dengan nama "detailOrder" di dalam module "order" Vuex
            return store.getters['order/getOrderDetail']

        })

        //computed


        //function payment "Midtrans"
        function payment(snap_token) {

            window.snap.pay(snap_token, {

                onSuccess: function () {
                    router.push({ name: 'detail-order', params: { snap_token: snap_token } })
                },
                onPending: function () {
                    router.push({ name: 'detail-order', params: { snap_token: snap_token } })
                },
                onError: function () {
                    router.push({ name: 'detail-order', params: { snap_token: snap_token } })
                }
            })

        }

        return {
            store,
            route,
            router,
            detailOrder,
            payment
        }

    }
}
</script>

<style scoped>
.main .card {
    color: #999;
}

.card img {
    max-width: 70px;
    max-height: 70px;
}

.text-sm {
    font-size: 12px;
}
</style>