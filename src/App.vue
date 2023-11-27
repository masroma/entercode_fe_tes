

<template>
  <div>
    
    <router-view />
    <FooterComponent v-if="$route.name !== 'detail-product'"/>
    <FooterProductComponent v-if="$route.name === 'detail-product'"/>
  </div>
</template>

<script>


import FooterComponent from './components/Footer.vue'
import FooterProductComponent from './components/FooterProduct.vue'
export default {

  name: 'AppComponent',

  components: {
    FooterComponent,
    FooterProductComponent
  }

}
</script>

