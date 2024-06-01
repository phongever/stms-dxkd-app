<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-9">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Sóng to mặc sóng, đường xa kệ đường </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Mục lục </q-item-label>

        <ChapterLink v-for="chapter in chaptersStore.chapterList" :key="chapter.title" v-bind="chapter" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useChaptersStore } from "stores/chapters";
import ChapterLink from "components/ChapterLink.vue";
import { useQuasar } from "quasar"


defineOptions({
  name: "MainLayout",
});

const $q = useQuasar()

const leftDrawerOpen = ref(false);

const chaptersStore = useChaptersStore();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(async () => {
  try {
    $q.loading.show();
    await chaptersStore.fetchData()
  } catch (error) {

  } finally {
    $q.loading.hide()
  }
});
</script>
