import { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { retrieveCategories } from './redux/actionCreators';
import appStyles from './appStyles';
import ListItem from './ListItem';

const { listStyles: styles } = appStyles;

class App extends Component {
  static propTypes = {
    // State values
    categories: PropTypes.array.isRequired,
    // Redux actions
    retrieveCategories: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.retrieveCategories();
  }

  renderItem = (item) => {
    const { strCategoryThumb, strCategory, strCategoryDescription } = item;
    return (
        <ListItem imageUrl={strCategoryThumb} title={strCategory} text={strCategoryDescription} key={strCategory}/>
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

const mapDispatchToProps = { retrieveCategories }

export default connect(mapStateToProps, mapDispatchToProps)(App);
