import Api from '../../api/Api'
const order = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        orders: [],
        order:{}
    },

    //mutations
    mutations: {
        GET_ORDER(state, orders) {
            state.orders = orders // <-- assign state orders dari hasil response
        },

        GET_DETAIL(state, order) {
            state.order = order
        },
    
    
    },

    //actions
    actions: {
        getOrder({ commit }) {

            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get('/transaksi')
            .then(response => {
                // console.log(response.data.data);
                commit('GET_ORDER', response.data.data)

            })

        },

        getOrderDetail({ commit }, ids) {
            console.log('ini',ids)
            //define variable token
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get(`/transaksi/${ids}`)
            .then(response => {
                
                //commit mutation DETAIL_ORDER
                commit('GET_DETAIL', response.data.data)

            })

        }

     
    },

    //getters
    getters: {

        getOrder(state) {
            return state.orders
        },

        getOrderDetail(state) {
            return state.order
        },

      

    }

}

export default order