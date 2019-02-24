import {connect} from 'react-redux';
import DatePicker from '../Components/DatePickerComponent/DatePicker';
import {subtractDay, addDay} from '../actions';

const mapStateToProps = state => ({date: state.date});

const mapDispatchToProps = dispatch => ({
  subtractDay: () => dispatch(subtractDay()),
  addDay: () => dispatch(addDay())
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(DatePicker);