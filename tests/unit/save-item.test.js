import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import shopping from "../../src/data/shopping.json";
import { mount } from "@vue/test-utils";
import { expect, beforeEach, describe, it } from "vitest";
import AddItem from "../../src/components/Add-Item.vue";
import ShopList from "../../src/components/Shop-List.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { vi } from "vitest";

describe("Add", () => {
  let actions;
  let state;
  let store;
  let addWrapper;
  let shopWrapper;
  beforeEach(() => {
    store = createStore({
      state() {
        return {
          products: shopping.data,
        };
      },
      actions: {
        saveItem: vi.fn(),
      },
    });

    actions = {
      "item/saveItem": vi.fn(),
    };
    state = {
      selected: vi.fn(),
      products: vi.fn(),
    };
    var storeObject = new Vuex.Store({
      modules: {
        item: {
          namespaced: true,
          state,
          actions: actions,
        },
      },
    });

    store = new Vuex.Store(storeObject);

    const $store = {
      dispatch: vi.fn(),
    };

    addWrapper = mount(AddItem, {
      store,
      global: {
        plugins: [store],
      },
      /* global: {
        mocks: {
          $store,
        },
      }, */
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
    const shopWrapper = mount(ShopList);
    await addWrapper.vm.$nextTick();
    const saveBtn = addWrapper.find("#add-save-btn");

    expect(addWrapper.find("#add-save-btn").exists()).toBe(true);
    await addWrapper.vm.$nextTick();
    //Allow mount() to run
    const itemComplete = addWrapper.find("#autocomplete");
    const priceInput = addWrapper.find("#price-input");
    //const saveBtn = addWrapper.find({ ref: "add-save-btn" });
    // expect(addWrapper.find("#add-save-btn").exists()).toBe(true);

    //set values
    itemComplete.element.value = "Test1";
    await itemComplete.trigger("input");
    priceInput.element.value = "3";
    await priceInput.trigger("input");
    await saveBtn.trigger("click");
    await addWrapper.vm.$nextTick();

    const shopList = shopWrapper.find("#product-list");
    expect(shopList.text()).toContain("Test1");
  });
});
