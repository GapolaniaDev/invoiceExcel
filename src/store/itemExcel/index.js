export default {
  namespace: true,
  state: {
    date: "14/07/1996",
    room: "91",
    type: "",
    description: "",
    time: "",
    amount: "",
    page: 1500,
  },
  getters: {
    getDate: (state) => state.date,
    getRoom: (state) => state.room,
    getType: (state) => state.type,
    getDescription: (state) => state.description,
    getTime: (state) => state.time,
    getAmount: (state) => state.amount,
    getPage: (state) => state.page,
  },

  mutations: {
    setDate(state, newDate) {
      state.date = newDate;
    },
    setRoom(state, newRoom) {
      state.room = newRoom;
    },
    setType(state, newType) {
      state.type = newType;
    },
    setDescription(state, newDescription) {
      state.description = newDescription;
    },
    setTime(state, newTime) {
      state.time = newTime;
    },
    setAmount(state, newAmount) {
      state.amount = newAmount;
    },
    setPage(state, newPage) {
      state.page = newPage;
    },
  },
  actions: {},
};
