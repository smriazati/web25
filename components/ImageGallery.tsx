import Image from "next/image";

import styles from "@/styles/ImageGallery.module.css";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => (
  <div className={styles.grid}>
    {images.map((image, index) => (
      <figure key={`${image.src}-${index}`} className={styles.figure}>
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={675}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
        />
      </figure>
    ))}
  </div>
);

export default ImageGallery;
