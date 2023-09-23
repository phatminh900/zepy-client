import { useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/searchParams.constant";
import useWindowDimensions from "src/hooks/useWindowDimension.hook";

const useOpenTableMobile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenTab = Boolean(searchParams.get("isOpenTab")) || 0;
  const { width } = useWindowDimensions();

  const isMoBile = width < 768;
  const setOpenChat = () => {
    searchParams.set(PARAMS.isOpenTab, "0");
    setSearchParams(searchParams);
  };
  const setCloseChat = () => {
    searchParams.set(PARAMS.isOpenTab, "1");
    setSearchParams(searchParams);
  };
  const toggleChatState = () => {
    if (isMoBile && !isOpenTab) {
      setOpenChat();
    }
    if (isMoBile && isOpenTab) {
      setCloseChat();
    }
  };
  return { isOpenTab, isMoBile, toggleChatState, setOpenChat, setCloseChat };
};
export default useOpenTableMobile;
