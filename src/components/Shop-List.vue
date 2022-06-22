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
  <OrderList v-model="products" listStyle="height:auto" dataKey="id">
    <template #header> Shopping List </template>
    <template #item="slotProps">
      <div class="product-item">
        <div class="image-container">
          <img src="../assets/item.png" :alt="slotProps.item.name" />
        </div>
        <div class="product-list-detail">
          <h2 class="mb-2">{{ slotProps.item.name }}</h2>
        </div>
      </div>
    </template>
  </OrderList>
</template>

<style scoped>
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

@media screen and (max-width: 576px) {
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
