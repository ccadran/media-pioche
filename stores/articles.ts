import { defineStore } from "pinia";
import { ref } from "vue";

export const useArticlesStore = defineStore("articles", () => {
  const articles = ref([]);
  const currentIndex = ref(0);

  function addArticle(article) {
    const exists = articles.value.some((a) => a.id === article.id);

    if (!exists) {
      articles.value.push(article);
    } else {
      console.warn(
        `L'article avec l'ID ${article.id} est déjà dans le tableau.`
      );
    }
  }

  function removeArticle(articleId) {
    articles.value = articles.value.filter(
      (article) => article.id !== articleId
    );
  }

  function nextArticle() {
    currentIndex.value = currentIndex.value + 1;
  }

  const currentArticle = computed(() => {
    return articles.value[currentIndex.value];
  });

  const totalArticles = computed(() => articles.value.length);

  return {
    articles,
    addArticle,
    removeArticle,
    totalArticles,
    nextArticle,
    currentArticle,
    currentIndex,
  };
});
