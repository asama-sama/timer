import moment from 'moment';
import {combineReducers} from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const timers = (
  state = {
    isFetching: false,
    didInvalidate: false,
    timersState: {
      items: [],
      activeTimer: ''
    },
  }, action) => {
  switch(action.type) {
  case 'REQUEST_STATE': 
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    };
  case 'RECEIVE_STATE' : {
    let newState = {
      ...state,
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt
    };
    if(action.data !== undefined) {
      newState = {
        ...newState,
        timersState: action.data
      };
    }
    return newState;
  }
  case 'ADD_TIMER': {
    let newTimerInput = action.name.trim();
    if(state.timersState.items.find(timer => timer.name === newTimerInput)) {
      console.error(`Timer with name ${newTimerInput} already exists`);
      return state;
    }
    if(newTimerInput === '') {
      return state;
    } else {
      return {
        ...state,
        timersState: {
          ...state.timersState,
          items: [
            ...state.timersState.items,
            {
              name: newTimerInput,
              timeBlocks: []
            }]
        }
      };
    }
  }
  case 'START_TIMER':{
    let timers = state.timersState.items.map(timer => {
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
    return Object.assign({}, state, 
      {
        timersState: {
          items: timers,
          activeTimer: action.name
        }
      });
  }
  case 'STOP_TIMER': {
    let timers = state.timersState.items.map(t => {
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
      timersState: {
        activeTimer: '',
        items: [...timers]
      }
    };
  }
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  timers
});

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)
);

export default store;
