import { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { retrieveRecipe } from '../../redux/actionCreators';
import { getMeals } from '../../redux/selectors';
import ListItem from '../../components/ListItem/ListItem';
import appStyles from '../../appStyles';

const { listStyles: styles } = appStyles;

class Meals extends Component {
  static propTypes = {
    // State values
    categories: PropTypes.array || undefined,
    meals: PropTypes.array || undefined,
    // Redux actions
    retrieveRecipe: PropTypes.func.isRequired,
    // Navigation props
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { categories, history } = this.props;

    if (categories.length === 0) {
        history.push('/');
    }
  }

  getRecipe = (mealId) => {
    const { retrieveRecipe, history } = this.props;
    retrieveRecipe(mealId);
    history.push("/Recipe/" + mealId);

  }

  renderItem = (item) => {
    const { strMealThumb, strMeal, idMeal } = item;
    return (
      <ListItem imageUrl={strMealThumb} title={strMeal} onPress={this.getRecipe} text='Click to view recipe' id={idMeal} key={idMeal}/>
    );
  };

  render() {
    const { meals } = this.props;
    
    if (!meals) {
        return null;
    }

    const items = meals.map((item) => this.renderItem(item));
    return (
        <ul style={styles.listStyles}>
          {items}
        </ul>
    );
  };
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    meals: getMeals(state, props),
  }
}

const mapDispatchToProps = { retrieveRecipe }

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
export { Meals as UnwrappedMeals }; 
