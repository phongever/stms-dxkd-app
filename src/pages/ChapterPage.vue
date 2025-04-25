<template>
  <q-page class="column items-center justify-evenly">
    <h1>{{ chapter?.title }}</h1>
    <p v-html="chapterContent"></p>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { Chapter, useChaptersStore } from "stores/chapters";
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
    chaptersStore.chapterById(route.params.id as string) ?? DEFAULT_CHAPTER;

  chapter.value = currentChapter;
});

const chapterContent = computed(() =>
  md.render(chapter.value?.content ?? DEFAULT_CHAPTER.content)
);
</script>
