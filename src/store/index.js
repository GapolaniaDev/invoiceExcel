import { createStore } from "vuex";
import itemExcel from "./itemExcel/index";
import mainExcel from "./mainExcel/index";
import employee from "./employee/index";
import company from "./company/index";
import building from "./building/index";

const store = createStore({
  modules: {
    mainExcel: mainExcel,
    employee: employee,
    company: company,
    building: building,
    itemExcel: itemExcel,
  },
});

export default store;
