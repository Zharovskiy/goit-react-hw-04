import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { forwardRef } from "react";

const ImageGallery = forwardRef(function ImageGallery(
  { images, openModal },
  ref
) {
  return (
    <ul className={css.gallery} ref={ref}>
      {images.map(({ id, alt_description, urls }) => {
        return (
          <li className={css.item} key={id}>
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
});

export default ImageGallery;
