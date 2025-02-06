<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Article } from "~/@types/api";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();

const articleId = route.params.id;

const article = ref({}) as Ref<Article>;

const { data, error } = await useFetch<Article>(`/api/article/${articleId}`);

// @ts-ignore
article.value = data.value[0] ?? [];

const state = reactive({
  cover: article.value.cover || "",
  title: article.value.title || "",
  paragraph1: article.value.paragraph1 || "",
  paragraph2: article.value.paragraph2 || "",
  paragraph3: article.value.paragraph3 || "",
  author: article.value.author || "",
  lecture_time: article.value.lecture_time || "",
  theme: article.value.theme || "",
  accroche: article.value.accroche || "",
  illustration: article.value.illustration || "",
  date: article.value.date || "",
});

/* function openModal(){
    if(!modal.value){
        modal.value = true
    } else{
        modal.value = false
    }
} */

const onSubmit = async (event: Event) => {
  event.preventDefault();

  try {
    const response = await $fetch("/api/editArticle", {
      method: "POST",
      body: {
        cover: state.cover,
        title: state.title,
        paragraph1: state.paragraph1,
        paragraph2: state.paragraph2,
        paragraph3: state.paragraph3,
        author: state.author,
        lecture_time: state.lecture_time,
        articleId: articleId,
        theme: state.theme,
        accroche: state.accroche,
        illustration: state.illustration,
        date: state.date,
      },
    });

    // Update user dynamically if part of the response
    if (response) {
      //weeks.value = response.week   //faut faire un push dans l'array du weeks.value pour ainsi remount la page
      // @ts-ignore
      article.value = response.article[0];
    }
  } catch (error) {}
};
</script>

<template>
  <div>
    <h1>Admin</h1>
    <h2>Article</h2>
    <!-- <button @click="openModal" class="btn">Edit</button>

        <div>
            <h2>{{ article.title }}</h2>
        </div> -->
  </div>
  <div class="form-div">
    <!-- <button @click="openModal" class="btn close">Close</button> -->
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

      <!-- Title -->
      <div class="form-group">
        <label for="title" class="form-label">Title</label>
        <input
          v-model="state.title"
          id="title"
          type="text"
          name="title"
          class="form-input"
          required
        />
      </div>

      <!-- Paragraph 1 -->
      <div class="form-group">
        <label for="paragraph1" class="form-label">Paragraph 1</label>
        <textarea
          v-model="state.paragraph1"
          id="paragraph1"
          name="paragraph1"
          class="form-input"
          required
        ></textarea>
      </div>

      <!-- Paragraph 2 -->
      <div class="form-group">
        <label for="paragraph2" class="form-label">Paragraph 2</label>
        <textarea
          v-model="state.paragraph2"
          id="paragraph2"
          name="paragraph2"
          class="form-input"
        ></textarea>
      </div>

      <!-- Paragraph 3 -->
      <div class="form-group">
        <label for="paragraph3" class="form-label">Paragraph 3</label>
        <textarea
          v-model="state.paragraph3"
          id="paragraph3"
          name="paragraph3"
          class="form-input"
        ></textarea>
      </div>

      <!-- Author -->
      <div class="form-group">
        <label for="author" class="form-label">Author</label>
        <input
          v-model="state.author"
          id="author"
          type="text"
          name="author"
          class="form-input"
          required
        />
      </div>

      <!-- Lecture Time -->
      <div class="form-group">
        <label for="lecture_time" class="form-label">Lecture Time</label>
        <input
          v-model.number="state.lecture_time"
          id="lecture_time"
          type="number"
          name="lecture_time"
          class="form-input"
          required
        />
      </div>

      <!-- Theme -->
      <div class="form-group">
        <label for="theme" class="form-label">Theme</label>
        <input
          v-model="state.theme"
          id="theme"
          type="text"
          name="theme"
          class="form-input"
          required
        />
      </div>

      <!-- Accroche -->
      <div class="form-group">
        <label for="accroche" class="form-label">Accroche</label>
        <textarea
          v-model="state.accroche"
          id="accroche"
          name="accroche"
          class="form-input"
          required
        ></textarea>
      </div>

      <!-- Illustration -->
      <div class="form-group">
        <label for="illustration" class="form-label">Illustration</label>
        <input
          v-model="state.illustration"
          id="illustration"
          type="url"
          name="illustration"
          class="form-input"
          required
        />
      </div>

      <!-- Date -->
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
      <button type="submit" class="btn">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  background-color: #4caf50;
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn.close {
  background-color: red;
}

.btn:hover {
  background-color: #45a049;
}

.btn.close:hover {
  background-color: rgb(238, 76, 76);
}

.form-div {
  background-color: #fff;
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  //max-width: 50vw;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 50vw;
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
