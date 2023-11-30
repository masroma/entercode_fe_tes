<template>
    <div>
        <div class="footer align-items-center px-3">
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-orange" @click="addToCart">
                    Masukan ke keranjang
                </button>
            </div>
        </div>
    </div>
</template>
    
<script>
import { useStore } from 'vuex'
export default {
    name: 'FooterProductComponent',
    props: {
        product: Object, // Define a prop named 'product'
    },
    setup(props) {
        const store = useStore()
        const addToCart = () => {
            const { name, image, price } = props.product;
            const qty = 1;
            store.dispatch('cart/addToCart', { name, image, qty, price });
        };
        return {
            addToCart,
        };
    }
}
</script>