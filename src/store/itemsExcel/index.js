export default {
  namespace: true,
  state: {
    date: "14/07/1996",
    room: "",
    type: "",
    description: "",
    time: "",
    amount: "",
  },
  getters: {
    getDate: state => {
        return state.date;
    },
    getRoom: state => {
        return state.room;
    },
    getType: state => {
        return state.type;
    },
    getDescription: status => {
        return status.description;
    },
    getTime: status => {
        return status.Time;
    },
    getAmount: status => {
        return status.amount;
    }
  },
  mutations: {
    setDate: (state, date) => {
        state.date = date;
    },
    setRoom: (state, room) => {
        state.room = room;
    },
    setType: (state, type) => {
        state.type = type;
    },
    setDescription: (state, description) => {
        state.description = description;
    },
    setTime: (state, time) => {
        state.time = time;
    },
    setAmount: (state, amount) => {
        state.amount = amount;
    }
  },
  actions: {},
};
