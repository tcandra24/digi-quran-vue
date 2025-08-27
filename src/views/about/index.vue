<script setup lang="ts"></script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard class="mx-auto my-8" elevation="4">
        <VCardItem>
          <VCardTitle> About Us </VCardTitle>

          <VCardSubtitle> Digi Quran for Everyones </VCardSubtitle>
        </VCardItem>

        <VCardText class="text-justify">
          DigiQuran application was created using the latest technologies such
          as Vue, Vuetify, Pinia, and Typescript. It is hoped that this
          application will help you read, memorize, and practice the Quran.
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard
        append-icon="mdi-open-in-new"
        href="https://github.com/tcandra24"
        max-width="320"
        prepend-icon="ri-github-fill"
        rel="noopener"
        target="_blank"
        title="Check out our Github"
      ></VCard>
    </VCol>
  </VRow>
</template>
