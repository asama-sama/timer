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
      newCategory: '',
      activeTimer: ''
    };
    this.updateNewCategory = this.updateNewCategory.bind(this);
    this.onEnterNewCategory = this.onEnterNewCategory.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateActiveTimer = this.updateActiveTimer.bind(this);
  }

  updateActiveTimer(name) {
    this.setState({activeTimer: name});
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
        newCategories.push({
          name: e.target.value,
          timers: []
        });

        this.setState({categories: newCategories});
        this.setState({newCategory: ''});
      }
    }
  }

  getCategoryForName(name) {
    return this.state.categories.find(cat => cat.name === name);
  }

  updateCategoryForName(name, category) {
    let categories = Object.assign(this.state.categories, {});
    categories.map(cat => {
      if(cat.name === name) {
        return category;
      } else {
        return cat;
      }
    });
    this.setState({categories: categories});
  }

  /**
   * Adds a new start timer if none is running for this category
   * @param  {string} name [name of category]
   */
  startTimer(name) {
    // create the new timer
    let category = this.getCategoryForName(name);
    if(category.timers === undefined) {
      category.timers = [];
    }
    // check no unfinished timers on this category
    for(let timer of category.timers) {
      if(timer.start !== undefined && timer.end === undefined) {
        throw Error(`There is an unfinished timer for ${name}`);
      }
    }
    // stop all other timers
    let categories = this.state.categories.map(cat => {
      if(
        cat.name !== name &&
        cat.end === undefined) {
        this.stopTimer(cat.name);
      }
    });
    this.setState({categories: categories});

    // create new timer and add to the array
    let timer = {
      start: moment().format(),
    };
    category.timers.push(timer);
    this.updateCategoryForName(name, category);
    this.updateActiveTimer(name);
  }

  /**
   * Stops any running timer on this category
   * @param  {string} name [name of category]
   */
  stopTimer(name) {
    let category = this.getCategoryForName(name);
    for(let timer of category.timers) {
      if(timer.start !== undefined && timer.end === undefined) {
        timer.end = moment().format();
        break;
      }
    }
    this.updateCategoryForName(name, category);
    this.updateActiveTimer('');
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
                activeTimer={this.state.activeTimer}
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