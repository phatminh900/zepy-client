import MainColumn from "src/ui/main-column/main-column.component";
import { Outlet } from "react-router-dom";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import SearchResult from "./search-result.component";
import { Greeting } from "..";
const Search = () => {
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const content = (
    <MainColumn>
      <SearchResult />
      {/* Header */}
    </MainColumn>
  );
  if (!isMoBile) {
    return (
      <>
        {content}
        <Greeting />
      </>
    );
  }
  return isOpenTab ? <Outlet /> : content;
};
export default Search;
