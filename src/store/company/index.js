export default {
  namespace: true,
  state: {
    id: null,
    name: "",
    address: "",
    phone: "",
  },
  mutations: {
    setId(state, newId) {
      state.id = newId;
    },
    setName(state, newName) {
      state.name = newName;
    },
    setAddress(state, newAddress) {
      state.address = newAddress;
    },
    setPhone(state, newPhone) {
      state.phone = newPhone;
    },
  },
  getters: {
    getCompanyId: (state) => state.id,
    getCompanyName: (state) => state.name,
    getCompanyAddress: (state) => state.address,
    getCompanyPhone: (state) => state.phone,
  },
};
