import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

const TimeStamp = ({ utcString }) => {
  const date = new Date(utcString);
  const formatted = dateFormat(date, 'ddd mmm-dd-yyyy h:MM TT').toUpperCase();

  return <div>{formatted}</div>;
};

TimeStamp.propTypes = {
  utcString: PropTypes.string.isRequired,
};

export default TimeStamp;
