<script>
import shopping from "../data/shopping.json";
export default {
  data() {
    return {
      products: null,
    };
  },

  mounted() {
    this.products = shopping.data;
  },
};
</script>
<template>
  <div>
    <PVButton
      class="new-button"
      label="New Item"
      icon="pi pi-plus"
      iconPos="left"
    />
    <OrderList v-model="products" listStyle="height:auto" dataKey="id">
      <template #header> Shopping List </template>
      <template #item="slotProps">
        <div class="product-item">
          <div class="image-container">
            <img src="../assets/item.png" alt="slotProps.item.name" />
          </div>
          <div class="product-list-detail">
            <h2 class="mb-2">{{ slotProps.item.name }}</h2>
          </div>
          <div class="checkbox-container">
            <h4 class="mb-2">Checked</h4>
            <CheckBox :binary="true" v-model="slotProps.item.checked" />
          </div>
          <PVButton
            class="p-button-danger p-button-sm delete-button"
            icon="pi pi-times"
            iconPos="left"
          />
        </div>
      </template>
    </OrderList>
  </div>
</template>

<style scoped>
.checkbox-container {
  text-align: center;
}

.new-button {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 70px;
  width: calc(100% - 70px);
}

.delete-button {
  margin-left: 2rem;
  margin-top: 1rem;
}
.product-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
}

img {
  width: 50px;
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

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.product-category {
  vertical-align: middle;
  line-height: 1;
  font-size: 0.875rem;
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
