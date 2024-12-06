<script lang="ts" setup>
import { ref } from 'vue';
import type { Week } from "~/@types/api";

definePageMeta({
    middleware: ["auth"]
})

const { data } = await useFetch('/api/week') 

const weeks = ref(data.value)

const modal = ref(false)

const supabase = useSupabaseClient()

const state = reactive({
    cover: '',
    date: '',
})

const onSubmit = async (event: Event) => {
    event.preventDefault()

    console.log('Form Data:', state)
    try{
        const response = await $fetch('/api/createWeek', {
            method: 'POST',
            body: {
                cover: state.cover,
                date: state.date,
            },
        });

        // Update user dynamically if part of the response
        if (response) {
            console.log("Insert success:", response);
            console.log("Weeks", weeks.value)
            //weeks.value = response.week   //faut faire un push dans l'array du weeks.value pour ainsi remount la page
            weeks.value.push(response.week[0]);
        }
    } catch(error){
        console.log("Failed insert : ", error)
    }
}

const deleteWeek = async (week:string) => {
    try{
        const response = await $fetch('/api/deleteWeek', {
            method: 'POST',
            body: {
                weekId: week,
            },
        });

        // Update user dynamically if part of the response
        if (response) {
            console.log("Delete success:", response);
            console.log("Weeks", weeks.value)
            //weeks.value = response.week   //faut faire un push dans l'array du weeks.value pour ainsi remount la page
            weeks.value = response.weeks;
        }
    } catch(error){
        console.log("Failed surpression : ", error)
    }
}

function openModal(){
    if(!modal.value){
        modal.value = true
    } else{
        modal.value = false
    }
}

</script>

<template>
    <div>
        <h1>Admin</h1>
        <h2>Semaines</h2>
        <button @click="openModal" class="btn">Create Week</button>
        <ul>
            <li v-for="week in weeks" :key="week.id">
                <nuxt-link :to="`/admin/${week.id}`">{{ week.date }}</nuxt-link>
                <button @click="deleteWeek(week.id)" class="btn close">Delete</button>
            </li>
        </ul>
    </div>
    <div v-if="modal" class="form-div">
        <button @click="openModal" class="btn close">Close</button>
        <form @submit="onSubmit" class="form-container">
            <!-- Cover -->
            <div class="form-group">
                <label for="cover" class="form-label">Cover</label>
                <input
                    v-model="state.cover"
                    id="cover"
                    type="url"
                    name="cover"
                    class="form-input"
                    required
                />
            </div>

            <!-- Date  -->
            <div class="form-group">
                <label for="date" class="form-label">Date</label>
                <input
                    v-model="state.date"
                    id="date"
                    type="text"
                    name="text"
                    class="form-input"
                    required
                />
            </div>

            <!-- Submit Button -->
            <button
            type="submit"
            class="btn"
            >
            Submit
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.btn {
    background-color: #4CAF50;
    color: white;
    padding: 5px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn.close{
    background-color: red;
}

.btn:hover {
    background-color: #45a049;
}

.btn.close:hover {
    background-color: rgb(238, 76, 76);
}

.form-div{
    background-color: #FFF;
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 50vw;
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

</style>