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
            Api.get('/customer/invoices')
            .then(response => {
                // console.log(response.data.data);
                commit('GET_ORDER', response.data.data)

            })

        },

        getOrderDetail({ commit }, snap_token) {
            console.log('ini',snap_token)
            //define variable token
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get(`/customer/invoices/${snap_token}`)
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