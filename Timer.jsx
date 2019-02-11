import React, {Component} from 'react';
import CategoryInput from './CategoryInputComponent/CategoryInput';

class Timer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: [{
        name: 'groovin\''
      }, {
        name: 'whatevs'
      }],
      newCategory: ''
    };
    this.updateNewCategory = this.updateNewCategory.bind(this);
    this.onEnterNewCategory = this.onEnterNewCategory.bind(this);
  }

  updateNewCategory(e) {
    this.setState({newCategory: e.target.value});
  }

  onEnterNewCategory(e) {
    if(e.key == 'Enter') {
      let newCategory = e.target.value.trim();
      if(newCategory !== '') {

        for(let cat of this.state.categories) {
          if(cat.name == newCategory) {
            throw new Error(`Category: ${cat.name} already exists`);
          }
        }

        let newCategories = Object.assign( 
          this.state.categories, {});
        newCategories.push({name: e.target.value});

        this.setState({categories: newCategories});
        this.setState({newCategory: ''});
      }
    }
  }

  render() {
    return (
      <div>
        <div className="Categories">
          {this.state.categories.map(category => {
            return (
              <div key={category.name}>
                {category.name}
              </div>);
          })}
        </div>
        <CategoryInput
          newCategory={this.state.newCategory}
          updateNewCategory={this.updateNewCategory}
          onEnterNewCategory={this.onEnterNewCategory}
        />
      </div>
    );
  }

}

export default Timer;