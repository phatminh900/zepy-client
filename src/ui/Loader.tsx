import Spinner from "src/components/spinner";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Spinner />
    </div>
  );
};
export default Loader;
