import { STORE_CATEGORIES } from "./actionTypes";

const initialState = {
    categories: [],
};

const appReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case STORE_CATEGORIES: {
        return {
          ...state,
          categories: payload,
        };
      }
      default:
        return state;
    }  
}

export default appReducer;
