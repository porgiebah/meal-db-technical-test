import { STORE_CATEGORIES, STORE_MEALS, STORE_RECIPES } from "./actionTypes";
import { baseUrl, endPoints } from '../constants';

const { categories, meals, recipes } = endPoints;

const makeUrl = (endPoint, params = '') => (baseUrl + endPoint + params);

const parseJson = res => res.json();

const storeCategories = (categories) => ({
    type: STORE_CATEGORIES,
    payload: categories,
});

const storeMeals = (meals) => ({
    type: STORE_MEALS,
    payload: meals,
});

const storeRecipes = (recipes) => ({
    type: STORE_RECIPES,
    payload: recipes,
});

const retrieveCategories = function() {
    return async function (dispatch, getState) {
        const state = getState();

        if (state.categories.length !== 0) {
            return;
        }

        const categoriesResponse = await fetch(makeUrl(categories)).then(parseJson);
        dispatch(storeCategories(categoriesResponse.categories));
    }
};

const retrieveMeal = function(categoryKey) {
    return async function (dispatch, getState) {
        const state = getState();

        if (state.meals[categoryKey]) {
            return;
        }

        const mealsResponse = await fetch(makeUrl(meals, categoryKey)).then(parseJson);

        const mealsObj = {
            ...state.meals,
            [categoryKey]: mealsResponse.meals,
        };

        dispatch(storeMeals(mealsObj));
    }
};

const retrieveRecipe = function(mealID) {
    return async function (dispatch, getState) {
        const state = getState();

        if (state.recipes[mealID]) {
            return;
        }

        const recipesResponse = await fetch(makeUrl(recipes, mealID)).then(parseJson);

        const recipesObj = {
            ...state.recipes,
            [mealID]: recipesResponse.meals[0],
        };

        dispatch(storeRecipes(recipesObj));
    }
};

export {
    retrieveCategories,
    retrieveMeal,
    retrieveRecipe,
}