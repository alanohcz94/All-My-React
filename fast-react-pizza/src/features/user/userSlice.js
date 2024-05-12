import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
// Thunks is a middleware where it seats between the dispatching and reducers itself (meaning it will do something to the dispatching before it reducers take it to the store)
// Redux is completely Synconis, They are not able to call async functions therefore we need to use Thunks
// createAsyncThunk recieves 2 things ('actionName', 'async function that returns a promise')
// action name refers to a action that needs to be made too
// This fetchAddress will then be the action creator function for the code

// Thunk Best practices get is a reserved key word for selectors
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
);
// createAsyncThunk will create 3 additonal action states
// 1 - Pending state, 2 - Fullifield state, 3 - Rejected state
// the 3 cases will need to be handed in the reducers

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "Unable to get current location. Please fill the Address Field";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state) => state.user.username;
