import React, { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Node, Inline, Block, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { IPenFields } from 'types/contentfulTypes';
import ContentImage from 'Pen/ContentImage';
import VideoEmbed from './VideoEmbed';

interface PostProps {
  post: IPenFields['post'];
}

const LinkEmbedHandler = ({ content, data }: Inline | Block, children: ReactNode) => {
  const child = content[0];
  const { uri } = data;
  if ('value' in child) {
    if (child.value === uri) {
      return <VideoEmbed url={uri} />;
    }
  }
  return <a href={uri}>{children}</a>;
};

const ImageEmbedHandler = ({ data }: Node) => {
  const { target: imageAsset } = data;
  return <ContentImage testId="post-image" imageAsset={imageAsset} />;
};

const options = {
  // TODO style block quotes as pull quotes
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ImageEmbedHandler,
    [INLINES.HYPERLINK]: LinkEmbedHandler,
  },
};

const Post = ({ post }: PostProps) => {
  return <div data-testid="postContainer">{post ? documentToReactComponents(post, options) : ''}</div>;
};

export default Post;
