import React from 'react';
import dateFormat from 'dateformat';

interface TimeStampProps {
  utcString: string;
}

const TimeStamp = ({ utcString }: TimeStampProps) => {
  const date = new Date(utcString);
  const formatted = dateFormat(date, 'ddd mmm-dd-yyyy h:MM TT').toUpperCase();

  return <div>{formatted}</div>;
};

export default TimeStamp;
