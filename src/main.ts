import { createApp } from "vue";

import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";
import { useRegisterSW } from "virtual:pwa-register/vue";
// Styles
import "@core/scss/template/index.scss";
import "@layouts/styles/index.scss";
import "@/assets/styles/styles.scss";

// Create vue app
const app = createApp(App);

const intervalMS = 60 * 60 * 1000;

useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

// Register plugins
registerPlugins(app);

// Mount vue app
app.mount("#app");
