<template>
    <div class="main px-3 py-3">
        <h5>Order</h5>
        <div class="d-flex justify-content-between align-items-center ">
            <div class="pencarian">
                <input type="text" class="form-control forms  form-control-sm" placeholder="cari">
            </div>
            <div class="d-flex gap-2">
                <a class="btn-prev fw-bold align-items-center"> <i class="fa-solid fa-chevron-left orange"></i> </a>
                <p>10 dari 20</p>
                <a class="btn-next align-items-center"> <i class="fa-solid fa-chevron-right orange"></i></a>
            </div>
        </div>
        <div class="row mt-4 d-flex flex-column gap-2">
            <div class="col-12" v-for="d in datas.data" :key="d.id">
                <div class="card">
                    <div class="card-body d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            <p class="m-0 fw-semibold">{{d.invoice}}</p>
                            <p class="m-0 text-sm">{{
                                new Date(d.created_at).toLocaleString("id-ID", {
                                  timeZone: "Asia/Jakarta",
                                  hourCycle: "h23",
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                })
                              }}</p>
                            <p  v-if="d.status == 'pending'" class="m-0 text-warning text-sm">Pending</p>
                            <p  v-if="d.status == 'success'" class="m-0 text-success text-sm">Success</p>
                            <p  v-if="d.status == 'failed'" class="m-0 text-danger text-sm">Failed</p>
                        </div>

                        <div class="d-flex flex-column">
                            <p class="m-0 text-sm fw-semibold">Total</p>
                            <p class="m-0">Rp. {{ moneyFormat(d.grand_total) }}</p>
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

export default {

    name: 'HistoryOrderComponent',

    setup() {

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('order/getOrder')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const datas = computed(() => {
            return store.state.order.orders
        })

        return {
            datas
        }

    }

}
</script>

<style scoped>
.card img {
    max-width: 70px;
    max-height: 70px;
}

.text-sm {
    font-size: 12px;
}
</style>