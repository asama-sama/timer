import moment from 'moment';
import {combineReducers} from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import uuid from 'uuid-random';
import {isTimerActiveForDate} from '../utils';

const timer = (
  state = {
    name: '',
    timeBlocks: [],
    visibleDates: []
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
    if (state.id === action.id) {
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
    if(state.id === action.id) {
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
    let timerActive = isTimerActiveForDate(state, action.date);
    let visibleDates =
      state.visibleDates.filter(d => {
        return !moment(d).isSame(
          moment(action.date), 'day');
      });
    if(action.id === state.id && !timerActive) {
      return {...state, visibleDates};
    } else {
      return state;
    }
  }
  case 'UNHIDE_TIMER':
    if(action.id===state.id) {
      let visibleDates = [
        ...state.visibleDates,
        moment(action.date).startOf('day').format()
      ];
      return {...state, visibleDates};
    } else {
      return state;
    }
  case 'UNHIDE_RUNNING_TIMERS_FOR_DATE': {
    let running = state.timeBlocks.map(tb => {
      return !tb.end;
    }).reduce((acc, next) => acc || next, false);
    let visibleDates = [...state.visibleDates];
    if(running) {
      let date = moment(action.date);
      let isVisible = visibleDates
        .find(vd => moment(vd).isSame(date, 'day'));
      if(!isVisible) {
        visibleDates = [
          ...visibleDates,
          date.startOf('day').format()
        ];
      }
    }
    return {...state, visibleDates};
  }
  case 'DELETE_TIME_BLOCK': {
    let timeBlocks = state.timeBlocks.filter(tb => tb.id !== action.timeBlockId);
    return {...state, timeBlocks};
  }
  case 'UPDATE_TIME_BLOCK_START':
    return {
      ...state,
      timeBlocks:
        state.timeBlocks.map(tb => (
          tb.id === action.id ?
            {
              ...tb,
              start: action.time
            } 
            : tb ))
    };
  case 'UPDATE_TIME_BLOCK_END': {
    return {
      ...state,
      timeBlocks:
        state.timeBlocks.map(tb => (
          tb.id === action.id ?
            {
              ...tb,
              end: action.time
            }
            : tb))
    };
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
  case 'UPDATE_STATE' : {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      lastUpdated: action.receivedAt,
      timersState: action.data
    };
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
              timeBlocks: [],
              id: uuid(),
              visibleDates: [moment().startOf('day').format()]
            }]
        }
      };
    }
  }

  case 'START_TIMER':
  case 'STOP_TIMER':
  case 'HIDE_TIMER':
  case 'UNHIDE_TIMER':
  case 'UNHIDE_RUNNING_TIMERS_FOR_DATE':
  case 'UNHIDE_TIMERS':
  case 'DELETE_TIME_BLOCK':
  case 'UPDATE_TIME_BLOCK_START':
  case 'UPDATE_TIME_BLOCK_END': {
    let items = state.timersState.items.map(t => timer(t, action));
    return {
      ...state,
      timersState: {
        ...state.timersState,
        items
      }
    };
  }
  default:
    return state;
  }
};

const date = (
  state = moment().startOf('day').format(), 
  action) => {
  let date = moment(state);
  switch(action.type){
  case 'DAY_FORWARD':
    return moment(date).add(1, 'd').format();
  case 'DAY_BACK':
    return moment(date).subtract(1, 'd').format();
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
