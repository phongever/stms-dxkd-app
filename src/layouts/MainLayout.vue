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
        <q-toggle
          :modelValue="$q.dark.isActive"
          :icon="themeIcon"
          @update:modelValue="toggleTheme"
        />
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

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="grey-9" text-color="white" />
          <span class="q-ml-sm">Có lỗi rồi!!!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Đóng" color="grey-9" v-close-popup />
          <q-btn
            flat
            label="Thử lại"
            color="grey-9"
            v-close-popup
            @click="fetchData"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useChaptersStore } from "stores/chapters";
import ChapterLink from "components/ChapterLink.vue";
import { Chapter } from "stores/chapters";
import { useQuasar } from "quasar";

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);

const chaptersStore = useChaptersStore();

const confirm = ref(false);

const $q = useQuasar();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const linkList = computed(() =>
  chaptersStore.chapterList.map(({ id, title }: Chapter) => ({
    title,
    link: `/#/chapters/${id}`,
  }))
);

const fetchData = async () => {
  try {
    $q.loading.show();

    await chaptersStore.fetchData();
  } catch {
    confirm.value = true;
  } finally {
    $q.loading.hide();
  }
};

onMounted(async () => {
  console.log();
  await fetchData();
});

const toggleTheme = () => {
  $q.dark.toggle();
};

const themeIcon = computed(() =>
  $q.dark.isActive ? "dark_mode" : "light_mode"
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
