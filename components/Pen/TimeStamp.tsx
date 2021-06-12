import React from 'react';
import dateFormat from 'dateformat';

interface TimeStampProps {
  className?: string;
  utcString: string;
}

const TimeStamp = ({ className, utcString }: TimeStampProps) => {
  const date = new Date(utcString);
  const formatted = dateFormat(date, 'mmm-dd-yyyy h:MM TT').toUpperCase();

  return <div className={className}>{formatted}</div>;
};

export default TimeStamp;
