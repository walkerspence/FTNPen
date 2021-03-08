import dateFormat from 'dateformat';

const TimeStamp = ({ utcString }) => {
  const date = new Date(utcString);
  const formatted = dateFormat(date, 'ddd mmm-dd-yyyy h:MM TT').toUpperCase();

  return <div>{formatted}</div>;
};

//TODO: proptypes

export default TimeStamp;
