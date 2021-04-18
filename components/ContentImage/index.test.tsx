import React from 'react';
import ContentImage from 'ContentImage';
import { render, screen } from '@testing-library/react';
import { testEmbeddedAssetBlock, testHero } from 'tests/utils/contentfulTestData';

describe('<ContentImage />', () => {
  test('renders the image title', () => {
    // @ts-expect-error
    render(<ContentImage imageAsset={testHero} priority />);

    const imageTitle = screen.getByText('Test image title');
    expect(imageTitle).toBeInTheDocument();
  });

  test('renders hero images with correct props', () => {
    // @ts-expect-error
    render(<ContentImage imageAsset={testHero} priority />);
    const image = screen.getByAltText('Test image description') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toEqual(`https://test-hero-image.url/`);
    expect(image.width).toEqual(250);
    expect(image.height).toEqual(150);
    expect(image.getAttribute('data-priority')).toEqual('true');
  });

  test('renders embedded images with correct props', () => {
    // @ts-expect-error
    render(<ContentImage imageAsset={testEmbeddedAssetBlock.data.target} />);

    const image = screen.getByAltText('Test embedded image description') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual(`https://test-embedded-image.url/`);
    expect(image.width).toEqual(50);
    expect(image.height).toEqual(75);
    expect(image.getAttribute('data-priority')).toEqual('false');
  });
});
