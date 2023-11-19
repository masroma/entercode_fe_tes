

<template>
  <div>
    <HeaderComponent v-if="this.$route.name !== 'login' && this.$route.name !== 'register'" />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>

import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'

export default {

  name: 'AppComponent',

  components: {
    HeaderComponent,
    FooterComponent
  }

}
</script>

