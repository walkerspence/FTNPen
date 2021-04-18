import React from 'react';
import { render, screen } from '@testing-library/react';
import { createClient } from 'contentful';
import { testPost, testHero } from 'tests/utils/contentfulTestData';
import Pen, { getStaticPaths, getStaticProps } from 'pages/p/[id]';

jest.mock('contentful');
jest.mock('next/Image');

const { getEntries, getEntry } = createClient({
  accessToken: 'test-access-token',
  space: 'test-contentful-id',
});

describe('/pen/[id]', () => {
  describe('Server', () => {
    test('getStaticPaths gets correct paths from contentful', async () => {
      const paths = await getStaticPaths();
      const expectedPaths = {
        paths: [{ params: { id: 1 } }, { params: { id: 2 } }, { params: { id: 3 } }],
        fallback: false,
      };

      expect(paths).toEqual(expectedPaths);
      expect(getEntries).toHaveBeenCalledTimes(1);
    });

    test('gets correct props from contentful', async () => {
      const props = await getStaticProps({ params: { id: '1' } });
      const expectedProps = {
        props: {
          createdAt: new Date('2000 PST').toUTCString(),
          title: 'Test Title',
          author: 'Test Author',
          hero: testHero,
          post: testPost,
        },
      };
      expect(props).toEqual(expectedProps);
      expect(getEntry).toHaveBeenCalledTimes(1);
      expect(getEntry).toHaveBeenCalledWith('1');
    });
  });

  describe('Client', () => {
    const testDate = new Date('2000 PST').toUTCString();
    const props = {
      createdAt: testDate,
      title: 'Test Title',
      hero: testHero,
      post: testPost,
      author: 'Test Author',
    };

    beforeEach(() => {
      // @ts-expect-error
      render(<Pen {...props} />);
    });

    test('renders the title', () => {
      expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
    });

    test('renders the byline', () => {
      expect(screen.getByText('By Test Author')).toBeInTheDocument();
    });

    test('renders the published date', () => {
      expect(screen.getByText('SAT JAN-01-2000 12:00 AM')).toBeInTheDocument();
    });

    describe('renders the hero image', () => {
      test('renders the image with correct props', () => {
        const image = screen.getByAltText('Test image description') as HTMLImageElement;

        expect(image).toBeInTheDocument();
        expect(image.src).toEqual('https://test-image.url/');
        expect(image.height).toEqual(150);
        expect(image.width).toEqual(250);
      });

      test('renders image title', () => {
        const imageTitle = screen.getByText('Test image title');

        expect(imageTitle).toBeInTheDocument();
      });
    });

    test('renders the post component', () => {
      const post = screen.getByTestId('postContainer');
      expect(post).toBeInTheDocument();
    });
  });
});
