import { createClient, Entry } from 'contentful';
import { IPenFields } from 'types/contentfulTypes';

import Pen from 'Pen';

interface StaticPropsParams {
  params: {
    id: string;
  };
}

const CLIENT = createClient({
  space: process.env.CONTENTFUL_ID || 'NO-ID-FOUND',
  accessToken: process.env.CONTENTFUL_TOKEN || 'NO-TOKEN-FOUND',
});

export async function getStaticPaths() {
  const { items: pens } = await CLIENT.getEntries();
  const penIds = pens.map((pen) => pen.sys.id);

  const paths = penIds.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const { fields, sys }: Entry<IPenFields> = await CLIENT.getEntry(params.id);
  const { createdAt } = sys; // TODO get updatedAt for "last updated at x" section
  const { title, hero, post, author } = fields;

  return {
    props: {
      createdAt,
      title,
      hero,
      post,
      author,
    },
  };
}

export default Pen;
