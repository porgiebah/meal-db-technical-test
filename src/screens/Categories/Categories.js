import { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { retrieveCategories, retrieveMeal } from '../../redux/actionCreators';
import ListItem from '../../components/ListItem/ListItem';
import appStyles from '../../appStyles';

const { listStyles: styles } = appStyles;

class Categories extends Component {
  static propTypes = {
    // State values
    categories: PropTypes.array.isRequired,
    // Redux actions
    retrieveCategories: PropTypes.func.isRequired, 
    retrieveMeal: PropTypes.func.isRequired,
    // Navigation props
    history: PropTypes.object.isRequired,

  };

  componentDidMount() {
    this.props.retrieveCategories();
  }

  getMeals = (categoryKey) => {
    const { retrieveMeal, history } = this.props;
    retrieveMeal(categoryKey);
    history.push("/Meals/" + categoryKey);
  }

  renderItem = (item) => {
    const { strCategoryThumb, strCategory, strCategoryDescription } = item;
    return (
        <ListItem imageUrl={strCategoryThumb} title={strCategory} onPress={this.getMeals} text={strCategoryDescription} id={strCategory} key={strCategory}/>
    );
  };

  render() {
    const items = this.props.categories.map((item) => this.renderItem(item));
    return (
        <ul style={styles.listStyles}>
          {items}
        </ul>
    );
  };
}

const mapStateToProps = (state) => {
  const { categories } = state; 
  return {
    categories,
  }
}

const mapDispatchToProps = { retrieveCategories, retrieveMeal }

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
export { Categories as UnwrappedCategories }; 