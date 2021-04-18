import React from 'react';
import { Asset } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, Node, BLOCKS, MARKS } from '@contentful/rich-text-types';
import { IPenFields } from 'types/contentfulTypes';
import Image from 'next/image';

interface PostProps {
  post: IPenFields['post'];
}

const renderEmbeddedImage = (embeddedAsset: Asset) => {
  const { file, title, description } = embeddedAsset.fields;
  const { url, details } = file;
  const { width, height } = details?.image ?? {
    width: '100',
    height: '100',
  };

  const absoluteUrl = `https:${url}`;

  return (
    <div>
      <Image src={absoluteUrl} alt={description} width={width} height={height} />
      <div>{title}</div>
    </div>
  );
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => renderEmbeddedImage(node.data.target),
  },
};

const Post = ({ post }: PostProps) => {
  return <div data-testid="postContainer">{post ? documentToReactComponents(post, options) : ''}</div>;
};

/*
TODO
Style blockquotes as pull quotes
*/
export default Post;
