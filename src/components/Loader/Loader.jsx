import { Oval } from "react-loader-spinner";

const Loader = ({ loading }) => {
  return (
    <Oval
      visible={loading}
      height="80"
      width="80"
      color="#4e75ff"
      secondaryColor=""
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
