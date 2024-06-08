<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sóng to mặc sóng, đường xa kệ đường </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable tag="a" href="#/">
          <q-item-section>
            <q-item-label>Trang chủ</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item-label header> Mục lục </q-item-label>

        <ChapterLink
          v-for="chapter in linkList"
          :key="chapter.title"
          v-bind="chapter"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useChaptersStore } from "stores/chapters";
import ChapterLink from "components/ChapterLink.vue";

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);

const chaptersStore = useChaptersStore();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const linkList = computed(() =>
  chaptersStore.chapterList.map(({ id, title }) => ({
    title,
    link: `/#/chapters/${id}`,
  }))
);
</script>

<style>
.q-item__label {
  font-size: 1.1rem;
}

.q-page {
  padding: 2rem;
}

.q-page p {
  font-size: 1.3rem;
}
</style>
