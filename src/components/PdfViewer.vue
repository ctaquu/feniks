<template>
  <div>
    <pdf
      v-if="!pdfLoading"
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style="display: inline-block; width: 100%"
    ></pdf>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import { mapGetters } from "vuex";

export default {
  components: {
    pdf
  },
  data() {
    return {
      src: null,
      numPages: undefined,
      url: null,
      pdfLoading: true,
    };
  },
  methods: {
    fetchPdfData() {
      this.url = this.pdf.URL;
      this.src = pdf.createLoadingTask(this.url);
      try {
        this.src.promise.then(pdf => {
          this.numPages = pdf.numPages;
          this.pdfLoading = false;
        });
      } catch (e) {
        console.warn("EEE", e);
      }
    },
  },
  computed: {
    ...mapGetters({
      pdf: "file"
    })
  },
  mounted() {
    try {
      this.fetchPdfData();
    } catch (e) {
      console.info("fetchPdfData failed");
    }
  }
};
</script>
