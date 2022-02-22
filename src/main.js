// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import store from "./store";
import { getAuth } from "firebase/auth";
import MaterialKit from "./plugins/material-kit";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD16wJmOc_Eye7u0BUTpGnOBRCMXgZxX8",
  authDomain: "biblioteka-feniks.firebaseapp.com",
  projectId: "biblioteka-feniks",
  storageBucket: "biblioteka-feniks.appspot.com",
  messagingSenderId: "267912260670",
  appId: "1:267912260670:web:ab7a8f2fdca145a0c9f56f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  if (user === null) {
    router.push("/login");
  }
});

Vue.config.productionTip = false;

Vue.use(MaterialKit);

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
