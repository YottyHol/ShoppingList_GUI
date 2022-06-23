<template>
  <MainDialog :visible="visible">
    <template #header>
      <h3>Find Related Items</h3>
    </template>

    Content

    <template #footer>
      <PVButton label="No" icon="pi pi-times" class="p-button-text" />
      <PVButton
        @click="closeBasic()"
        closeOnEscape="true"
        label="Close"
        icon="pi pi-check"
        autofocus
      />
    </template>
  </MainDialog>
</template>

<script>
export default {
  props: { visible: Boolean },
  data() {
    return {
      displayBasic: false,
    };
  },
  methods: {
    closeBasic() {
      this.$emit("setVisible");
    },
    fetchData() {},
  },
  mounted() {
    this.fetchData;
  },
};
</script>

<style>
.p-dialog .p-dialog-header .p-dialog-header-icon:last-child {
  visibility: hidden;
}
</style>
