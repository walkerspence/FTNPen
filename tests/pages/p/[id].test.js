import { render, screen } from '@testing-library/react';
import { getEntries, getEntry } from 'contentful';
import Pen, { getStaticPaths, getStaticProps } from 'pages/p/[id]';

jest.mock('contentful');
jest.mock('next/Image');

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

    test('passes gets correct props from contentful', async () => {
      const props = await getStaticProps({ params: { id: 1 } });
      const expectedProps = {
        props: {
          createdAt: new Date('2000 PST').toUTCString(),
          title: 'Test Title',
          hero: { fields: { file: { url: '//test.url' } } },
          imageDescription: 'Test image description.',
          post: {},
          author: 'Test Author',
        },
      };
      expect(props).toEqual(expectedProps);
      expect(getEntry).toHaveBeenCalledTimes(1);
      expect(getEntry).toHaveBeenCalledWith(1);
    });
  });

  describe('Client', () => {
    const testDate = new Date('2000 PST').toUTCString();
    const props = {
      createdAt: testDate,
      title: 'Test Title',
      hero: { fields: { file: { url: '//test.url' } } },
      imageDescription: 'Test image description.',
      post: {},
      author: 'Test Author',
    };

    beforeEach(() => {
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

    test('renders the image with correct props', () => {
      const image = screen.getByAltText('Test image description.');

      expect(image).toBeInTheDocument();
      expect(image.src).toEqual('https://test.url/');
    });
  });
});
