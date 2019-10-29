import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()))
);

export default store;
