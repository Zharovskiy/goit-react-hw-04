import css from "./Button.module.css";

const Button = ({ type, setCurrentPage, children }) => {
  return (
    <button className={css.button} type={type} onClick={setCurrentPage}>
      {children}
    </button>
  );
};

export default Button;
