import Image from 'next/image';

function shimmer(w: number, h: number) {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%"/>
          <stop stop-color="#edeef1" offset="50%"/>
          <stop stop-color="#f6f7f8" offset="70%"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
  )}`;
}

export default function ProductImage({
  src,
  alt,
  priority = false,
  className = 'object-cover',
  sizes,
  fill = true,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
}) {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      {...(fill ? { fill: true } : { width: 800, height: 800 })}
      className={className}
      sizes={sizes ?? '100vw'}
      placeholder="blur"
      blurDataURL={shimmer(700, 700)}
      priority={priority}
    />
  );
}