<template>
    <div class="login d-flex flex-column px-3 py-5">

        <h3 class="m-0 fw-semibold orange">Login</h3>
        <p class="m-0 text-xs" style="font-size: 12px;">Selamat datang kembali </p>
        <p v-if="validation && validation.length > 0" class="text-danger text-sm">Email atau password salah</p>

        <div class="mt-3">
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input v-model="user.email" type="email" class="form-control forms" id="exampleInputEmail1"
                        aria-describedby="emailHelp">
                    <span v-if="validation.email" class="text-danger text-sm">{{ validation.email[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <div class="input-group mb-3">
                        <input v-model="user.password" :type="showPassword ? 'text' : 'password'" class="form-control forms"
                            aria-label="Password" aria-describedby="basic-addon2">
                        <span @click="togglePasswordVisibility" class="input-group-text " id="basic-addon2"> <i
                                :class="showPassword ? 'fa fa-eye-slash orange' : 'fa fa-eye orange'"></i></span>
                    </div>
                    <span v-if="validation.password" class="text-danger text-sm">{{ validation.password[0] }}</span>

                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-orange mb-2" :disabled="loading">
                        <span v-if="!loading">Login</span>
                        <span v-else>Loading...</span>
                    </button>
                    <button type="submit" class="btn btn-outline-primary"> <i class="fab fa-google"></i> Google</button>
                    <span class="text-center mt-2 ">Belum punya akun ? <router-link :to="{ name: 'register' }"
                            style="text-decoration: none; color:#999" class="fw-bold">Daftar</router-link></span>
                </div>



            </form>
        </div>

    </div>
</template>

<script>
import { ref, reactive, onMounted  } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

    name: 'LoginComponent',

    setup() {

        const password = ref('');
        const showPassword = ref(false);
        const showConfirmPassword = ref(false);
        const loading = ref(false);

        // Methods
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const toggleConfirmPasswordVisibility = () => {
            showConfirmPassword.value = !showConfirmPassword.value;
        };

        //user state
        const user = reactive({
            email: '',
            password: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()



        //method login
        function login() {

            loading.value = true;
            //define variable 
            let email = user.email
            let password = user.password

            //panggil action "login" dari module "auth" di vuex
            store.dispatch('auth/login', {
                email,
                password
            })
                .then(() => {
                    //redirect ke dashboard
                    router.push({ name: 'home' })
                }).catch(error => {

                    //assign validaation message
                    loading.value = false;
                    validation.value = error.message
                    // console.log("ero",error.message)

                }).finally(() => {
                    // Set loading to false setelah proses login selesai
                    loading.value = false;
                });
        }

        onMounted(() => {
            if (store.getters['auth/isLoggedIn']) {
                router.push({ name: 'home' })
            }
        })

        //return object
        return {

            password,
            showPassword,
            showConfirmPassword,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            user,
            validation,
            login,
            loading
        }

    }

}
</script>