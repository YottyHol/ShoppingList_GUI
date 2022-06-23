import PrimeVue from "primevue/config";
import OrderList from "primevue/orderlist";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Dialog from "primevue/Dialog";

export default function main(app) {
  app.use(PrimeVue);
  app.use(ConfirmationService);

  app.component("MainDialog", Dialog);
  app.component("ConfirmDialog", ConfirmDialog);
  app.component("CheckBox", Checkbox);
  app.component("PVButton", Button);
  app.component("OrderList", OrderList);
}
