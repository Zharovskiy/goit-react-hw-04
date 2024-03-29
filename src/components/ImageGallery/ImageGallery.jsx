import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, alt_description, urls }) => {
        return (
          <li className={css.item} key={id} onClick={() => openModal(id)}>
            <ImageCard alt_description={alt_description} small={urls.small} />
          </li>
        );
      })}
    </ul>
  );
};

// ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
