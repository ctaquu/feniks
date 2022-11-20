<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Музика</h1>
            <h4>Музика за душу!!</h4>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="features text-center">
            <div class="files-list">
              <h3>Списак Песама {{ this.fileList.length }}</h3>
              <div v-if="isTopLevelFileList">
                <md-button
                  class="md-lg folder"
                  @click="handleOpenFolder('osnovna')"
                  >Osnovna
                </md-button>
                <md-button
                  class="md-lg folder"
                  @click="handleOpenFolder('damjan.veljkovic@gmail.com')"
                  >damjan.veljkovic
                </md-button>
              </div>
              <div v-else>
                <md-button
                  class="xs-xs md-primary song"
                  @click="handleBackToRootFolder"
                  >Назад
                </md-button>
                <div
                  class="song-container"
                  v-bind:key="file.name"
                  v-for="file in fileList"
                >
                  <md-button
                    class="xs-xs song"
                    @click="handleAddSongToQueue(file)"
                    >{{ file.name }}
                  </md-button>
                </div>
              </div>
            </div>
            <div class="player">
              <vue-plyr ref="plyr" :disabled="queueList.length > 0">
                <audio controls crossorigin></audio>
              </vue-plyr>
            </div>
            <div class="queue">
              <div class="playlist-header">
                <h3>Плејлиста</h3>
                <md-button @click="handleClearPlaylist" class="song">
                  <span>Уклони све</span>
                </md-button>
              </div>
              <div
                class="song-container"
                :class="{ playing: currentSong.id === song.id }"
                v-bind:key="song.id"
                v-for="song in queueList"
              >
                <md-button @click="handlePlaySong(song)" class="song">
                  <span>{{ song.ref.name }}</span>
                </md-button>
                <md-button
                  @click="handleRemoveSongFromQueue(song)"
                  class="md-icon-button md-accent md-info"
                >
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Vue from "vue";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

Vue.use(VuePlyr, {
  plyr: {
    // enabled: false,
    controls: [
      // "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      // "captions",
      "settings"
      // "pip",
      // "airplay",
      // "fullscreen"
    ],
    settings: ["captions", "quality", "speed", "loop"],
    autoplay: false
  }
});

export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/feniks_logo.jpg")
    },
    music: {
      type: String,
      default: require("@/assets/music/sample.ogg")
    }
  },
  data() {
    return {
      isTopLevelFileList: true,
      fileList: [],
      queueData: {},
      currentSong: {
        id: null,
        ref: null
      }
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    player() {
      return this.$refs.plyr.player;
    },
    queueList() {
      return Object.entries(this.queueData).map(song => {
        return {
          id: song[0],
          ref: song[1]
        };
      });
    }
  },
  created() {
    this.fetchFiles().then(() => {
      this.fileList.map(file => {
        this.handleAddSongToQueue(file.ref);
      });
    });
  },
  mounted() {
    // console.log("whole player:", this.player);
    // this.player.on("play", e => console.log("play event fired", e));
    this.player.on("ended", e => {
      // const currentIndex = this.queueList.indexOf(this.currentSong);
      // const nextIndex = (currentIndex + 1) % this.queueList.length;
      // const nextSong = this.queueList[nextIndex];
      // if (nextSong && currentIndex !== nextIndex) {
      //   this.handlePlaySong(nextSong);
      // }
      // const currentSong = this.queueList.find(s => {
      //   return s.id === this.currentSong.id;
      // });
      const songIDs = this.queueList.map(qq => qq.id);
      const currentIndex = songIDs.indexOf(this.currentSong.id);
      const nextIndex = currentIndex + 1;
      let keys = Object.keys(this.queueData);
      // let nextIndex = keys.indexOf(this.currentSong) + 1;
      // let nextItem = keys[nextIndex];
      const nextSong = this.queueList[nextIndex];
      if (nextSong && currentIndex !== nextIndex) {
        this.handlePlaySong(nextSong);
      }

      // const nextIndex = (currentIndex + 1) % this.queueList.length;
      // const nextSong = this.queueList[nextIndex];
      // if (nextSong && currentIndex !== nextIndex) {
      //   this.handlePlaySong(nextSong);
      // }
    });
  },
  methods: {
    async handleOpenFolder(id) {
      this.isTopLevelFileList = false;
      await this.fetchFiles(`muzika/${id}`);
    },
    handleBackToRootFolder() {
      this.isTopLevelFileList = true;
      this.fileList = [];
    },
    handleAddSongToQueue(ref) {
      const tmpQD = { ...this.queueData };
      tmpQD[Date.now()] = ref;

      this.queueData = tmpQD;
      // this.$refs.plyr.enabled = true;
    },
    handleRemoveSongFromQueue(song) {
      const tmpQD = { ...this.queueData };
      delete tmpQD[song.id];
      // if (song.id === this.currentSong.id) {
      //   this.player.stop();
      // }
      this.queueData = tmpQD;
      //TODO: remove source if no more songs in the queue
      if (this.queueData.length < 1) {
        this.player.source = null;
      }
    },
    handleClearPlaylist() {
      this.queueData = {};
    },
    async handlePlaySong(song) {
      // console.info("handlePlaySong", name);
      this.currentSong = song;
      await getDownloadURL(song.ref)
        .then(url => {
          this.player.source = {
            type: "audio",
            title: "Example title",
            sources: [
              {
                src: url,
                // src:
                //   "https://firebasestorage.googleapis.com/v0/b/biblioteka-feniks.appspot.com/o/muzika%2Fosnovna%2Fdragoslav_1.mp3?alt=media&token=30971457-aff0-46bc-b071-1f038ec771fc",
                type: "audio/mp3"
              }
            ]
          };
          this.player.play();
        })
        .catch(error => {
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
    },
    async fetchFiles(path = "muzika/osnovna") {
      const storage = getStorage();
      const listRef = ref(storage, path);
      this.fileList = [];
      listAll(listRef)
        .then(res => {
          res.items.map(i => {
            try {
              this.fileList.push(i);
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
  }
};
</script>

<style lang="scss" scoped>
.player {
  padding: 10px;
}

.files-list {
  text-align: left;
  //display: flex;
  //flex-wrap: wrap;
  //justify-content: space-between;
  .folder {
    //background-color: pink;
  }
}

.song-container {
  border-bottom: #acb0c7 1px solid;
  border-top: #acb0c7 1px solid;
  display: flex;
  justify-content: space-between;
  .song {
    cursor: pointer;
  }
  .delete-song {
  }
}

.queue {
  text-align: left;

  //.song-container {
  //  border-bottom: #acb0c7 1px solid;
  //  border-top: #acb0c7 1px solid;
  //  display: flex;
  //  justify-content: space-between;
  //  .song {
  //    cursor: pointer;
  //  }
  //  .delete-song {
  //  }
  //}

  .song:hover {
    background-color: #b57fd2;
  }

  .playing {
    background-color: #acb0c7;
  }

  .playlist-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
