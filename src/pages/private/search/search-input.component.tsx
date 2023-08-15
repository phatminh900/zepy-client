import { useRef, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import validator from "validator";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/seachParams.constant";
import { ROUTES } from "src/constants/navigation.constant";
const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm();
  const searchTerm = watch().search;
  const formRef = useRef<HTMLFormElement | null>(null);
  const onSubmit = handleSubmit(() => {
    if (!searchTerm || searchTerm.length < 3 || !searchTerm.includes("@"))
      return;
    searchParams.set(PARAMS.email, searchTerm);
    setSearchParams(searchParams);
  });
  useEffect(() => {
    if (pathname === ROUTES.SEARCH) {
      formRef.current?.querySelector("input")?.focus();
    }
  }, [pathname]);
  // useEffect(() => {
  //   if (!searchTerm || searchTerm.length < 3 || !searchTerm.includes("@"))
  //     return;
  //   refetch();
  // }, [searchTerm, refetch]);
  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className="relative flex items-center bg-[var(--color-grey-200)] p-1 md:p-1.5 gap-1.5 flex-1"
    >
      <HiOutlineSearch />
      <input
        type="text"
        {...register("search", {
          validate: (val) =>
            validator.isEmail(val) || "Please enter a valid email",
        })}
        placeholder="Find a friend"
        className="bg-inherit input-search  text-xs md:text-sm w-full"
      />

      {errors?.search?.message && (
        <p className="text-[var(--color-danger)] absolute top-full left-0 text-xs">
          Invalid email
        </p>
      )}
    </form>
  );
};
export default SearchInput;
