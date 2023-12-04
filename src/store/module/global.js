import Api from '../../api/Api'
const global = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        carousel: [],
        category: [],
        bestseller: [],
        products: [],
        product: {}
    },

    //mutations
    mutations: {
        GET_CAROUSEL(state, carousel) {
            state.carousel = carousel // <-- assign state orders dari hasil response
        },

        GET_CATEGORY(state, category) {
            state.category = category // <-- assign state orders dari hasil response
        },

        GET_BESTSELLER(state, bestseller) {
            state.bestseller = bestseller // <-- assign state orders dari hasil response
        },

        GET_PRODUCTS(state, products) {
            state.products = products // <-- assign state orders dari hasil response
        },

        DETAIL_PRODUCT(state, product) {
            state.product = product
        }
    },

    //actions
    actions: {
        getCarousel({ commit }) {


            Api.get('/web/sliders')
                .then(response => {
                    // console.log(response.data.data);
                    commit('GET_CAROUSEL', response.data.data)

                })

        },

        getCategory({ commit }) {
            Api.get('/web/categories')
                .then(response => {
                    // console.log(response.data.data);
                    commit('GET_CATEGORY', response.data.data)

                })

        },

        getBestSeller({ commit }) {
            Api.get('/product-customer')
                .then(response => {
                    // console.log('cs',response.data.data);
                    commit('GET_BESTSELLER', response.data.data)

                })

        },

        getProduct({ commit }) {
            Api.get('/product-customer')
                .then(response => {
                    console.log(response.data.data);
                    commit('GET_PRODUCTS', response.data.data)

                })

        },

        getDetailProduct({ commit }, slug) {

            //get data sliders ke server
            Api.get(`/web/products/${slug}`)
                .then(response => {

                    console.log(response.data)
                    //commit ke mutation GET_PRODUCTS dengan response data
                    commit('DETAIL_PRODUCT', response.data)

                }).catch(error => {

                    //show error log dari response
                    console.log(error)

                })
        }

    },

    //getters
    getters: {

        getCarousel(state) {
            return state.carousel
        },

        getCategory(state) {
            return state.category
        },

        getBestSeller(state) {
            return state.bestseller
        },

        getProduct(state) {
            return state.products
        },

        getDetailProduct(state){
            return state.product
        }

    }

}

export default global