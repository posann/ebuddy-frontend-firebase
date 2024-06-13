import { combineReducers } from "redux";
import { authReducer } from "./reducers";

const updateReducers = combineReducers({
  auth: authReducer,
});

export default updateReducers;
