import { useState, useEffect } from "react";
import { fetchImagesSearch } from "../../services/backend-api.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModale from "../ImageModal/ImageModale.jsx";
import css from "./App.module.css";
import { imgMod, pagination } from "../../config/init.js";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(imgMod);

  const handleSubmit = (value) => {
    if (query !== value.query) {
      setImages([]);
      setCurrentPage(1);
      setQuery(value.query);
    }
  };

  const updatePage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    console.log("Монтаж компонента або Рендер першої сторінки");
    if (images.length > pagination) {
      console.log("Рендер другої сторінки і наступних");
      // const elemCard = document.querySelector('.card');
      // const getItemCoords = scrollRef.current.getBoundingClientRect();
      window.scrollBy({
        top: 600,
        // top: getItemCoords.height * 2,
        // left: getItemCoords.left,
        behavior: "smooth",
      });
    }
  }, [images]);

  const openModal = (id) => {
    setImageModal(
      images.find((elem) => {
        return elem.id === id;
      })
    );
    setModalIsOpen(true);
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchImagesSearch(
          query,
          currentPage,
          pagination
        );
        setMaxPage(response.total_pages);
        setImages((images) => {
          return [...images, ...response.results];
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (query !== "") {
      fetchImages();
    }
  }, [query, currentPage]);

  return (
    <>
      <SearchBar handleSubmit={handleSubmit} />
      <div className={css.container}>
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        <Loader loading={loading} />
        {images.length !== 0 && currentPage < maxPage && (
          <LoadMoreBtn updatePage={updatePage} />
        )}
        {error && <ErrorMessage />}
        <ImageModale
          isOpen={modalIsOpen}
          imageModal={imageModal}
          onClose={() => setModalIsOpen(false)}
        />
      </div>
    </>
  );
};

export default App;
