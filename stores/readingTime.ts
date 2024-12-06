import { defineStore } from "pinia";
import { ref } from "vue";

export const useReadingTimeStore = defineStore("readingTime", () => {
  const readingTime = ref(0);

  function setReadingTime(time: number) {
    readingTime.value = time;
  }

  return {
    readingTime,
    setReadingTime,
  };
});
