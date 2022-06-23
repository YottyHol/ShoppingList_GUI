<template>
  <div>
    <PVButton
      class="new-button"
      label="New Item"
      icon="pi pi-plus"
      iconPos="left"
      @Click="displayAdd()"
    />
    <OrderList v-model="products" listStyle="height:auto" dataKey="id">
      <template #header> Shopping List </template>
      <template #item="slotProps">
        <div class="product-item">
          <div class="image-container">
            <img src="../assets/item.png" alt="slotProps.item.name" />
          </div>
          <div class="product-list-detail">
            <h3 class="mb-2">{{ slotProps.item.name }}</h3>

            <h4 v-if="slotProps.item.cost != 0" class="mb-2">
              £{{ slotProps.item.cost }}
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
              @click="deleteItem(slotProps.item)"
            />
          </div>
        </div>
      </template>
    </OrderList>
    <ConfirmDialog></ConfirmDialog>

    <AddItem @setVisible="displayAdd" :visible="addPage" />
  </div>
</template>

<script>
import AddItem from "./Add-Item.vue";
import shopping from "../data/shopping.json";
export default {
  data() {
    return {
      products: null,
      addPage: false,
    };
  },
  components: {
    AddItem,
  },

  mounted() {
    this.products = shopping.data;
  },

  methods: {
    displayAdd() {
      this.addPage = !this.addPage;
    },
    deleteItem(item) {
      this.$confirm.require({
        message:
          "Are you sure you want to delete " + item.name + " from the list?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          const newProducts = this.products.filter((o) => {
            return o.code != item.code;
          });
          this.products = newProducts;
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
  },
};
</script>
<style scoped>
.checkbox-container {
  text-align: center;
  margin-right: 1rem;
}

.new-button {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 70px;
  width: calc(100% - 70px);
}

.action-button {
  max-width: 30px;
  height: 30px;
  margin: 0.1rem;
}
.product-item {
  display: flex;
  align-items: center;

  width: 100%;
}

img {
  width: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
}

.product-list-detail {
  flex: 1 1 0;
}

.product-list-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
