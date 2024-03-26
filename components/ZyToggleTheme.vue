<template>
  <q-toggle
      :model-value="dark.isActive"
      checked-icon="dark_mode"
      unchecked-icon="light_mode"
      size="3rem"
      @update:model-value="(val) => dark.set(val)"
  />
</template>

<script setup>
import { useQuasar } from 'quasar';
const themeIcon = computed(() => (dark.isActive ? 'dark_mode' : 'light_mode'));
const { dialog, bottomSheet, loading, loadingBar, notify, dark, screen } = useQuasar();
</script>

<style scoped>

</style>
