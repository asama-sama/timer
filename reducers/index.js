import moment from 'moment';

const initialState = {
  timers: [{
    name: 'groovin\'',
    timeBlocks: []
  }, {
    name: 'whatevs',
    timeBlocks: []
  }],
  newTimer: '',
  activeTimer: ''
};


const updateTimerForName = (name, timer, timers) => {
  let nTimers = Object.assign({}, timers);
  return nTimers.map(t => {
    if(t.name === name) {
      return timer;
    } else {
      return t;
    }
  });
};

const timers = (state = initialState, action) => {
  console.log(state, action);
  switch(action.type) {
  case 'ADD_TIMER': {
    let newTimer = action.name.trim();
    if(newTimer === '') {
      return state;
    } else {
      return Object.assign({}, state, {
        timers: [
          ...state.timers,
          {
            name: action.name,
            timeBlocks: []
          }]
      });
    }
  }
  case 'START_TIMER':{
    try {
      let timers = state.timers.map(timer => {
        if (timer.name === action.name) {
          // check no unfinished timeBlocks on this timer
          for(let t of timer.timeBlocks) {
            if(t.start !== undefined && t.end === undefined) {
              throw Error(`There is an unfinished timer for ${name}`);
            }
          }
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
    } catch(e) {
      console.error(e);
      return state;
    }
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
    console.log('timers')
    console.log(timers);
    return {
      ...state,
      activeTimer: '',
      timers: [...timers]
    };
  }
  default:
    return state;
  }
};
export default timers;