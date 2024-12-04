<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
    email: '',
    password: ''
})

const supabase = useSupabaseClient()
const formErrors = reactive<{ path: string, message: string }[]>([])
const user = reactive({
    value: useSupabaseUser()
})

const validate = (state: {email: string, password: string}) => {
    const errors: {path: string, message: string}[] = []
    if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
    if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
    return errors
}

const onSubmit = async (event: Event) => {
    event.preventDefault()

    formErrors.length = 0  // Clear previous errors

    console.log("Form submission triggered")

    // Validate the form
    formErrors.push(...validate(state))

    if (formErrors.length === 0) {
        // If no errors, proceed with form submission logic
        console.log('Form Data:', state)
        try{
            //const { data, error } = await useFetch(`/api/login?email=${state.email}&password=${state.password}`)

            const response = await $fetch('/api/login', {
                method: 'POST',
                body: {
                    email: state.email,
                    password: state.password,
                },
            });

            // Update user dynamically if part of the response
            if (response) {
                console.log("Login success:", response);
                user.value = response.user
                navigateTo('/admin')
            }

            /* if(error){
                console.log("Failed login : ", error)
            } else {
                console.log("Login sucess: ", data)
            } */
        } catch(error){
            console.log("Failed login : ", error)
        }
        // You can perform a POST request here to submit the form data
    } else {
        console.log('Form Errors:', formErrors)
    }
}

async function signOut() {
    //const { error } = await supabase.auth.signOut({ scope: 'local' })
    //console.log('Sign out error', error)
    const reponse = await $fetch('/api/logout')
    if(reponse){
        user.value = null
        console.log("Sucessfully logged out")
    }
}

</script>

<template>
    <h2>Admin Login</h2>
    <button v-if="user.value" @click="signOut" class="submit-btn">Logout</button>
    <form @submit.prevent="onSubmit" class="form-container">
        <!-- Email Field -->
        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
                v-model="state.email"
                id="email"
                type="email"
                name="email"
                class="form-input"
                :class="{'form-input-error': formErrors.some(e => e.path === 'email')}"
            />
            <span v-if="formErrors.find(e => e.path === 'email')" class="form-error">
                {{ formErrors.find(e => e.path === 'email')?.message }}
            </span>
        </div>

        <!-- Password Field -->
        <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
                v-model="state.password"
                id="password"
                type="password"
                name="password"
                class="form-input"
                :class="{'form-input-error': formErrors.some(e => e.path === 'password')}"
            />
            <span v-if="formErrors.find(e => e.path === 'password')" class="form-error">
                {{ formErrors.find(e => e.path === 'password')?.message }}
            </span>
        </div>

        <!-- General Error (Supabase Auth Error) -->
        <div v-if="formErrors.find(e => e.path === 'general')" class="form-group">
            <span class="form-error">
                {{ formErrors.find(e => e.path === 'general')?.message }}
            </span>
        </div>

        <!-- Submit Button -->
        <button
        type="submit"
        class="submit-btn"
        >
        Submit
        </button>
    </form>

    <div v-if="user.value" class="user-data">
        <h3>User Info</h3>
        <p><strong>Email:</strong> {{ user.value?.email }}</p>
        <p><strong>ID:</strong> {{ user.value?.id }}</p>
        <p><strong>Role:</strong> {{ user.value?.role }}</p>
    </div>
</template>

<style lang="scss" scoped>
.form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: auto;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.form-label {
    margin-bottom: 8px;
    font-weight: bold;
}

.form-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.form-input-error {
    border-color: red;
}

.form-error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
}

.submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.submit-btn:hover {
    background-color: #45a049;
}
</style>
