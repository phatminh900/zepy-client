import MainColumnHeader from "./main-column-header.component";

const MainColumn = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full  overflow-x-scroll md:border-r border-r-[var(--color-grey-300)]">
      <MainColumnHeader />
      {children}
    </div>
  );
};
export default MainColumn;
