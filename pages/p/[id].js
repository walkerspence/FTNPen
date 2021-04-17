import { createClient } from 'contentful';
import Pen from 'Pen';

const CLIENT = createClient({
  space: process.env.CONTENTFUL_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
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

export async function getStaticProps({ params }) {
  const { fields, sys } = await CLIENT.getEntry(params.id);
  const { createdAt } = sys;
  const { title, hero, imageDescription, post, author } = fields;
  // TODO get updatedAt for "last updated at x" section

  return {
    props: {
      createdAt,
      title,
      hero,
      imageDescription,
      post,
      author,
    },
  };
}

export default Pen;
