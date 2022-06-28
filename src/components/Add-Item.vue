<template>
  <MainDialog :visible="visible">
    <template #header>
      <h3>Add Items</h3>
    </template>

    <div class="form-contents">
      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <AutoComplete
            class="form-input"
            id="autocomplete"
            v-model="item"
            @change="updateItem"
            :suggestions="list"
            @complete="fetchData($event)"
            field="name"
          />
          <label id="item-label" for="autocomplete"> Item</label>
        </span>
      </div>
      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputNumber
            id="price-input"
            class="form-input"
            v-model="item.price"
            mode="currency"
            currency="GBP"
            locale="en-gb"
          />
          <label id="price-label" for="username">Price</label>
        </span>
      </div>
    </div>
    <div>
      <div id="footer">
        <PVButton
          @click="closeItem()"
          label="Close"
          icon="pi pi-times"
          class="p-button-text"
        />
      </div>
      <PVButton
        id="add-save-btn"
        ref="add-save-btn"
        @click="saveItem()"
        label="Save"
        icon="pi pi-check"
        autofocus
      />
    </div>
  </MainDialog>
</template>

<script>
import { debounce } from "lodash";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    //
  },
  props: { visible: Boolean },
  data() {
    return {
      item: { name: "", price: 0.0 },
      list: [],
      filteredItems: [],
      info: null,
    };
  },
  methods: {
    ...mapActions("item", ["setSelected"]),
    closeItem() {
      this.$emit("setVisible");
      this.item = { name: "", price: 0.0 };
    },
    updateItem(event) {
      this.item = { name: event.target.value.trim(), price: 0 };
    },
    saveItem() {
      this.setSelected(this.item);
      this.$emit("saveItem");
    },
    fetchData(event) {
      const data = debounce(() => {
        axios
          .get(
            `https://dev.tescolabs.com/grocery/products/?query=` +
              event.query +
              `&offset=0&limit=10`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "fb3bbf71931c4ad8b75c6a0688ef7d88",
              },
            }
          )
          .then(
            (response) => (this.list = response.data.uk.ghs.products.results)
          )
          .catch((error) => console.log(error));
      }, 600);

      data();
    },
  },
};
</script>

<style>
#footer {
  display: inline-block;
  padding-top: 2rem;
  padding-right: 2rem;
}
</style>
