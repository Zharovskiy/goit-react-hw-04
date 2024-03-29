const ImageCard = ({ alt_description, small }) => {
  return (
    <div>
      <img src={small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
