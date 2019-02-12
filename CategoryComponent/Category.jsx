import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Category.css';

class Category extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName='Category'>
        <span styleName='Category-Text'>{this.props.name}</span>
        <Button color='green'>start</Button>
        <Button color='red'>stop</Button>
      </div>
    );
  }
}
Category.propTypes = {
  name: PropTypes.string.isRequired
};
export default Category;