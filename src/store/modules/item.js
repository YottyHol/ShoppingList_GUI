import shopping from "../../data/shopping.json";
export default {
  namespaced: true,
  state: { selected: null, products: null },
  mutations: {
    setSelected(state, data) {
      state.selected = data;
    },
    setProducts(state, data) {
      state.products = data;
    },
  },
  actions: {
    getItems({ commit }) {
      commit("setProducts", shopping.data);
    },
    saveItem({ state }) {
      state.products.splice(0, 0, state.selected);
    },
    deleteItem({ state, commit }, code) {
      const newProducts = state.products.filter((o) => {
        return o.code != code;
      });
      commit("setProducts", newProducts);
    },
    setSelected({ commit }, selected) {
      commit("setSelected", selected);
    },
    setProducts({ commit }, products) {
      commit("setProducts", products);
    },
  },
};
