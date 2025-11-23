const imageModules = import.meta.glob(
  '../../assets/images/*.{JPG,jpg,png,jpeg}',
  {
    eager: true,
    query: 'w=300;600;1200&format=webp&imagetools&metadata',
  },
);

type Orientation = 'portrait' | 'landscape' | 'square';

function getImageOrientation(width: number, height: number): Orientation {
  if (width > height) {
    return 'landscape';
  } else if (height > width) {
    return 'portrait';
  } else {
    return 'square';
  }
}

const images = Object.entries(imageModules)
  .slice(0, 20) // <-- Set your desired limit here
  .map(([path, importedImage]) => {
    // The metadata is the module itself when not using `import: 'default'`
    const src = (importedImage as any).default;
    const width = 768;
    const height = 1150;
    const filename = path.split('/').pop()?.split('.')[0] ?? 'image';

    return {
      alt: filename,
      src,
      width,
      height,
      orientation: getImageOrientation(width, height),
    };
  });

export default images;