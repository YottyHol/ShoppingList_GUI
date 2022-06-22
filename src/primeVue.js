import PrimeVue from "primevue/config";
import Menubar from "primevue/menubar";
import Card from "primevue/card";
import Panel from "primevue/panel";
import OrderList from 'primevue/orderlist';

export default function main(app) {
  app.use(PrimeVue);
  app.use(Card);


  app.component("OrderList", OrderList);
  app.component("menu-bar", Menubar);
  app.component("card-co", Card);
  app.component("panel-co", Panel);
}
