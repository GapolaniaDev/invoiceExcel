export default {
  namespace: true,
  state: {
    invioceNumer: null,
    user: {},
    company: {},
    building: {},
    startDate: "",
    endDate: "",
    items: [],
  },
  mutations: {
    // Mutaciones para modificar el state del módulo principal
    setInvoiceNumber(state, newNumber) {
      state.invioceNumber = newNumber;
    },
    setUser(state, newUser) {
      state.user = newUser;
    },
    setCompany(state, newCompany) {
      state.company = newCompany;
    },
    setBuilding(state, newBuilding) {
      state.building = newBuilding;
    },
    setStartDate(state, newStartDate) {
      state.startDate = newStartDate;
    },
    setEndDate(state, newEndDate) {
      state.endDate = newEndDate;
    },
    setItems(state, newItems) {
      state.items = newItems;
    },
    // Otras mutaciones aquí
  },
  actions: {
    // Acciones para realizar operaciones asincrónicas relacionadas con el módulo principal
  },
  getters: {
    getInvoiceNumber: (state) => state.invioceNumber,
    getUser: (state) => state.user,
    getCompany: (state) => state.company,
    getBuilding: (state) => state.building,
    getStartDate: (state) => state.startDate,
    getEndDate: (state) => state.endDate,
    getItems: (state) => state.items,
  },
};
