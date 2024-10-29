import { createStore } from "vuex";
import auth from "./auth/User";

const store = createStore({
  modules: {
    auth,
  },
});

export default store;
