import css from "./ImageModal.module.css";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { FaMapLocationDot } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";

const ImageModale = ({ isOpen, imageModal, onClose }) => {
  const {
    alt_description,
    description,
    likes,
    links: { download },
    urls: { regular },
    user: { location, name },
  } = imageModal;
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={css.ReactModal__Overlay}
      className={css.ReactModal__Content}
      closeTimeoutMS={300}
      onRequestClose={() => onClose()}
      ariaHideApp={false}
    >
      <button className={css.closeBtn} onClick={() => onClose()}>
        <IoClose className={css.closeIcon} />
      </button>
      <img src={regular} alt={alt_description} />
      <div className={css.info}>
        {description && <p>{description}</p>}
        {name && <p>Author: {name}</p>}
        {location && (
          <p className={css.infoItem}>
            <FaMapLocationDot className={css.icon} />
            {location}
          </p>
        )}
        {likes && (
          <p className={css.infoItem}>
            <AiTwotoneLike className={css.icon} />
            {likes}
          </p>
        )}
        {download && (
          <a className={css.infoItem} href={download} download="photo">
            <IoMdDownload className={css.icon} />
            Download
          </a>
        )}
      </div>
    </Modal>
  );
};

export default ImageModale;
