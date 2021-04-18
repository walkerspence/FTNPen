import React, { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Node, Inline, Text, Block, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { IPenFields } from 'types/contentfulTypes';
import ContentImage from 'ContentImage';
import VideoEmbed from './VideoEmbed';

interface PostProps {
  post: IPenFields['post'];
}

const LinkEmbedHandler = (url: string, child: Text, children: ReactNode) => {
  if (child.value === url) {
    return <VideoEmbed url={url} />;
  }

  return <a href={url}>{children}</a>;
};

const EmbeddedImage = ({ data }: Node) => {
  const { target: imageAsset } = data;
  return <ContentImage testId="post-image" imageAsset={imageAsset} />;
};

const options = {
  // TODO style block quotes as pull quotes
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: EmbeddedImage,
    [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => {
      const child = node.content[0] as Text;
      return LinkEmbedHandler(node.data.uri, child, children);
    },
  },
};

const Post = ({ post }: PostProps) => {
  return <div data-testid="postContainer">{post ? documentToReactComponents(post, options) : ''}</div>;
};

export default Post;
