import React, { ReactNode } from 'react';
import { Asset } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Node, Inline, Text, Block, BLOCKS, INLINES } from '@contentful/rich-text-types';
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

// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export const getIdFromYoutubeLink = (url: string) =>
  url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^/]*?\/)*)\??v?=?([^#&?]*).*/)[3];

const renderLink = (url: string, child: Text, children: ReactNode) => {
  if (child.value === url) {
    if (url.includes('youtu')) {
      return (
        <iframe
          data-testid="youtube-embed"
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${getIdFromYoutubeLink(url)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (url.includes('vimeo')) {
      return (
        <iframe
          data-testid="vimeo-embed"
          src={`https://player.vimeo.com/video/${url.split('/')[3]}?color=ffffff`}
          title="Vimeo video player"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }

  return <a href={url}>{children}</a>;
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Node) => renderEmbeddedImage(node.data.target),
    [INLINES.HYPERLINK]: (node: Inline | Block, children: ReactNode) => {
      const child = node.content[0] as Text;
      return renderLink(node.data.uri, child, children);
    },
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
