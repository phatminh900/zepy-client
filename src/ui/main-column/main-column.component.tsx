import MainColumnHeader from "./main-column-header.component";

const MainColumn = ({ children }: Children) => {
  return (
    <div className="h-full flex flex-col   md:border-r border-r-[var(--color-grey-300)]">
      <MainColumnHeader />
      {children}
    </div>
  );
};
export default MainColumn;
