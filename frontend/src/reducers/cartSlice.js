import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   theatre_id: "",
  showtime_date: "",
  movie_id: "",
  hall_id: "",
  showtime_id: "",
  seat_id_list: [],
  seat_price: "",
  payment_method: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      state.showtime_date = "";
      state.movie_id = "";
      state.hall_id = "";
      state.showtime_id = "";
      state.seat_id_list = [];
      state.seat_price = "";
      state.payment_method = "";
    },

    setShowDate(state, action) {
      state.showtime_date = action.payload;
      state.movie_id = "";
      state.hall_id = "";
      state.showtime_id = "";
      state.seat_id_list = [];
      state.seat_price = "";
      state.payment_method = "";
    },

    setMovie(state, action) {
      state.movie_id = parseInt(action.payload);
      state.hall_id = "";
      state.showtime_id = "";
      state.seat_id_list = [];
      state.seat_price = "";
      state.payment_method = "";
    },

    setShowDetail(state, action) {
      const infoArr = action.payload.split(",");

      state.showtime_id = parseInt(infoArr[0]);
      state.hall_id = parseInt(infoArr[1]);
      state.seat_price = parseInt(infoArr[2]);
      state.seat_id_list = [];
      state.payment_method = "";
    },

    setSeat(state, action) {
      if (state.seat_id_list.includes(action.payload)) {
        const tempArr = [...state.seat_id_list];
        const newSeats = tempArr.filter((seatId) => seatId !== action.payload);

        state.seat_id_list = [...newSeats];
      } else {
        state.seat_id_list = [...state.seat_id_list, action.payload];
      }

      state.payment_method = "";
    },

    setPaymentMethod(state, action) {
      state.payment_method = action.payload;
    },
  },
});

export const {
  setShowDate,
  setMovie,
  setShowDetail,
  setSeat,
  setPaymentMethod,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
