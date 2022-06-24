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
            :suggestions="list"
            @complete="fetchData($event)"
            field="name"
          />
          <label for="autocomplete"> Item</label>
        </span>
      </div>
      <div class="field col-12 md:col-4">
        <span class="p-float-label">
          <InputNumber
            class="form-input"
            v-model="item.price"
            mode="currency"
            currency="GBP"
            locale="en-gb"
          />
          <label for="username">Cost</label>
        </span>
      </div>
    </div>
    <template #footer>
      <PVButton
        @click="closeItem()"
        label="Close"
        icon="pi pi-times"
        class="p-button-text"
      />
      <PVButton @click="saveItem()" label="Save" icon="pi pi-check" autofocus />
    </template>
  </MainDialog>
</template>

<script>
//import { debounce } from "lodash";
import axios from "axios";
export default {
  props: { visible: Boolean },
  data() {
    return {
      item: { name: "", price: 0 },

      filteredItems: [],
      info: null,
    };
  },
  methods: {
    closeItem() {
      this.$emit("setVisible");
    },

    fetchData(event) {
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
        .then((response) => (this.list = response.data.uk.ghs.products.results))
        .catch((error) => console.log(error));
    },
  },
  mounted() {},
};
</script>

<style>
.p-inputtext {
  width: 100%;
}
.p-dialog .p-dialog-header .p-dialog-header-icon:last-child {
  visibility: hidden;
}

.form-contents > *:not(:last-child) {
  display: block;
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
