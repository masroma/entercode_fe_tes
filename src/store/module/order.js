import Api from '../../api/Api'
const order = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        orders: [],
    },

    //mutations
    mutations: {
        GET_ORDER(state, orders) {
            state.orders = orders // <-- assign state orders dari hasil response
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

    },

    //getters
    getters: {

        getOrder(state) {
            return state.orders
        },

      

    }

}

export default order