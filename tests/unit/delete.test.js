import { createStore } from "vuex";
import shopping from "../../src/data/shopping.json";
import { mount, config } from "@vue/test-utils";
import { expect, beforeEach, describe, it } from "vitest";
import ShopList from "../../src/components/Shop-List.vue";
import { vi } from "vitest";
import PrimeVue from "primevue/config";

config.plugins.VueWrapper.install(PrimeVue);

describe("Delete", () => {
  let store;
  let shopWrapper;
  beforeEach(() => {
    store = createStore({
      modules: {
        item: {
          namespaced: true,
          state: {
            products: shopping.data,
          },
          actions: {
            saveItem: vi.fn(),
          },
        },
      },
    });

    shopWrapper = mount(ShopList, {
      store,
      global: {
        plugins: [store],
      },
    });
  });

  it("delete button exists", async () => {
    const deleteBtn = shopWrapper.find("#delete-button");
    expect(deleteBtn.exists()).toBe(true);
  });

  it("Items are deleted", async () => {
    expect(store.state.item.products.length).toBe(10);
    const deleteMBtn = shopWrapper.findAll("#delete-button").at(0);
    await deleteMBtn.trigger("click");
    const deleteBtn = shopWrapper.find(
      "class=p-button p-component p-confirm-dialog-accept"
    );

    await deleteBtn.trigger("click");
    await shopWrapper.vm.$nextTick();

    expect(store.state.item.products.length).toBe(0);
  });
});
