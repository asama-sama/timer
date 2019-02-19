import moment from 'moment';
import {combineReducers} from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const timer = (
  state = {
    name: '',
    timeBlocks: []
  },
  action) => {

  switch(action.type) {
  case 'START_TIMER':
    if (state.name === action.name) {
      let timeBlocks = state.timeBlocks.map(tb => {
        if(tb.end === undefined) {
          tb.end = moment().format();
        }
        return tb;
      });
      return {
        ...state,
        timeBlocks: [
          ...timeBlocks,
          {
            start: moment().format()
          }
        ]
      };
    } else {
      return state;
    }
  case 'STOP_TIMER':{
    if(state.name === action.name) {
      let timeBlocks = state.timeBlocks.map(tb => {
        if(tb.end === undefined) {
          tb.end = moment().format();
        }
        return tb;
      });
      return {...state, ...timeBlocks};
    } else {
      return state;
    }
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

  case 'START_TIMER':
  case 'STOP_TIMER':{
    let timers = state.timersState.items.map(t => timer(t, action));
    let activeTimer = action.name;
    if(action.type === 'STOP_TIMER') {
      activeTimer = '';
    }
    return {
      ...state,
      timersState: {
        items: timers,
        activeTimer
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
