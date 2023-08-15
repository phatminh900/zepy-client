import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/navigation.constant";
import { PARAMS } from "src/constants/seachParams.constant";
import { useDeleteAllMessages } from "src/features/chat/chat.hook";
import { useGetUser } from "src/hooks/useAuth";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";

const useChatsConversation = (roomId: string, type: "normal" | "group") => {
  const { user } = useGetUser();

  const navigate = useNavigate();
  const { deleteWholeConversation, isDeletingWholeConversation } =
    useDeleteAllMessages();
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const randomId = Math.random();
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    if (isMoBile && !isOpenTab) {
      // Open
      navigate({
        pathname: type === "normal" ? roomId : `${ROUTES.CHAT_GROUP}/${roomId}`,
        search: `?${PARAMS.isOpenTab}=1`,
      });
      return;
    }
    // CLose
    if (isMoBile && isOpenTab) {
      navigate({
        pathname: type === "normal" ? roomId : `${ROUTES.CHAT_GROUP}/${roomId}`,
        search: `?${PARAMS.isOpenTab}=0`,
      });
      return;
    }
    navigate(type === "normal" ? roomId : `${ROUTES.CHAT_GROUP}/${roomId}`);
  };
  return {
    user,
    isDeletingWholeConversation,
    deleteWholeConversation,
    randomId,
    isHovered,
    handleClick,
    setIsHovered,
  };
};
export default useChatsConversation;
