import { createSelector } from 'reselect'

const getMealsByCategory = (state, props) => state.meals[props.match.params.id];

const getMeals = createSelector(
  [getMealsByCategory],
  (meals) => meals
);

const getRecipeById = (state, props) => state.recipes[props.match.params.id];

const getRecipe = createSelector(
  [getRecipeById],
  (recipe) => recipe
)

export{ getMeals, getRecipe };
