import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { useRef, useEffect } from "react";

const ImageGallery = ({ images, openModal, pagination }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (images.length > pagination) {
      const scrollId = setTimeout(() => {
        const getCoords = galleryRef.current.getBoundingClientRect();
        window.scrollBy({
          top: getCoords.top - 70,
          left: getCoords.left,
          behavior: "smooth",
        });
      }, 300);
      return () => clearTimeout(scrollId);
    }
  });

  return (
    <ul className={css.gallery}>
      {images.map(({ id, alt_description, urls }, index) => {
        return (
          <li className={css.item} key={id}>
            {index === images.length - pagination && (
              <div ref={galleryRef}></div>
            )}
            <ImageCard
              id={id}
              alt_description={alt_description}
              small={urls.small}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
