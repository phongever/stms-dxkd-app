<template>
  <div class="fullscreen bg-grey-9 text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">🙈</div>

      <div class="text-h2">Không thấy gì hết!</div>

      <q-btn class="q-mt-xl" color="white" text-color="grey-9" unelevated to="/" label="Về trang chủ" no-caps />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ErrorNotFound",
});
</script>
