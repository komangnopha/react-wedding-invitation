import images from '@/layout/Gallery/Images.ts';
import 'photoswipe/style.css';
import { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Masonry from 'react-responsive-masonry';

const PhotoGallery = () => {
  const [randomImages, setRandomImages] = useState<Array<any>>([]);

  useEffect(() => {
    const data = document.querySelectorAll('div[style="display: flex; flex-direction: column; place-content: stretch flex-start; flex: 1 1 0%; width: 0px; gap: 10px;"');
    if (data) {
      data.forEach((item) => {
        (item as HTMLElement).setAttribute('style', 'display: flex; flex-direction: column; place-content: stretch flex-start; flex: 1 1 0%; gap: 10px;')
      })
    }
  }, [document.querySelectorAll('div[style="display: flex; flex-direction: column; place-content: stretch flex-start; flex: 1 1 0%; width: 0px; gap: 10px;"')])

  useEffect(() => {
    const randomImages = Array.from(images).sort(() => 0.5 - Math.random());
    setRandomImages(randomImages);
  }, [])

  return (
    <>
      <Gallery
        withDownloadButton={true}
        options={
          {
            preload: [0, 0],
            preloadFirstSlide: false,
          }
        }>
        <Masonry columnsCount={3} gutter="10px">
          {randomImages.map((image, index) => (
            <Item
              key={index}
              originalSrcset={`
              ${image.src[0]} 300w,
              ${image.src[1]} 600w,
              ${image.src[2]} 1200w
            `}
              original={image.src[2]}
              thumbnail={image.src[0]}
              cropped={true}
              width={image.width}
              height={image.height}>
              {({ ref, open }) => (
                <img
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                  src={image.src[0]}
                  alt={image.alt}
                  loading='lazy'
                  style={{ width: "100%", display: "block", cursor: "pointer", borderRadius: "8px" }}
                />
              )}
            </Item>
          ))}
        </Masonry>
      </Gallery>
    </>
  );
};

export default PhotoGallery;

