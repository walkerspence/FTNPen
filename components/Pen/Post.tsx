import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, MARKS } from '@contentful/rich-text-types';
import { IPenFields } from 'types/contentfulTypes';

interface PostProps {
  post: IPenFields['post'];
}

const Post = ({ post }: PostProps) => {
  return <div data-testid="postContainer">{post ? documentToReactComponents(post) : ''}</div>;
};

/*
TODO
Style everything.
<b>, <i>, <u>, <code>, <a>, <ul> and <li>, <ol> and <li>, <blockquote>
use blockquotes as pull quotes
*/
export default Post;
