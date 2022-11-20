<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container" v-if="!loadingFile">
        <div class="md-layout" style="justify-content: center">
          <div
            v-if="file.URL !== null"
            class="md-layout-item md-size-75 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">{{ file.name }}</h1>
            <md-button @click="handleDownloadFile">
              Преузми датотеку
            </md-button>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div
      class="main main-raised text-center"
      style="justify-content: center"
      v-if="!loadingFile"
    >
      <div class="section">
        <div class="container">
          <pdf-viewer v-if="file.type === 'pdf'" />
          <img v-else-if="file.type === 'jpg'" :src="file.URL" alt="слика" />
          <p class="md-title" v-else>
            Датотеку није могуће приказати, али је можете преузети на дугме
            горе.
          </p>
        </div>
      </div>
    </div>
    <h3 class="md-title" v-else>
      Датотеку није могуће приказати, али је можете преузети на дугме горе.
    </h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PdfViewer from "../components/PdfViewer";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default {
  components: { PdfViewer },
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
      message: null,
      loadingFile: true
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    ...mapGetters({
      file: "file"
    })
  },
  created() {
    this.fetchFileUrl();
  },
  methods: {
    handleDownloadFile() {
      console.info("handleDownloadFile");
      window.open(this.file.URL, "_blank");
    },
    async fetchFileUrl() {
      // Create a reference to the file we want to download
      const storage = getStorage();
      const fileRef = ref(storage, `${this.file.fullPath}`);

      // Get the download URL
      await getDownloadURL(fileRef)
        .then(url => {
          const newFile = this.file;
          newFile.URL = url;
          this.$store.dispatch("setFile", newFile);
          // this.$store.dispatch("setJPG", newFile);
          this.loadingFile = false;
        })
        .catch(error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
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
