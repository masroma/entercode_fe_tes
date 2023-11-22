<template>
    <div class="login">
        <HeaderBackComponent title_center="Update Profile" />
        <div class=" d-flex flex-column px-3 py-3">
    
          
    
            <div class="mt-3">
                <form @submit.prevent="updateprofile">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nama</label>
                        <input v-model="user.name" type="text" class="form-control forms" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                        <span v-if="validation.name" class="text-danger text-sm">{{ validation.name[0] }}</span>
    
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input v-model="user.email" type="email" class="form-control forms" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                        <span v-if="validation.email" class="text-danger text-sm">{{ validation.email[0] }}</span>
                    </div>
    
    
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-orange mb-2">Update profile</button>
    
                    </div>
    
                </form>
            </div>
    
        </div>
    </div>
   
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue'
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



        //user state
        const user = reactive({
            email: '',
            name: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()

        //method login
        onMounted(() => {

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

        })

        const users = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })


        function updateprofile() {
            let formData = new FormData();
            formData.append('email', this.user.email)
            formData.append('name', this.user.name)


            formData.append("_method", "POST");
            //panggil actions "register" dari module "auth"
            store
                .dispatch("auth/updateProfile", formData)
                .then(() => {
                    //redirect ke dashboard
                    router.push({ name: "update-profile" });
                    Swal.fire({
                        icon: "success",
                        title: "Data berhasil diupdate",
                    });

                    // toast.success("Tambah data berhasil")
                })
                .catch((error) => {
                    //show validaation message
                    // //console.log(error);

                    validation.value = error;

                    Swal.fire({
                        title: "GAGAL!",
                        text: validation.value.error,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    console.error("An error occurred:", error);
                });
        }

        watch(
            () => store.state.auth.user,
            (newuser) => {
                if (newuser) {
                    const {
                        name,
                        email,

                    } = newuser;
                    user.email = email;
                    user.name = name;


                }
            }
        );

        //return object
        return {
            users,
            user,
            validation,
            updateprofile
        }

    }

}
</script>