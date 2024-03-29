import { useState, useEffect } from "react";
import { fetchImagesSearch } from "../../services/backend-api.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModale from "../ImageModal/ImageModale.jsx";
import css from "./App.module.css";

const imgMod = {
  alt_description: "alt",
  description: "description",
  likes: "likes",
  links: {
    download: "download",
  },
  urls: {
    regular: "regular",
  },
  user: {
    location: "location",
    name: "name",
  },
};

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
    console.log("click");
    setCurrentPage(currentPage + 1);
  };

  const openModal = (id) => {
    setImageModal(
      images.find((elem) => {
        return elem.id === id;
      })
    );
    setModalIsOpen(true);
  };

  if (currentPage > 1) {
    // scrollToNewImages();
  }

  // function scrollToNewImages() {
  //   const elemCard = document.querySelector(".card");
  //   const getItemCoords = elemCard.getBoundingClientRect();
  //   window.scrollBy({
  //     top: getItemCoords.height * 2,
  //     left: getItemCoords.left,
  //     behavior: "smooth",
  //   });
  // }

  useEffect(() => {
    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchImagesSearch(query, currentPage);
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
