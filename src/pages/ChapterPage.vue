<template>
  <q-page class="row items-center justify-evenly">
    <h1>{{ chapter?.title }}</h1>
    <p v-html="chapter?.content"></p>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { Chapter, useChaptersStore } from "src/stores/chapters";
import markdownit from "markdown-it";

defineOptions({
  name: "ChapterPage",
});

const md = markdownit();

const route = useRoute();

const chaptersStore = useChaptersStore();

const DEFAULT_CHAPTER = {
  id: "",
  title: "",
  content: "",
};

const chapter = ref<Chapter | undefined>(DEFAULT_CHAPTER);

watchEffect(() => {
  const currentChapter =
    chaptersStore.chapterById(route.params.id as string) ??
    DEFAULT_CHAPTER;
  console.log(currentChapter)
  currentChapter.content = md.render(currentChapter.content ?? "");
  chapter.value = currentChapter;
})
</script>
