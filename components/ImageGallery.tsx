import Image from "next/image";

import styles from "@/styles/ImageGallery.module.css";

interface ImageGalleryProps {
  images: string[];
  altPrefix: string;
}

const ImageGallery = ({ images, altPrefix }: ImageGalleryProps) => (
  <div className={styles.grid}>
    {images.map((src, index) => (
      <figure key={`${src}-${index}`} className={styles.figure}>
        <Image
          src={src}
          alt={`${altPrefix} still ${index + 1}`}
          width={1200}
          height={675}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
        />
      </figure>
    ))}
  </div>
);

export default ImageGallery;
