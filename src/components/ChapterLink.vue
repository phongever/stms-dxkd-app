<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: "ChapterLink",
});

export interface ChapterLinkProps {
  title: string;
  link?: string;
}

withDefaults(defineProps<ChapterLinkProps>(), {
  link: "#",
});
</script>
