<template>
  <q-page class="row items-center justify-evenly">
    <h1>{{ chapter?.title }}</h1>
    <p>{{ chapter?.content }}</p>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { Chapter, useChaptersStore } from "src/stores/chapters";


const route = useRoute()

const chaptersStore = useChaptersStore();

const chapter = ref<Chapter | undefined>({
  id: "",
  title: "",
  content: ""
})

watch(() => route.params.id, (id) => {
  chapter.value = chaptersStore.chapterList.find(({ id: chapterId }) => chapterId === id)
}, { immediate: true })

defineOptions({
  name: "ChapterPage",
});

</script>
