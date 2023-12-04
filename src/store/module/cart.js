//import global API
import Api from '../../api/Api'

const cart = {

    //set namespace true
    namespaced: true,

    //state
    state: {
    
        //cart
        cart: [],

        //total cart
        cartTotal: 0,

    },

    //mutations
    mutations: {

        //get data cart
        GET_CART(state, product) {
            state.cart = product
        },

        //get total cart
        TOTAL_CART(state, total) {
            state.cartTotal = total
        },

     

    },

    //actions
    actions: {

        //action addToCart
        addToCart({ commit }, { product_id }) {

            //get data token dan user
            const token = localStorage.getItem('token')
            const user  = localStorage.getItem('user')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            
            //send data cart ke server
            Api.post('/keranjang', {
                product_id: product_id
            })
            .then(() => {

                //get dat cart
                Api.get('/keranjang')
                .then(response => {
                    
                    //commit mutation GET_CART
                    commit('GET_CART', response.data.cart)

                })

                //get total cart
                Api.get('/total')
                .then(response => {
                    console.log('cart',response.data)
                    //commit mutation TOTAL_CART
                    commit('TOTAL_CART', response.data.data)

                })

            })
        },

        cartCount({ commit }) {

          //get data token dan user
          const token = localStorage.getItem('token')

          //set axios header dengan type Authorization + Bearer token
          Api.defaults.headers.common['Authorization'] = "Bearer " +token

          //get dat cart
          Api.get('/keranjang')
          .then(response => {
              
              //commit mutation GET_CART
              commit('GET_CART', response.data.data)

          })

        },

      checkout({ commit }) {

        //get data token dan user
        const token = localStorage.getItem('token')

        //set axios header dengan type Authorization + Bearer token
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        //get dat cart
        Api.get('/checkout')
        .then(response => {
            
            //commit mutation GET_CART
            commit('GET_CART', response.data.data)

        })

    },

    },

    //getters
    getters: {

        //get cart
        getCart(state) {
            return state.cart
        },
        
        //count cart
        cartCount(state) {
            return state.cart.length
        }

    }

}

export default cart