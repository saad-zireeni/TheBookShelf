import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const createUsersAsync = createAsyncThunk(
  "User/createUsersAsync",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/AddNewUser",
        userData
      );
      localStorage.setItem("token", response.data.token);
      console.log("data Sent Successfully");
    } catch (error) {
      toast.error("User Already Registered");
      console.log(error);
    }
  }
);
export const checkUsersAsync = createAsyncThunk(
  "User/checkUsersAsync",
  async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:5000/LoginUser",
        userData
      );
      localStorage.setItem("token", response.data.token);
      console.log("data Sent Successfully");
    } catch (error) {
      toast.error("User Not Found");
      console.log(error);
    }
  }
);

const rootReducer = createSlice({
  name: "User",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        dateofbirth: action.payload.dateofbirth,
      };
      state.push(newUser);
    },
  },
  extraReducers: {},
});

export const { addUser } = rootReducer.actions;

export default rootReducer;
