export default {
  namespace: true,
  state: {
    id: null,
    name: "",
    adreess: "",
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
  },
  actions: {},
  getters: {
    getBuildingId: (state) => state.id,
    getBuildingName: (state) => state.name,
    getBuildingAddress: (state) => state.address,
  },
};
