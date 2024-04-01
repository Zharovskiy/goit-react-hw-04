import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ setCurrentPage, currentPage }) => {
  return (
    <button
      className={css.button}
      type="button"
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
