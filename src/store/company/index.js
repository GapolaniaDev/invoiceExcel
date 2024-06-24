export default {
  namespace: true,
  state: {
    id: null,
    name: "Corporate Clean Property Services",
    address: "128 Waymouth St",
    phone: "",
    postcode: "5000",
    city: "Adelaide",
    stateA: "SA",
    state: "",
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
    setPostcode(state, newPostcode) {
      state.postcode = newPostcode;
    },
    setCity(state, newCity) {
      state.city = newCity;
    },
    setStateA(state, newstateA) {
      state.stateA = newstateA;
    },
  },
  getters: {
    getCompanyId: (state) => state.id,
    getCompanyName: (state) => state.name,
    getCompanyAddress: (state) => state.address,
    getCompanyPhone: (state) => state.phone,
    getPostcode: (state) => state.postcode,
    getCity: (state) => state.city,
    getStateA: (state) => state.stateA,
  },
};
