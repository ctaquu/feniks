<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Библиотека Поштоване Ложе Феникс</h1>
            <h4>
              Добродошли!.
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
            <div
              v-if="categories"
              class="md-layout"
            >
              <div
                v-for="folder in categories.folders"
                :key="folder.id"
                class="md-layout-item md-medium-size-33 md-small-size-100"
              >
                <div class="info info-folder">
                  <md-button
                    style="white-space: pre-wrap"
                    class="md-lg md-primary"
                    @click="handleOpenFolder(folder)"
                    >{{ folder.title }}
                  </md-button>
                  <p>{{ folder.subtitle }}</p>
                </div>
              </div>
              <div
                v-if="categories"
                v-for="file in categories.files"
                :key="file.id"
                class="md-layout-item md-medium-size-33 md-small-size-100"
              >
                <div class="info info-file">
                  <md-button
                    style="white-space: pre-wrap"
                    class="md-lg md-danger"
                    @click="handleOpenFile(file)"
                  >{{ file.title }}
                  </md-button>
                  <p>{{ file.subtitle }}</p>
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
      default: require("@/assets/img/feniks_logo.jpg")
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
      message: null
    };
  },
  created() {
    this.$store.dispatch("loadDataStructure");
  },
  methods: {
    handleOpenFolder(category) {
      this.$store.dispatch("setCategory", category);
      router.push(`/kategorija/${category.id}`);
    },
    handleOpenFile(file) {
      this.$store.dispatch("setFile", file);
      router.push("/file");
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    ...mapGetters({
      user: "user",
      categories: "dataStructure"
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
