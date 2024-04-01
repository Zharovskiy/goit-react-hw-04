const ImageCard = ({ id, alt_description, small, openModal }) => {
  return (
    <div>
      <img src={small} alt={alt_description} onClick={() => openModal(id)} />
    </div>
  );
};

export default ImageCard;
