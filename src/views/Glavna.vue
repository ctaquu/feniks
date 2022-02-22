<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Наслов за Главну Страну</h1>
            <h4>
              Порука добродошлице.
            </h4>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">Главне Категорије</h2>
              <h5 class="description">
                Овде можете наћи глане теме или нивое текстова.
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div
                v-for="category in categories"
                :key="category.id"
                class="md-layout-item md-medium-size-33 md-small-size-100"
              >
                <div class="info">
                  <md-button
                    class="md-success md-lg"
                    @click="handleOpenCategory(category)"
                    >{{ category.title }}
                  </md-button>
                  <p>{{ category.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../router";

export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg3.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      categories: [
        {
          id: "ucenici",
          title: "Ученици",
          subtitle: "Почетни текстови у трагању за светлошћу..."
        },
        {
          id: "pomocnici",
          title: "Помоћници",
          subtitle: "Нешто мало више..."
        },
        {
          id: "majstori",
          title: "Мајстори",
          subtitle: "Нешто на високом нивоу..."
        }
      ]
    };
  },
  methods: {
    handleOpenCategory(category) {
      this.$store.dispatch("setCategory", category);
      router.push("/kategorija");
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}

.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
