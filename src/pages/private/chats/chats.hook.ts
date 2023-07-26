import { useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/seachParams.constant";
import useWindowDimensions from "src/hooks/useWindowDimension";

const useChatHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenChat = Boolean(searchParams.get("isOpenChat")) || 0;
  const { width } = useWindowDimensions();

  const isMoBile = width < 768;
  const setOpenChat = () => {
    searchParams.set(PARAMS.isOpenChat, "0");
    setSearchParams(searchParams);
  };
  const setCloseChat = () => {
    searchParams.set(PARAMS.isOpenChat, "1");
    setSearchParams(searchParams);
  };
  const toggleChatState = () => {
    if (isMoBile && !isOpenChat) {
      setOpenChat();
    }
    if (isMoBile && isOpenChat) {
      setCloseChat();
    }
  };
  return { isOpenChat, isMoBile, toggleChatState, setOpenChat, setCloseChat };
};
export default useChatHook;
