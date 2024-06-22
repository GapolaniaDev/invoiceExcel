export default {
  namespace: true,
  state: {
    id: null,
    email: "",
    name: "",
    lastname: "",
    birthdate: "",
    address: "",
    phone: "",
    abn: "",
    tax: "",
  },
  getters: {
    getUserId: (state) => state.id,
    getUserEmail: (state) => state.email,
    getUserName: (state) => state.name,
    getUserLastname: (state) => state.lastname,
    getUserBirthdate: (state) => state.birthdate,
    getUserAddress: (state) => state.address,
    getUserPhone: (state) => state.phone,
    getUserAbn: (state) => state.abn,
    getUserTax: (state) => state.tax,
  },
  mutations: {
    setId(state, newId) {
      state.id = newId;
    },
    setEmail(state, newEmail) {
      state.email = newEmail;
    },
    setName(state, newName) {
      state.name = newName;
    },
    setLastname(state, newLastname) {
      state.lastname = newLastname;
    },
    setBirthdate(state, newBirthdate) {
      state.birthdate = newBirthdate;
    },
    setAddress(state, newAddress) {
      state.address = newAddress;
    },
    setPhone(state, newPhone) {
      state.phone = newPhone;
    },
    setAbn(state, newAbn) {
      state.abn = newAbn;
    },
    setTax(state, newTax) {
      state.tax = newTax;
    },
  },
  actions: {},
};
