<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-75 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">{{ pdf.name }}</h1>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <pdf-viewer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PdfViewer from "../components/PdfViewer";

export default {
  components: { PdfViewer },
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
      message: null
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    ...mapGetters({
      pdf: "pdf"
    })
  },
  created() {}
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
