import React from 'react';
import TimeStamp from 'Pen/TimeStamp';
import Post from 'Post';
import { IPenFields } from 'types/contentfulTypes';
import ContentImage from 'ContentImage';

interface PenProps extends IPenFields {
  createdAt: string;
}

const Pen = ({ createdAt, title, hero, post, author }: PenProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{`By ${author}`}</div>
      <TimeStamp utcString={createdAt} />
      <ContentImage testId="hero-image" imageAsset={hero} />
      <Post post={post} />
    </div>
  );
};

export default Pen;
