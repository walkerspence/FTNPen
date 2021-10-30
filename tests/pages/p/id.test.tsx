import React from 'react';
import { render, screen } from '@testing-library/react';
import { createClient } from 'contentful';
import { testPost, testHero } from 'tests/utils/contentfulTestData';
import Pen, { getStaticPaths, getStaticProps } from 'pages/p/[id]';
import { IPenFields } from 'types/contentfulTypes';

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

    test('getStaticProps gets correct props from contentful', async () => {
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
    const testAuthor = 'Test Author' as IPenFields['author'];
    const props = {
      createdAt: testDate,
      title: 'Test Title',
      hero: testHero,
      post: testPost,
      author: testAuthor,
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
      expect(screen.getByText('JAN-01-2000 12:00 AM')).toBeInTheDocument();
    });

    test('renders the hero image', () => {
      const heroImage = screen.getByTestId('hero-image');
      expect(heroImage).toBeInTheDocument();
    });

    describe('text', () => {
      test('normal text', () => {
        const text = screen.getByText(/Test text node/);
        expect(text).toBeInTheDocument();
      });

      test('bold text', () => {
        const boldText = screen.getByText(/Test bold text node/);
        expect(boldText).toBeInTheDocument();
        expect(boldText).toHaveStyle('font-weight: bold');
      });

      test('italic text', () => {
        const italicText = screen.getByText(/Test italic text node/);
        expect(italicText).toBeInTheDocument();
        expect(italicText).toHaveStyle('font-style: italic');
      });

      test('underlined text', () => {
        const underlineText = screen.getByText(/Test underline text node/);
        expect(underlineText).toBeInTheDocument();
        expect(underlineText).toHaveStyle('text-decoration: underline');
      });

      test('code text', () => {
        const codeText = screen.getByText(/Test code text node/);
        expect(codeText).toBeInTheDocument();
        expect(codeText).toHaveStyle('font-family: monospace');
      });
    });

    describe('lists', () => {
      test('unordered', () => {
        const unorderedListItems = screen.getAllByText(/Test bullet/);
        expect(unorderedListItems).toHaveLength(3);

        unorderedListItems.forEach((listItem) => {
          const parent = listItem.closest('ul');
          expect(parent).toHaveStyle('list-style-type: disc');
        });
      });

      test('ordered', () => {
        const orderedListItems = screen.getAllByText(/Test number/);
        expect(orderedListItems).toHaveLength(3);

        orderedListItems.forEach((listItem) => {
          const parent = listItem.closest('ol');
          expect(parent).toHaveStyle('list-style-type: decimal');
        });
      });
    });

    test('normal links', () => {
      const hyperlink = screen.getByText('Test hyperlink') as HTMLAnchorElement;
      expect(hyperlink).toBeInTheDocument();
      expect(hyperlink.href).toEqual(`https://test.url/`);
    });

    test('youtube links as embeds', () => {
      const youtubeEmbed = screen.getByTestId('youtube-embed') as HTMLIFrameElement;
      expect(youtubeEmbed.src).toEqual('https://www.youtube-nocookie.com/embed/zqpUQxV4Lmg');
    });

    test('vimeo links as embeds', () => {
      const vimeoEmbed = screen.getByTestId('vimeo-embed') as HTMLIFrameElement;
      expect(vimeoEmbed.src).toEqual('https://player.vimeo.com/video/411598677?color=ffffff');
    });

    test('blockquotes', () => {
      const blockquoteText = screen.getByText('Test block quote');

      expect(blockquoteText).toBeInTheDocument();
      expect(blockquoteText.closest('blockquote')).toBeInTheDocument();
    });

    test('renders the image title', () => {
      const imageTitle = screen.getByText('Test image title');
      expect(imageTitle).toBeInTheDocument();
    });

    test('renders hero image', () => {
      const image = screen.getByAltText('Test image description') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toEqual(`https://test-hero-image.url/`);
      expect(image.width).toEqual(250);
      expect(image.height).toEqual(150);
      expect(image.getAttribute('data-priority')).toEqual('true');
    });

    test('renders embedded images', () => {
      const image = screen.getByAltText('Test embedded image description') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toEqual(`https://test-embedded-image.url/`);
      expect(image.width).toEqual(50);
      expect(image.height).toEqual(75);
      expect(image.getAttribute('data-priority')).toEqual('false');
    });
  });
});
