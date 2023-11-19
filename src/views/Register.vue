<template>
    <div class="login d-flex flex-column px-3 py-5">

        <h3 class="m-0 fw-semibold orange">Belum punya akun ?</h3>
        <p class="m-0 text-xs" style="font-size: 12px;">Silahkan isi data dibawah ini </p>

        <div class="mt-5">
            <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nama</label>
                    <input  v-model="user.name" type="text" class="form-control forms" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <span  v-if="validation.name" class="text-danger text-sm">{{ validation.name[0] }}</span>
                   

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input  v-model="user.email" type="email" class="form-control forms" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <span  v-if="validation.email" class="text-danger text-sm">{{ validation.email[0] }}</span>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <div class="input-group mb-3">
                        <input v-model="user.password" :type="showPassword ? 'text' : 'password'" class="form-control forms"
                            aria-label="Password" aria-describedby="basic-addon2">
                        <span @click="togglePasswordVisibility" class="input-group-text " id="basic-addon2"> <i
                                :class="showPassword ? 'fa fa-eye-slash orange' : 'fa fa-eye orange'"></i></span>
                    </div>
                    <span  v-if="validation.password" class="text-danger text-sm">{{ validation.password[0] }}</span>

                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Konfirmasi Password</label>
                    <div class="input-group mb-3">
                        <input v-model="user.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'" class="form-control forms"
                            aria-label="Password" aria-describedby="basic-addon2">
                        <span @click="toggleConfirmPasswordVisibility" class="input-group-text " id="basic-addon2"> <i
                                :class="showConfirmPassword ? 'fa fa-eye-slash orange' : 'fa fa-eye orange'"></i></span>
                    </div>
                   
                </div>
                <!-- <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> -->
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-orange mb-2">Register</button>

                    <span class="text-center mt-2 ">Sudah punya akun ? <router-link :to="{ name: 'login' }"
                            style="text-decoration: none; color:#999" class="fw-bold">Login</router-link></span>
                </div>



            </form>
        </div>

    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name: 'RegisterComponent',
    setup() {
        // Data
        const password = ref('');
        const showPassword = ref(false);
        const showConfirmPassword = ref(false);

        // Methods
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const toggleConfirmPasswordVisibility = () => {
            showConfirmPassword.value = !showConfirmPassword.value;
        };

        const user = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()

        //function register, fungsi ini di jalankan ketika form di submit
        function register() {

            //define variable 
            let name = user.name
            let email = user.email
            let password = user.password
            let password_confirmation = user.password_confirmation

            //panggil action "register" di dalam module "auth" vuex
            store.dispatch('auth/register', {
                name,
                email,
                password,
                password_confirmation
            })
                .then(() => {
                    //redirect ke dashboard
                    router.push({ name: 'home' })
                }).catch(error => {

                    //show validaation message
                    validation.value = error
                })
        }

        // Template
        return {
            password,
            showPassword,
            showConfirmPassword,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            user,
            validation,
            register
        };
    }
}
</script>