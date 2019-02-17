import moment from 'moment';
import {combineReducers} from 'redux';

const timers = (
  state = {
    isFetching: true,
    didInvalidate: false,
    items: [],
    activeTimer: ''
  }, action) => {
  switch(action.type) {
  case 'ADD_TIMER': {
    console.log(action);
    let newTimerInput = action.name.trim();
    if(state.items.find(timer => timer.name === newTimerInput)) {
      console.error(`Timer with name ${newTimerInput} already exists`);
      return state;
    }
    if(newTimerInput === '') {
      return state;
    } else {
      return Object.assign({}, state, {
        items: [
          ...state.items,
          {
            name: newTimerInput,
            timeBlocks: []
          }]
      });
    }
  }
  case 'START_TIMER':{
    let timers = state.items.map(timer => {
      // end any running timers
      timer.timeBlocks.map(tb => {
        if(tb.end === undefined) {
          tb.end = moment().format();
        }
        return tb;
      });
      if (timer.name === action.name) {
        return {
          ...timer,
          timeBlocks: [
            ...timer.timeBlocks,
            {
              start: moment().format()
            }
          ]
        };
      } else {
        return timer;
      }
    });
    return Object.assign({}, state, {
      items: timers,
      activeTimer: action.name
    });
  }
  case 'STOP_TIMER': {
    let timers = state.items.map(t => {
      let timeBlocks = t.timeBlocks;
      if(t.name === action.name) {
        timeBlocks = t.timeBlocks.map(tb => {
          if(tb.end === undefined) {
            tb.end = moment().format();
          }
          return tb;
        });
      }
      return {
        ...t, 
        ...timeBlocks
      };
    });
    return {
      ...state,
      activeTimer: '',
      items: [...timers]
    };
  }
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  timers
});
export default rootReducer;
