export default {
  namespace: true,
  state: {
    id: 1,
    email: "",
    name: "Angie Katherine",
    lastname: "Fierro Rojas",
    birthdate: "",
    address: "128 Gorge RD Newton",
    phone: "",
    abn: "34632148828",
    tax: "",
    bsb: '062033',
    acc: '010999518'
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
    getUserBsb: (state) => state.bsb,
    getUserAcc: (state) => state.acc,
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
    setBsb(state, newBsb) {
      state.bsb = newBsb;
    },
    setAcc(state, newAcc) {
      state.acc = newAcc;
    },
  },
  actions: {},
};
