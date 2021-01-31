import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import appStyles from './appStyles';

const { listItemStyles: styles } = appStyles;

class ListItem extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string,
    item: PropTypes.object,
    text: PropTypes.string,
  };

  onClick = () => {
    const { onPress, id } = this.props;
    onPress(id);
  };

  render() {
    const { imageUrl, title, text } = this.props;
    return (
      <button onClick={this.onClick} style={styles.rootButtonContainer}>
         <img src={imageUrl} style={styles.image} alt='img' />

        <div style={styles.textContainer}>
          <h1>{title}</h1>
          <ReactMarkdown source={text} renderers={{paragraph: () => <p style={styles.markdownText}>{text}</p> }}/>
        </div>
       </button>
    );
  };
}

export default ListItem;