

<template>
  <div>
    
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>


import FooterComponent from './components/Footer.vue'

export default {

  name: 'AppComponent',

  components: {
    FooterComponent
  }

}
</script>

