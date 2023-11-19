import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app = createApp(App)

app.use(router)
app.use(store)
//define mixins for global function
app.mixin({

    methods: {

        //money thousands
        moneyFormat(number) {
            // Format angka dengan dua desimal dan koma sebagai pemisah ribuan
            let val = (number / 1).toFixed(2).replace('.', ',');
        
            // Hilangkan nol desimal jika ada
            val = val.endsWith(',00') ? val.slice(0, -3) : val;
        
            // Tambahkan titik sebagai pemisah ribuan
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        },

        Url(){
            return 'http://localhost:8000/storage'
        }

    }
})

app.mount('#app')