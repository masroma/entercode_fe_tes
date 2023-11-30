// store/cart.js
const cart = {
  namespaced: true,

  state: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    total: 0,
  },

  mutations: {
    ADD_TO_CART(state, item) {
      state.cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      state.total += item.qty;
    },
  },

  actions: {
    initializeCart({ commit }) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      commit('SET_CART', cartItems);
    },
    addToCart({ dispatch, commit }, item) {
      commit('ADD_TO_CART', item);
      dispatch('saveCartToLocalStorage');
    },
    saveCartToLocalStorage({ state }) {
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },

  getters: {
    getCartItems: (state) => state.cartItems,
    getTotal: (state) => state.total,
  },
};

export default cart;
