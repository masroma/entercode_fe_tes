//import vuex
import { createStore } from 'vuex'
import auth from './module/auth'
import global from './module/global'
import order from './module/order'
//create store vuex
export default createStore({

    modules: {
        auth,    
        global,
        order
    }

})