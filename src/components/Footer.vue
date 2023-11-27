<template>
<div>
    <div class="footer d-flex justify-content-between align-items-center px-3">
        <router-link  class="active d-flex flex-column justify-content-center align-items-center text-center" :to="{name: 'home'}">
            <img src="../assets/home-2.png" alt="">
            Home
        </router-link>  

        <router-link class="d-flex flex-column justify-content-center align-items-center text-center" :to="{name: 'kategori'}">
            <img src="../assets/categories.png" alt="">
            Kategori
        </router-link>
       
        <a href="#" class="d-flex flex-column justify-content-center align-items-center text-center">
            <img src="../assets/discount-1.png" alt="">
            Promo
        </a>
        
        <router-link  class="active d-flex flex-column justify-content-center align-items-center text-center" :to="{name: 'akun'}">
            <img src="../assets/user.png" alt="">
           Akun
        </router-link>  
    </div>
</div>
</template>

<script>
    export default {
        name: 'FooterComponent',
    }
</script>