import { useState, useEffect, useRef } from "react";
import { fetchImagesSearch } from "../../services/backend-api.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
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

  const listRef = useRef(null);
  const scrollHeight = useRef(0);

  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({
      behavior: "smooth",
      top: scrollHeight.current,
    });
    scrollHeight.current = listRef.current.clientHeight;
  }, [images]);

  const handleSubmit = (value) => {
    if (query !== value.query) {
      setImages([]);
      setCurrentPage(1);
      setQuery(value.query);
    }
  };

  const onLoadMore = () => setCurrentPage((prev) => prev + 1);

  const openModal = (id) => {
    setImageModal(images.find((elem) => elem.id === id));
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
        setImages((images) => [...images, ...response.results]);
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
          <ImageGallery images={images} openModal={openModal} ref={listRef} />
        )}
        <Loader loading={loading} />
        {images.length !== 0 && currentPage < maxPage && (
          <LoadMoreBtn onLoadMore={onLoadMore} />
        )}
        {error && <ErrorMessage />}
        <ImageModal
          isOpen={modalIsOpen}
          imageModal={imageModal}
          onClose={() => setModalIsOpen(false)}
        />
      </div>
    </>
  );
};

export default App;
