import { HiOutlineSearch } from "react-icons/hi";
import validator from "validator";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/seachParams.constant";
const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, watch } = useForm();
  const searchTerm = watch().search;
  const onSubmit = handleSubmit(() => {
    if (!searchTerm || searchTerm.length < 3 || !searchTerm.includes("@"))
      return;
    searchParams.set(PARAMS.email, searchTerm);
    setSearchParams(searchParams);
  });

  // useEffect(() => {
  //   if (!searchTerm || searchTerm.length < 3 || !searchTerm.includes("@"))
  //     return;
  //   refetch();
  // }, [searchTerm, refetch]);
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center bg-[var(--color-grey-200)] p-1 md:p-1.5 gap-1.5 flex-1"
    >
      <HiOutlineSearch />
      <input
        type="text"
        {...register("search", {
          validate: (val) =>
            validator.isEmail(val) || "Please enter a valid email",
        })}
        placeholder="Search a friend"
        className="bg-inherit  text-xs md:text-sm w-full"
      />
    </form>
  );
};
export default SearchInput;
