import PrimeVue from "primevue/config";
import OrderList from "primevue/orderlist";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

export default function main(app) {
  app.use(PrimeVue);

  app.component("CheckBox", Checkbox);
  app.component("PVButton", Button);
  app.component("OrderList", OrderList);
}
