import shopping from "../../data/shopping.json";
export default {
  namespaced: true,
  state: { selected: null },
  mutations: {
    setSelected(state, data) {
      state.selected = data;
    },
  },
  actions: {
    saveItem({ state }) {
      console.log(state.selected);
      shopping.data.push(state.selected);
    },
    setSelected({ commit }, selected) {
      commit("setSelected", selected);
    },
  },
};
