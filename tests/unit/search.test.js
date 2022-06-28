import { createStore } from "vuex";
import shopping from "../../src/data/shopping.json";
import { mount, config } from "@vue/test-utils";
import { expect, beforeEach, describe, it } from "vitest";
import AddItem from "../../src/components/Add-Item.vue";
import ShopList from "../../src/components/Shop-List.vue";
import { vi } from "vitest";
import PrimeVue from "primevue/config";

config.plugins.VueWrapper.install(PrimeVue);

describe("Search", () => {
  let store;
  let addWrapper;
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

    addWrapper = mount(AddItem, {
      store,
      global: {
        plugins: [store],
      },
    });

    shopWrapper = mount(ShopList, {
      store,
      global: {
        plugins: [store],
      },
    });
  });

  it("Search list populates", async () => {
    const itemComplete = addWrapper.find("#autocomplete");
    itemComplete.element.innerHTML = "T";
    await shopWrapper.vm.$nextTick();
    expect(shopWrapper.find("role=option").exists()).toBe(true);
  });
});
