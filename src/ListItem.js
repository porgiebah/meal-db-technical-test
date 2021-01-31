import { Component } from 'react';
import PropTypes from 'prop-types';
import appStyles from './appStyles';

class ListItem extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  render() {
    const { imageUrl, title, text } = this.props;
    return (
      <div style={appStyles.rootContainer}>
         <img src={imageUrl} style={appStyles.image} alt='img' />

        <div style={appStyles.textContainer}>
          <h1>{title}</h1>
          <h2>{text}</h2>
        </div>
       </div>
    );
  };
}

export default ListItem;