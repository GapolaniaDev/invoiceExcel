import { createStore } from 'vuex';
import itemsExcel from './itemsExcel/index'; 
const store = createStore({
  modules: {
    itemsExcel: itemsExcel 
  }
});

export default store;