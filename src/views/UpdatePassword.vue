<template>
   <div class="login">
    <HeaderBackComponent title_center="Update Password" />
    <div class=" d-flex flex-column px-3 py-3">

     

        <div class="mt-3">
            <form @submit.prevent="updatepassword">
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password Lama</label>
                    <div class="input-group mb-3">
                        <input v-model="user.oldpassword" :type="showOldPassword ? 'text' : 'password'" class="form-control forms"
                            aria-label="Password" aria-describedby="basic-addon2">
                        <span @click="toggleOldPasswordVisibility" class="input-group-text " id="basic-addon2"> <i
                                :class="showOldPassword ? 'fa fa-eye-slash orange' : 'fa fa-eye orange'"></i></span>
                    </div>
                    <span v-if="validation.oldpassword" class="text-danger text-sm">{{ validation.oldpassword[0] }}</span>

                </div>

                <div class="my-3">
                    <hr>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password Bru</label>
                    <div class="input-group mb-3">
                        <input v-model="user.password" :type="showPassword ? 'text' : 'password'" class="form-control forms"
                            aria-label="Password" aria-describedby="basic-addon2">
                        <span @click="togglePasswordVisibility" class="input-group-text " id="basic-addon2"> <i
                                :class="showPassword ? 'fa fa-eye-slash orange' : 'fa fa-eye orange'"></i></span>
                    </div>
                    <span  v-if="validation.password" class="text-danger text-sm">{{ validation.password[0] }}</span>

                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Konfirmasi Password Baru</label>
                    <div class="input-group mb-3">
                        <input v-model="user.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'" class="form-control forms"
                            aria-label="Password" aria-describedby="basic-addon2">
                        <span @click="toggleConfirmPasswordVisibility" class="input-group-text " id="basic-addon2"> <i
                                :class="showConfirmPassword ? 'fa fa-eye-slash orange' : 'fa fa-eye orange'"></i></span>
                    </div>
                   
                </div>
             
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-orange mb-2">update password</button>
                 
                </div>



            </form>
        </div>

    </div>
   </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from "sweetalert2";
import HeaderBackComponent from '../components/HeaderBack.vue'

export default {

    name: 'LoginComponent',
    components: {
        HeaderBackComponent
    },

    setup() {

        const password = ref('');
        const showPassword = ref(false);
        const showOldPassword = ref(false);
        const showConfirmPassword = ref(false);

        // Methods
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const toggleOldPasswordVisibility = () => {
            showOldPassword.value = !showOldPassword.value;
        };

        const toggleConfirmPasswordVisibility = () => {
            showConfirmPassword.value = !showConfirmPassword.value;
        };

        //user state
        const user = reactive({
           
            password: '',
            oldpassword:'',
            password_confirmation: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()

        //method login
        function updatepassword() {
            let formData = new FormData();
            formData.append('oldpassword', this.user.oldpassword)
            formData.append('password', this.user.password)
            formData.append('password_confirmation', this.user.password_confirmation)
          

            formData.append("_method", "POST");
            //panggil actions "register" dari module "auth"
            store
                .dispatch("auth/updatePassword", formData)
                .then(() => {
                    //redirect ke dashboard
                    router.push({ name: "update-password" });
                    Swal.fire({
                        icon: "success",
                        title: "Data berhasil diupdate",
                    });

                    // toast.success("Tambah data berhasil")
                })
                .catch((error) => {
                    //show validaation message
                    console.log(error);

                    validation.value = error;

                    Swal.fire({
                        title: "GAGAL!",
                        text:validation.value.error,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    // console.error("An error occurred:", error);
                });
        }

        //return object
        return {
            password,
            showPassword,
            showOldPassword,
            showConfirmPassword,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            toggleOldPasswordVisibility,
            user,
            validation,
            updatepassword
        }

    }

}
</script>