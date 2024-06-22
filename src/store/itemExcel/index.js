export default {
  namespace: true,
  state: {
    id: null,
    date: "",
    room: "",
    type: "",
    description: "",
    time: "",
    amount: "",
  },
  getters: {
    getId: (state) => state.id,
    getDate: (state) => state.date,
    getRoom: (state) => state.room,
    getType: (state) => state.type,
    getDescription: (state) => state.description,
    getTime: (state) => state.time,
    getAmount: (state) => state.amount,
  },

  mutations: {
    setId(state, newId) {
      state.id = newId;
    },
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

    setDefaultItem(state) {
      state.id = null;
      state.date = "";
      state.room = "";
      state.type = "";
      state.description = "";
      state.time = "";
      state.amount = "";
    },

    setItem(state, newItem) {
      state.id = newItem.id;
      state.date = newItem.date;
      state.room = newItem.room;
      state.type = newItem.type;
      state.description = newItem.description;
      state.time = newItem.time;
      state.amount = newItem.amount;
    },
  },
  actions: {},
};
