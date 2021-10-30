import React from 'react';
import { createClient } from 'contentful';
import Link from 'next/link';
import { IPenFields } from 'types/contentfulTypes';

const CLIENT = createClient({
  space: process.env.CONTENTFUL_ID || 'NO-ID-FOUND',
  accessToken: process.env.CONTENTFUL_TOKEN || 'NO-TOKEN-FOUND',
});

export async function getStaticProps() {
  const { items: pens } = await CLIENT.getEntries<IPenFields>();
  const penInfo = pens.map((pen) => {
    const { title } = pen.fields;
    const { id } = pen.sys;
    return { title, id };
  });

  return {
    props: {
      penInfo,
    },
  };
}

interface ArchiveStaticProps {
  penInfo: { title: string; id: string }[];
}

export default function Archive({ penInfo }: ArchiveStaticProps) {
  return (
    <div>
      <h2>Archive</h2>
      <ul>
        {penInfo.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/p/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
