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
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.applySuggestions = debounce((q) => {
      this.list = this.suggestionsFromList(q);
    }, 200);
  },
  props: { visible: Boolean },
  computed: {
    ...mapState("item", ["products"]),
  },
  data() {
    return {
      increment: 0,
      item: { code: 0, name: "", price: 0.0 },
      list: [],
      filteredItems: [],
      info: null,
    };
  },
  methods: {
    ...mapActions("item", ["setSelected"]),
    closeItem() {
      this.$emit("setVisible");
      this.item = { code: 0, name: "", price: 0.0 };
    },
    updateItem(event) {
      this.item = {
        code: this.increment++,
        name: event.target.value.trim(),
        price: 0,
      };
    },
    saveItem() {
      this.setSelected(this.item);
      this.$emit("saveItem");
    },
    suggestionsFromList(query) {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      const rows = Array.isArray(this.products) ? this.products : [];
      const seen = new Set();
      const out = [];
      for (const p of rows) {
        const name = (p.name || "").trim();
        if (!name.toLowerCase().includes(q)) continue;
        const key = name.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        const price = Number.parseFloat(p.price);
        out.push({
          name,
          code: p.code,
          price: Number.isFinite(price) ? price : 0,
        });
        if (out.length >= 15) break;
      }
      return out;
    },
    fetchData(event) {
      const q = (event.query || "").trim();
      if (!q) {
        this.list = [];
        return;
      }
      this.applySuggestions(q);
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
