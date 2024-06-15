<template>
  <q-page class="row flex-center">
    <h1 class="text-center">Sóng to mặc sóng, đường xa kệ đường</h1>
    <h2>Dương Lê Hoài Phong</h2>
  </q-page>
</template>

<script setup lang="ts">
import { useChaptersStore } from "src/stores/chapters";
import { onMounted } from "vue";
import { useQuasar } from "quasar"

defineOptions({
  name: "IndexPage",
});

const chaptersStore = useChaptersStore();

const $q = useQuasar()

onMounted(async () => {
  await fetchData()
});

const fetchData = async () => {
  try {
    $q.loading.show()
    await chaptersStore.fetchData()
  } catch {

  } finally {
    $q.loading.hide()
  }
}
</script>
