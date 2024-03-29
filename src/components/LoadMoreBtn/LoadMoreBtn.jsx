import css from "./LoadMoreBtn.module.css";
import Button from "../Button/Button";

const LoadMoreBtn = ({ updatePage }) => {
  return (
    <Button className={css.button} type={"button"} updatePage={updatePage}>
      Load more
    </Button>
  );
};

export default LoadMoreBtn;
