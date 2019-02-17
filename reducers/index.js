import moment from 'moment';

const initialState = {
  timers: [{
    name: 'groovin\'',
    timeBlocks: []
  }, {
    name: 'whatevs',
    timeBlocks: []
  }],
  newTimerInput: '',
  activeTimer: ''
};

const timers = (state = initialState, action) => {
  console.log(state, action);
  switch(action.type) {
  case 'ADD_TIMER': {
    let newTimerInput = state.newTimerInput.trim();
    if(state.timers.find(timer => timer.name === newTimerInput)) {
      console.error(`Timer with name ${newTimerInput} already exists`);
      return state;
    }
    if(newTimerInput === '') {
      return state;
    } else {
      return Object.assign({}, state, {
        timers: [
          ...state.timers,
          {
            name: newTimerInput,
            timeBlocks: []
          }]
      });
    }
  }
  case 'START_TIMER':{
    let timers = state.timers.map(timer => {
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
      timers,
      activeTimer: action.name
    });
  }
  case 'STOP_TIMER': {
    let timers = state.timers.map(t => {
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
      timers: [...timers]
    };
  }
  case 'UPDATE_NEW_TIMER_INPUT': {
    return {
      ...state,
      newTimerInput: action.newTimerInput
    };
  }
  default:
    return state;
  }
};
export default timers;