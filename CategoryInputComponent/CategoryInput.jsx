import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CategoryInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Category">
        <input
          type="text" name="newCategory" 
          value={this.props.newCategory} 
          onChange={this.props.updateNewCategory}
          onKeyPress={this.props.onEnterNewCategory}/>
      </div>
    );
  }
}
CategoryInput.propTypes = {
  newCategory: PropTypes.string.isRequired,
  updateNewCategory: PropTypes.func.isRequired,
  onEnterNewCategory: PropTypes.func.isRequired
};
export default CategoryInput;