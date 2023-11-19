//import vuex
import { createStore } from 'vuex'
import auth from './module/auth'
import global from './module/global'
//create store vuex
export default createStore({

    modules: {
        auth,    
        global
    }

})