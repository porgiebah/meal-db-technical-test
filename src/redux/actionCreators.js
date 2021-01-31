import { STORE_CATEGORIES } from "./actionTypes";
import { baseUrl, endPoints } from '../constants';

const { categories, meals, recipes } = endPoints;

const makeUrl = (endPoint, params = '') => (baseUrl + endPoint + params);

const parseJson = res => res.json();

const storeCategories = (categories) => ({
    type: STORE_CATEGORIES,
    payload: categories,
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

export {
    retrieveCategories
}