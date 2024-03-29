import css from "./LoadMoreBtn.module.css";
import Button from "../Button/Button";

const LoadMoreBtn = ({ setCurrentPage, currentPage }) => {
  return (
    <Button
      className={css.button}
      type={"button"}
      setCurrentPage={() => setCurrentPage(currentPage + 1)}
    >
      Load more
    </Button>
  );
};

export default LoadMoreBtn;
