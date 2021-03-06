import { createStore } from "vuex";
import shopping from "../../src/data/shopping.json";
import { mount, config } from "@vue/test-utils";
import { expect, beforeEach, describe, it } from "vitest";
import AddItem from "../../src/components/Add-Item.vue";
import ShopList from "../../src/components/Shop-List.vue";
import { vi } from "vitest";
import PrimeVue from "primevue/config";

config.plugins.VueWrapper.install(PrimeVue);

describe("Add", () => {
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

  it("Add dialog renders inputs", async () => {
    //Allow mount() to run
    await addWrapper.vm.$nextTick();
    const itemLabel = addWrapper.find("#item-label");
    const priceLabel = addWrapper.find("#price-label");
    expect(itemLabel.text()).toContain("Item");
    expect(priceLabel.text()).toContain("Price");
  });

  it("Shopping List is updated", async () => {
    expect(store.state.item.products.length).toBe(10);
    await addWrapper.vm.$nextTick();
    const saveBtn = addWrapper.find("#add-save-btn");

    expect(addWrapper.find("#add-save-btn").exists()).toBe(true);
    await addWrapper.vm.$nextTick();
    //Allow mount() to run
    const itemComplete = addWrapper.find("#autocomplete");
    const priceInput = addWrapper.find("#price-input");

    //set values
    itemComplete.element.innerHTML = "Test1";
    await itemComplete.trigger("Test1");
    priceInput.element.innerHTML = 3;
    await priceInput.trigger("input");
    await saveBtn.trigger("click");
    await shopWrapper.vm.$nextTick();

    expect(store.state.item.products.length).toBe(11);
  });
});
