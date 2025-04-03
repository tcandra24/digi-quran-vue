<script lang="ts" setup>
import { ref } from "vue";
import { VBottomNavigation, VIcon, VBtn } from "vuetify/components";
import UserProfile from "@/layouts/components/UserProfile.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";

const value = ref(0);
</script>

<template>
  <VBottomNavigation v-model="value" color="primary" active>
    <VBtn :to="{ name: 'dashboard' }">
      <VIcon>ri-home-smile-line</VIcon>
      Dashboard
    </VBtn>

    <VBtn :to="{ name: 'quran' }">
      <VIcon>ri-book-line</VIcon>
      Quran
    </VBtn>

    <VBtn :to="{ name: 'progress.index' }">
      <VIcon>ri-flag-line</VIcon>
      Progress
    </VBtn>

    <VBtn :to="{ name: 'account-settings' }">
      <VIcon>ri-profile-line</VIcon>
      About
    </VBtn>

    <VBtn>
      <UserProfile />
    </VBtn>
  </VBottomNavigation>
  <VFab
    color="primary"
    app
    location="bottom left"
    class="p-0"
    size="x-large"
    icon
  >
    <NavbarThemeSwitcher />
  </VFab>
</template>
