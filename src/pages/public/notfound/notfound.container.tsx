const PageNotFound = () => {
  return (
    <div className="w-full my-[10%] mx-auto flex flex-col justify-center items-center gap-4">
      <img src="/imgs/not-found.svg" alt="Not found" className="w-[10%]" />
      <h3 className="text-[var(--color-grey-600)] text-lg">Page not found</h3>
    </div>
  );
};
export default PageNotFound;
