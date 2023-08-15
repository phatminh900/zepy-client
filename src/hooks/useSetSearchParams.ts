import { useSearchParams } from "react-router-dom";

const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSetSearchParams = (field: string, value: string) => {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  };
  return { handleSetSearchParams };
};
export default useSetSearchParams;
