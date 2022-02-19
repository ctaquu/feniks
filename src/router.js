import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Glavna from "./views/Glavna.vue";
import Ucenici from "./views/categories/Ucenici.vue";
import Pomocnici from "./views/categories/Pomocnici.vue";
import Majstori from "./views/categories/Majstori.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import Navbar from "./layout/Navbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import Footer from "./layout/Footer.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/glavna",
      name: "glavna",
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
      path: "/kategorije/ucenici",
      name: "ucenici",
      components: { default: Ucenici, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/kategorije/pomocnici",
      name: "pomocnici",
      components: { default: Pomocnici, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/kategorije/majstori",
      name: "majstori",
      components: { default: Majstori, header: Navbar, footer: Footer },
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
