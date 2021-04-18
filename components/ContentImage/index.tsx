import React from 'react';
import Image from 'next/image';
import { IPenFields } from 'types/contentfulTypes';

interface ContentImageProps {
  imageAsset: IPenFields['hero'];
  testId: string;
  priority?: boolean;
}

const ContentImage = ({ imageAsset, testId, priority = false }: ContentImageProps) => {
  const { file, title, description } = imageAsset.fields;
  const { url, details } = file;
  const { width, height } = details?.image ?? {
    width: '100',
    height: '100',
  };

  const absoluteUrl = `https:${url}`;

  return (
    <div data-testid={testId}>
      <Image src={absoluteUrl} alt={description} width={width} height={height} priority={priority} />
      <div>{title}</div>
    </div>
  );
};

export default ContentImage;
