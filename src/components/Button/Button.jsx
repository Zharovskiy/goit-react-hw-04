import css from "./Button.module.css";

const Button = ({ type, updatePage, children }) => {
  return (
    <button className={css.button} type={type} onClick={updatePage}>
      {children}
    </button>
  );
};

export default Button;
