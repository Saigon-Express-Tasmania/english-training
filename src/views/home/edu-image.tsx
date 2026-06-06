import Image, { type ImageProps, type StaticImageData } from "next/image";

type EduImageProps = Omit<ImageProps, "src"> & {
  src: StaticImageData;
};

export function EduImage({ src, alt, className, width, height, ...props }: EduImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width ?? src.width}
      height={height ?? src.height}
      {...props}
    />
  );
}
