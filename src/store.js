import Vue from "vue";
import Vuex from "vuex";
import { listAll, ref } from "firebase/storage";
import { storage } from "./firebase";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    file: {
      id: null,
      name: null,
      URL: null,
      data: null
    },
    category: {
      id: null,
      title: null,
      subtitle: null
    },
    dataStructure: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    file(state) {
      return state.file;
    },
    category(state) {
      return state.category;
    },
    dataStructure(state) {
      return state.dataStructure;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_FILE(state, file) {
      state.file = file;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_INITIAL_DATA_STRUCTURE(state, { folders, files }) {
      state.dataStructure = { folders: folders, files: files };
    }
  },
  actions: {
    loadDataStructure({ commit }, path = "/dokumenta/") {
      // TODO: cache list
      // Create a reference under which you want to list
      const listRef = ref(storage, `${path}`);

      // Find all the prefixes and items.
      listAll(listRef)
        .then(res => {
          const folders = [];
          const files = [];
          res.prefixes.forEach(folderRef => {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
            // console.info("one folder", folderRef.name);
            folders.push({
              id: folderRef.name,
              fullPath: folderRef.fullPath,
              title: folderRef.name,
              subtitle: "Опис фолдера..."
            });
          });
          res.items.forEach(itemRef => {
            // All the items under listRef.
            // console.info("one item", itemRef.name);
            switch (
              itemRef.name
                .split(".")
                .pop()
                .toLowerCase()
            ) {
              case "pdf":
                files.push({
                  id: itemRef.name,
                  fullPath: itemRef.fullPath,
                  title: itemRef.name,
                  type: "pdf",
                  subtitle: "Опис ПДФ датотеке..."
                });
                break;
              case "jpg":
              case "jpeg":
                files.push({
                  id: itemRef.name,
                  fullPath: itemRef.fullPath,
                  title: itemRef.name,
                  type: "jpg",
                  subtitle: "Опис ЈПГ датотеке..."
                });
                break;
              default:
                files.push({
                  id: itemRef.name,
                  fullPath: itemRef.fullPath,
                  title: itemRef.name,
                  type: "other",
                  subtitle: "Опис НЕПОЗНАНИЦЕ..."
                });
                break;
            }
          });
          commit("SET_INITIAL_DATA_STRUCTURE", {
            folders: folders,
            files: files
          });
          // console.info("loadInitialDataStructure", data);
        })
        .catch(error => {
          // console.error("eeer", error.name);
          // Uh-oh, an error occurred!
        });
    },
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    setFile({ commit }, file) {
      if (file) {
        commit("SET_FILE", file);
      } else {
        commit("SET_FILE", {
          id: null,
          name: null,
          URL: null,
          data: null
        });
      }
    },
    setCategory({ commit }, category) {
      if (category) {
        commit("SET_CATEGORY", category);
      } else {
        commit("SET_CATEGORY", {
          id: null,
          title: null,
          subtitle: null
        });
      }
    }
  }
});
