<template>
  <div>
    <div class="md-layout">
      <div
        class="md-layout-item md-layout-item-shadow md-medium-size-33 md-small-size-100"
        v-for="pdf in pdfList"
        :key="pdf.id"
        @click="openOnePdf(pdf)"
      >
        <div class="info">
          <div class="icon icon-danger">
            <md-icon>picture_as_pdf</md-icon>
          </div>
          <h4 class="info-title">{{ pdf.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "../../router";
import { getStorage, listAll, ref } from "firebase/storage";

export default {
  components: {},
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
  methods: {
    openOnePdf(pdf) {
      this.$store.dispatch("setPDF", pdf);
      router.push("/pdf");
    },
    fetchPdfs() {
      const storage = getStorage();
      // Create a reference under which you want to list
      const listRef = ref(storage, `dokumenta/${this.category.id}`);

      // Find all the prefixes and items.
      listAll(listRef)
        .then(res => {
          this.theList = res.items.map(i => {
            try {
              return {
                id: `${this.category.id}/${i.name}`,
                name: i.name.replace(/\.[^/.]+$/, "")
              };
            } catch (e) {
              // return nothing
            }
          });
        })
        .catch(error => {
          // Uh-oh, an error occurred!
          // console.error("ERR", error);
        });
    }
  },
  data() {
    return {
      theList: []
    };
  },
  computed: {
    pdfList() {
      return this.theList;
    },
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    ...mapGetters({
      user: "user",
      category: "category"
    })
  },
  created() {
    this.fetchPdfs();
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
