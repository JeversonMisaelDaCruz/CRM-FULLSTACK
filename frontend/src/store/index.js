// src/store/index.js
import { createStore } from "vuex";
import auth from "./auth/User";
import leads from "./leads";

const store = createStore({
  modules: {
    auth,
    leads,
  },
});

export default store;
