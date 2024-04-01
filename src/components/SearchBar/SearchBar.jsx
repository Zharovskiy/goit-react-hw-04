import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast("Text must be entered to search for images.", {
    duration: 4000,
    position: "top-right",
    style: {
      backgroundColor: "orange",
      color: "white",
    },
  });

const SearchBar = ({ handleSubmit }) => {
  const validationSchema = Yup.object().shape({
    query: Yup.string().trim().required(notify),
  });

  return (
    <header className={css.header}>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={{ query: "" }}
      >
        <Form className={css.form}>
          <Field
            className={css.inputSearch}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
};

export default SearchBar;
