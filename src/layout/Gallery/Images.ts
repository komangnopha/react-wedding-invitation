const imageModules = import.meta.glob(
  '../../assets/images/gallery/*.{JPG,jpg,png,jpeg,heic}',
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
    const mod = importedImage as any;
    // default export is the processed image URL
    const src = mod.default ?? mod.src ?? '';

    // vite-imagetools exposes metadata when using the `&metadata` query.
    // The structure can vary slightly between versions/configs, so try
    // several common locations then fall back to sensible defaults.
    const metadata = mod.metadata ?? mod.meta ?? mod;

    const widthFromMeta =
      metadata?.width ??
      metadata?.originalWidth ??
      metadata?.original?.width ??
      metadata?.images?.[0]?.width ??
      undefined;

    const heightFromMeta =
      metadata?.height ??
      metadata?.originalHeight ??
      metadata?.original?.height ??
      metadata?.images?.[0]?.height ??
      undefined;

    const width = widthFromMeta ?? 768;
    const height = heightFromMeta ?? 1150;
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