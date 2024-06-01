<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ChapterContent",
});

interface Props {
  title: string;
  chapter: string;
}

defineProps<Props>();
</script>
