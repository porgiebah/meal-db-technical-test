import { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import { getRecipe } from '../../redux/selectors';
import appStyles from '../../appStyles';

const { recipeStyles: styles } = appStyles;

class Recipe extends Component {
  static propTypes = {
    // State values
    meals: PropTypes.object || undefined,
    recipe: PropTypes.object || undefined,
    // Navigation props
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { meals, history } = this.props;

    if (Object.keys(meals).length === 0) {
        history.push('/');
    }
  }

  renderIngredients = (recipe) => {
    const ingredientMeasuresArr = [];

    for (let index = 1; index <= 20; index++) {
      const measurement = recipe[`strMeasure${index}`];
      const ingredient = recipe[`strIngredient${index}`];

      if (measurement && ingredient) {
        ingredientMeasuresArr.push(<p key={index}>{measurement + ' ' + ingredient}</p>);
      }
    }

    return ingredientMeasuresArr;
  };

  renderLeftColumn = (strMealThumb, strYoutube, strSource) => {
    return (
      <div style={styles.leftColumnContainer}>
        <img src={strMealThumb} style={styles.image} alt='img' />
        
        <div style={styles.leftColumnTextContainer}>
          {strYoutube && <a href={strYoutube} style={styles.leftColumnText}>YouTube tutorial</a>}
          {strSource && <a href={strSource} style={styles.leftColumnText}>Recipe source</a>}
        </div>
      </div>
    );
  }

  renderRightColumn = (strMeal, strInstructions, recipe) => {
    return (
      <div style={styles.rightColumnContainer}>
        <h1>{strMeal}</h1>

        <h2>Instructions</h2>
        <ReactMarkdown source={strInstructions}/>

        <h2>Ingredients</h2>
        {this.renderIngredients(recipe)}
      </div>
    );
  };

  render() {
    const { recipe } = this.props;
    
    if (!recipe) {
        return null;
    }

    const { strMealThumb, strMeal, strInstructions, strYoutube, strSource } = recipe;

    return (
        <div style={styles.rootContainer}>
            {this.renderLeftColumn(strMealThumb, strYoutube, strSource )}
            {this.renderRightColumn(strMeal, strInstructions, recipe )}
        </div>
    );
  };
}

const mapStateToProps = (state, props) => {
  return {
    meals: state.meals,
    recipe: getRecipe(state, props),
  }
}

export default connect(mapStateToProps)(Recipe);