import moment from 'moment';
import {combineReducers} from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import uuid from 'uuid-random';
import {isTimerActive} from '../utils';

const timer = (
  state = {
    name: '',
    timeBlocks: []
  },
  action) => {

  switch(action.type) {
  case 'START_TIMER':{
    // end all running timers, on any timer
    let timeBlocks = state.timeBlocks.map(tb => {
      if(tb.end === undefined) {
        tb.end = moment().format();
      }
      return tb;
    });
    let newState = {
      ...state, timeBlocks: [...timeBlocks]
    };
    if (state.name === action.name) {
      newState = {
        ...state,
        timeBlocks: [
          ...timeBlocks,
          {
            id: uuid(),
            start: moment().format()
          }
        ]};
    }
    return newState;
  }
  case 'STOP_TIMER':{
    if(state.name === action.name) {
      let timeBlocks = state.timeBlocks.map(tb => {
        if(tb.end === undefined) {
          tb.end = moment().format();
        }
        return tb;
      });
      return {...state, timeBlocks};
    } else {
      return state;
    }
  }
  case 'HIDE_TIMER':{
    let timerActive = isTimerActive(state);
    if(action.name === state.name && !timerActive) {
      return {...state, hide: true};
    } else {
      return state;
    }
  }
  case 'UNHIDE_TIMERS':
    return {...state, hide: false};
  case 'DELETE_TIME_BLOCK': {
    let timeBlocks = state.timeBlocks.filter((tb, idx) => idx !== action.index);
    return {...state, timeBlocks};
  }
  default:
    return state;
  }
};

const timers = (
  state = {
    isFetching: false,
    didInvalidate: false,
    timersState: {
      items: []
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

  case 'START_TIMER':
  case 'STOP_TIMER':
  case 'HIDE_TIMER':
  case 'UNHIDE_TIMERS':
  case 'DELETE_TIME_BLOCK': {
    let items = state.timersState.items.map(t => timer(t, action));
    return {
      ...state,
      timersState: {
        items
      }
    };
  }
  default:
    return state;
  }
};

const date = (
  state = moment().startOf('day')._d, 
  action) => {
  let date = moment(state);
  switch(action.type){
  case 'DAY_FORWARD':
    return moment(date).add(1, 'd')._d;
  case 'DAY_BACK':
    return moment(date).subtract(1, 'd')._d;
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  timers,
  date
});

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)
);

export default store;
