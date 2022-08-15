<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="grey">
              <h4 slot="title" class="card-title">Пријављивање</h4>
              <p slot="description" class="description" style="color: red">
                {{ errorMessage }}
              </p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input
                  @input="isWorking = false"
                  v-model="email"
                  type="email"
                ></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Лозинка...</label>
                <md-input
                  type="password"
                  @input="isWorking = false"
                  v-model="password"
                ></md-input>
              </md-field>
              <md-button
                slot="footer"
                class="md-primary md-lg"
                @click="login"
                :disabled="isWorking"
              >
                Идемо!!
              </md-button>
              <p slot="description" class="description">.</p>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "../router";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      email: null,
      password: null,
      errorMessage: "",
      isWorking: false
    };
  },
  props: {
    header: {
      type: String
      // default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    login() {
      this.isWorking = true;
      if (this.email !== "" && this.password !== "") {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(userCredential => {
            this.isWorking = false;
            router.push("/glavna");
          })
          .catch(error => {
            switch (error.code) {
              case "auth/missing-email":
                this.errorMessage = `Морате унети Email!`;
                break;
              case "auth/invalid-email":
                this.errorMessage = `Email је неправилоно формиран!`;
                break;
              case "auth/user-not-found":
                this.errorMessage = `Непостојећи email!`;
                break;
              case "auth/wrong-password":
                this.errorMessage = `Погрешна лозинка!`;
                break;
              case "auth/internal-error":
                this.errorMessage = `Нешто се гадно сјебало!`;
                break;
              default:
                this.errorMessage = ``;
                break;
                this.isWorking = false;
            }
          });
      } else {
        this.errorMessage = `Email и лозинка су неопходни!`;
        this.isWorking = false;
      }
    }
  }
};
</script>

<style lang="css"></style>
