import Vue from "vue";
import Router from "vue-router";
import Glavna from "./views/Glavna.vue";
import File from "./views/File.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Navbar from "./layout/Navbar.vue";
import NavbarFile from "./layout/NavbarFile.vue";
import Footer from "./layout/Footer.vue";
import Kategorija from "./views/Kategorija.vue";
import Muzika from "./views/Muzika.vue";
import Help from "./views/Help.vue";
import PageNotFound from "./views/PageNotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Glavna, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/glavna",
      name: "main",
      components: { default: Glavna, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/logout",
      name: "logout",
      components: { default: Logout, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/kategorija/:paths+",
      name: "category",
      components: { default: Kategorija, header: NavbarFile, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/muzika",
      name: "muzika",
      components: { default: Muzika, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/file",
      name: "Фајл",
      components: { default: File, header: NavbarFile, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/pomoc",
      name: "help",
      components: { default: Help, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "*",
      name: "404",
      components: { default: PageNotFound, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
