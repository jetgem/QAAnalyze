import { createStore } from "redux";
import { scanner as reducer } from "../reducer/reducer";
const store = createStore(reducer);
export default store;
