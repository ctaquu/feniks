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
              Порука добродошлице. Порука добродошлице. Порука добродошлице. Порука добродошлице. Порука добродошлице. Порука добродошлице. Порука добродошлице.Порука добродошлице. Порука добродошлице.
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
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <md-button
                      class="md-success md-lg"
                      @click="$router.push('/kategorije/ucenici')"
                  >Ученици</md-button>
                  <p>
                    Почетни текстови у трагању за светлошћу...
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <md-button
                      class="md-info md-lg"
                      @click="$router.push('/kategorije/pomocnici')"
                  >Помоћници</md-button>
                  <p>
                    Нешто мало више...
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <md-button
                      class="md-danger md-lg"
                      @click="$router.push('/kategorije/majstori')"
                  >Мајстори</md-button>
                  <p>
                    Нешто на високом нивоу...
                  </p>
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
      message: null
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
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
