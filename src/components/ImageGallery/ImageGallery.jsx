import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { useRef, useEffect } from "react";

const ImageGallery = ({ images, openModal, pagination }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (images.length > pagination) {
      const getItemCoords = galleryRef.current.getBoundingClientRect();
      scrollBy({
        top: getItemCoords.height * 2,
        left: getItemCoords.left,
        behavior: "smooth",
      });
    }
  });

  return (
    <ul className={css.gallery}>
      {images.map(({ id, alt_description, urls }) => {
        return (
          <li
            className={css.item}
            key={id}
            ref={galleryRef}
            onClick={() => openModal(id)}
          >
            <ImageCard alt_description={alt_description} small={urls.small} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
