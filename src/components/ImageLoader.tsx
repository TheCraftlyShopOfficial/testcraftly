import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

const ImageLoader = async ({
  src,
  width,
  height,
  fill = false,
  className,
  alt,
}: {
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  alt: string;
}) => {
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={className}
        placeholder="blur"
        blurDataURL={base64}
        {...(fill ? { fill: true } : { width, height })}
      />
    </>
  );
};

export default ImageLoader;
