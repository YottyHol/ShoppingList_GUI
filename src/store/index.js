import { createStore } from "vuex";
import item from "./modules/item";

const store = createStore({
  modules: { item },
});

export default store;
