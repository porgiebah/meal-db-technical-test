import { STORE_CATEGORIES, STORE_MEALS, STORE_RECIPES } from "./actionTypes";

const initialState = {
    categories: [],
    meals: {},
    recipes: {},
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
      case STORE_MEALS: {
        return {
          ...state,
          meals: payload,
        };
      }
      case STORE_RECIPES: {
        return {
          ...state,
          recipes: payload,
        };
      }
      default:
        return state;
    }  
}

export default appReducer;
