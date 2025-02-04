<script lang="ts" setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink
    :item="{
      title: 'Dashboard',
      icon: 'ri-home-smile-line',
      to: '/dashboard',
    }"
  />

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Quran',
      icon: 'ri-book-line',
      to: '/quran',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Progress',
      icon: 'ri-flag-line',
      to: '/progress',
    }"
  />

  <VerticalNavSectionTitle
    :item="{
      heading: 'Pages',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'About',
      icon: 'ri-profile-line',
      to: '/account-settings',
    }"
  />
</template>
