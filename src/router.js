import Vue from "vue";
import Router from "vue-router";
import Glavna from "./views/Glavna.vue";
import PDF from "./views/PDF.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Navbar from "./layout/Navbar.vue";
import NavbarPDF from "./layout/NavbarPDF.vue";
import Footer from "./layout/Footer.vue";
import Kategorija from "./views/Kategorija.vue";
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
      path: "/kategorija",
      name: "category",
      components: { default: Kategorija, header: Navbar, footer: Footer },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    // {
    //   path: "/kategorije/:category",
    //   name: "kategorije",
    //   components: { default: Kategorija, header: Navbar, footer: Footer },
    //   props: {
    //     header: { colorOnScroll: 400 }
    //   }
    // },
    {
      path: "/pdf",
      name: "pdf",
      components: { default: PDF, header: NavbarPDF, footer: Footer },
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
