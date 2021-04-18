import React from 'react';
import TimeStamp from 'Pen/TimeStamp';
import Post from 'Pen/Post';
import Image from 'next/image';
import { IPenFields } from 'types/contentfulTypes';

interface PenProps extends IPenFields {
  createdAt: string;
}

const Pen = ({ createdAt, title, hero, post, author }: PenProps) => {
  const { file, description } = hero.fields; // TODO: render image title
  const { width, height } = file?.details?.image ?? {
    width: '1000',
    height: '1000',
  };
  const absoluteUrl = `https:${file.url}`;
  // TODO: wrap with div and use layout fill

  return (
    <div>
      <h1>{title}</h1>
      <div>{`By ${author}`}</div>
      <TimeStamp utcString={createdAt} />
      <Image width={width} height={height} alt={description} src={absoluteUrl} priority />
      <Post post={post} />
    </div>
  );
};

export default Pen;
