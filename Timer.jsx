import React, {Component} from 'react';
import CategoryInput from './CategoryInputComponent/CategoryInput';
import Category from './CategoryComponent/Category';
import moment from 'moment';

class Timer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      categories: [{
        name: 'groovin\'',
        timers: []
      }, {
        name: 'whatevs',
        timers: []
      }],
      newCategory: ''
    };
    this.updateNewCategory = this.updateNewCategory.bind(this);
    this.onEnterNewCategory = this.onEnterNewCategory.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  updateNewCategory(e) {
    this.setState({newCategory: e.target.value});
  }

  onEnterNewCategory(e) {
    if(e.key == 'Enter') {
      let newCategory = e.target.value.trim();
      if(newCategory !== '') {

        let cat = this.getCategoryForName(newCategory);
        if(cat !== undefined && cat.name == newCategory) {
          throw new Error(`Category: ${cat.name} already exists`);
        }
        

        let newCategories = Object.assign( 
          this.state.categories, {});
        newCategories.push({name: e.target.value});

        this.setState({categories: newCategories});
        this.setState({newCategory: ''});
      }
    }
  }

  getCategoryForName(name) {
    return this.state.categories.find(cat => cat.name === name);
  }


  startTimer(name) {
    let categories = Object.assign(this.state.categories, {});
    // create the new timer
    let category = this.getCategoryForName(name);
    if(category.timers === undefined) {
      category.timers = [];
    }
    let timer = {
      start: moment().format(),
    };
    category.timers.push(timer);
    // add this timer to the array
    categories.map(cat => {
      if(cat.name===name) {
        return category;
      } else {
        return cat;
      }
    });
    this.setState({categories: categories});
  }

  stopTimer(name) {
    console.log(`timername: ${name}`);
  }

  render() {
    return (
      <div>
        <div className="Categories">
          {this.state.categories.map(category => {
            return (
              <Category key={category.name}
                startTimer={()=>this.startTimer(category.name)}
                stopTimer={()=>this.stopTimer(category.name)}
                {...category}
              />);
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