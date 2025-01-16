<script setup lang="ts">
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";

import logo from "@images/logo.svg?raw";
import authV1MaskDark from "@images/pages/auth-v1-mask-dark.png";
import authV1MaskLight from "@images/pages/auth-v1-mask-light.png";
import authV1Tree2 from "@images/pages/auth-v1-tree-2.png";
import authV1Tree from "@images/pages/auth-v1-tree.png";

import { useAuthStore } from "@stores/authStore";

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const toastr = ref<boolean>(false);
const toastrMessage = ref<string>("");
const toastrColor = ref<string>("");
const privacyPolicies = ref<boolean>(false);

const loading = ref<boolean>(false);

const vuetifyTheme = useTheme();

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === "light"
    ? authV1MaskLight
    : authV1MaskDark;
});

const isPasswordVisible = ref(false);

const store = useAuthStore();
const router = useRouter();
const { register } = store;

const submit = async () => {
  try {
    loading.value = true;

    const { success, message } = await register(form);

    loading.value = false;

    if (!success) {
      toastrColor.value = "danger";
    }

    toastrColor.value = "primary";
    toastr.value = true;
    toastrMessage.value = message;

    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    toastr.value = true;
    toastrMessage.value = "Error, Please Contact Administrator";
  }
};
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <RouterLink to="/" class="d-flex align-center gap-3">
          <!-- eslint-disable vue/no-v-html -->
          <div class="d-flex" v-html="logo" />
          <h2 class="font-weight-medium text-2xl text-uppercase">Materio</h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Adventure starts here 🚀</h4>
        <p class="mb-0">Make your app management easy and fun!</p>
      </VCardText>

      <VCardText>
        <vProgressLinear
          :active="loading"
          :indeterminate="loading"
          color="deep-purple-accent-4"
          absolute
          bottom
        />
        <VForm @submit.prevent="submit()">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField v-model="form.name" label="Name" placeholder="Name" />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                autocomplete="password"
                :append-inner-icon="
                  isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <div class="d-flex align-center my-6">
                <VCheckbox
                  id="privacy-policy"
                  v-model="privacyPolicies"
                  inline
                />
                <VLabel for="privacy-policy" style="opacity: 1">
                  <span class="me-1">I agree to</span>
                  <a href="javascript:void(0)" class="text-primary"
                    >privacy policy & terms</a
                  >
                </VLabel>
              </div>

              <VBtn block type="submit" :disabled="loading || !privacyPolicies">
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                Sign in instead
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />

    <v-snackbar v-model="toastr">
      {{ toastrMessage }}

      <template v-slot:actions>
        <v-btn :color="toastrColor" variant="text" @click="toastr = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
