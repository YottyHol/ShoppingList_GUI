<template>
  <div>
    <PVButton
      class="new-button"
      label="New Item"
      icon="pi pi-plus"
      iconPos="left"
      @Click="displayAdd()"
    />
    <OrderList v-model="orderProducts" listStyle="height:auto" dataKey="id">
      <template #header> Shopping List </template>
      <template #item="slotProps">
        <div class="product-item">
          <div class="image-container">
            <img src="../assets/item.png" alt="slotProps.item.name" />
          </div>
          <div id="product-list" class="product-list-detail">
            <h3 class="mb-2">{{ slotProps.item.name }}</h3>

            <h4 v-if="slotProps.item.price != 0" class="mb-2">
              £{{ slotProps.item.price }}
            </h4>
          </div>
          <div class="checkbox-container">
            <CheckBox :binary="true" v-model="slotProps.item.checked" />
          </div>
          <div class="product-list-action">
            <PVButton
              class="p-button-danger action-button"
              icon="pi pi-times"
              iconPos="left"
              @click="deleteDialog(slotProps.item)"
            />
          </div>
        </div>
      </template>
    </OrderList>
    <ConfirmDialog></ConfirmDialog>

    <AddItem @setVisible="displayAdd" @saveItem="save" :visible="addPage" />
  </div>
</template>

<script>
import AddItem from "./Add-Item.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      addPage: false,
      orderProducts: null,
    };
  },
  components: {
    AddItem,
  },

  watch: {
    products() {
      if (this.products) {
        this.orderProducts = this.products;
      }
    },
  },
  mounted() {
    this.getItems();
  },
  computed: {
    ...mapState("item", ["selected", "products"]),
  },
  methods: {
    ...mapActions("item", ["saveItem", "getItems", "deleteItem"]),
    save() {
      this.saveItem();
      this.addPage = !this.addPage;
    },
    displayAdd() {
      this.addPage = !this.addPage;
    },

    deleteDialog(item) {
      this.$confirm.require({
        message:
          "Are you sure you want to delete " + item.name + " from the list?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteItem(item.code);
        },
      });
    },
  },
};
</script>
<style scoped>
img {
  width: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
}

@media screen and (max-width: 981px) {
  .new-button {
    margin: 2rem;
  }

  .product-item {
    flex-wrap: wrap;

    .image-container {
      width: 100%;
      text-align: center;
    }

    img {
      margin: 0 0 1rem 0;
      width: 100px;
    }
  }
}
</style>
