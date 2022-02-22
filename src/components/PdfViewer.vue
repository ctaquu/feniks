<template>
  <div v-if="src">
    <pdf
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style="display: inline-block; width: 100%"
    ></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { mapGetters } from "vuex";

export default {
  components: {
    pdf
  },
  data() {
    return {
      src: null,
      numPages: undefined,
      url: null
    };
  },
  methods: {
    fetchPdfUrl() {
      // Create a reference to the file we want to download
      const storage = getStorage();
      const starsRef = ref(storage, `dokumenta/${this.pdf.id}`);

      // Get the download URL
      getDownloadURL(starsRef)
        .then(url => {
          this.url = url;
          this.src = pdf.createLoadingTask(this.url);
          this.src.promise.then(pdf => {
            this.numPages = pdf.numPages;
          });
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
  },
  computed: {
    ...mapGetters({
      pdf: "pdf"
    })
  },
  mounted() {
    this.fetchPdfUrl();
  }
};
</script>
