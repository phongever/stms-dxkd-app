<template>
  <q-page class="row items-center justify-evenly">
    <h1>{{ chapter?.title }}</h1>
    <p v-html="chapter?.content"></p>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { Chapter, useChaptersStore } from "src/stores/chapters";
import markdownit from "markdown-it"
import { useQuasar } from "quasar"

defineOptions({
  name: "ChapterPage",
});

const md = markdownit()

const route = useRoute()

const chaptersStore = useChaptersStore();

const DEFAULT_CHAPTER = {
  id: "",
  title: "",
  content: ""
}

const chapter = ref<Chapter | undefined>(DEFAULT_CHAPTER)


const $q = useQuasar()


onMounted(async () => {
  try {
    $q.loading.show();

    await chaptersStore.fetchData()

    const currentChapter = chaptersStore.chapterList.find(({ id: chapterId }) => chapterId === route.params.id) ?? DEFAULT_CHAPTER
    currentChapter.content = md.render(currentChapter.content ?? "")
    chapter.value = currentChapter
  } catch (error) {

  } finally {
    $q.loading.hide()
  }
});

watch(() => route.params.id, (id) => {
  const currentChapter = chaptersStore.chapterList.find(({ id: chapterId }) => chapterId === id) ?? DEFAULT_CHAPTER
  currentChapter.content = md.render(currentChapter.content ?? "")
  chapter.value = currentChapter
}, { immediate: true })

</script>
