import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AddItem from "../../src/components/Add-Item.vue";

test("Add dialog renders inputs", async () => {
  const wrapper = shallowMount(AddItem);
  await wrapper.vm.$nextTick();
  const itemLabel = wrapper.find("#item-label");
  const priceLabel = wrapper.find("#price-label");
  expect(itemLabel.text()).toContain("Item");
  expect(priceLabel.text()).toContain("Price");
});
