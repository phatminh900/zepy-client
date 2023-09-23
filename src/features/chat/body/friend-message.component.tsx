import Avatar from "src/components/avatar";
import Modal from "src/components/modal";
import Profile from "src/components/profile";
import styles from "./message.module.css";
import { useDeleteMessage } from "src/features/chat/chat.hook";
import ChatMessageDetail from "./chat-message-detail.component";
interface IFriendMessageProps {
  createdAt: Date | string;
  fullName: string;

  avatar: string;
  email: string;
  id: string;
  gender: string;
  message: string;
}

function FriendMessage(props: IFriendMessageProps) {
  const { message, avatar, createdAt, fullName, email, gender, id } = props;
  const { deleteMessage } = useDeleteMessage();
  const handleDeleteMessage = (messageId: string) =>
    deleteMessage({ messageId });

  return (
    <li className={`flex gap-3 ${styles["message-container"]} message-item`}>
      <div className="cursor-pointer">
        <Modal>
          <Modal.Button name="friend-profile">
            <button onClick={() => {}}>
              <Avatar size="medium" src={avatar} />
            </button>
          </Modal.Button>
          <Modal.Window name="friend-profile">
            <Profile
              isUser={false}
              avatar={avatar}
              isFriend={true}
              fullName={fullName}
              email={email}
              gender={gender}
            />
          </Modal.Window>
        </Modal>
      </div>
      <div
        id={id}
        className={`${styles.message} relative bg-[var(--color-grey-0)] px-2 py-1 md:px-3 md:py-2 rounded-md `}
      >
        <ChatMessageDetail
          position="right"
          createdAt={createdAt as string}
          id={id}
          message={message}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
    </li>
  );
}
// const FriendMessage = forwardRef(function FriendMessage(
//   props: IFriendMessageProps,
//   ref
// ) {
//   const { message, avatar, createdAt, fullName, email, gender, id } = props;
//   const { deleteMessage } = useDeleteMessage();
//   const handleDeleteMessage = (messageId: string) =>
//     deleteMessage({ messageId });

//   return (
//     <li
//       id={id}
//       className={`flex gap-3 ${styles["message-container"]} message-item`}
//       ref={ref as LegacyRef<HTMLLIElement>}
//     >
//       <div className="cursor-pointer">
//         <Modal>
//           <Modal.Button name="friend-profile">
//             <button onClick={() => {}}>
//               <Avatar size="medium" src={avatar} />
//             </button>
//           </Modal.Button>
//           <Modal.Window name="friend-profile">
//             <Profile
//               isUser={false}
//               avatar={avatar}
//               isFriend={true}
//               fullName={fullName}
//               email={email}
//               gender={gender}
//             />
//           </Modal.Window>
//         </Modal>
//       </div>
//       <div
//         className={`${styles.message} relative bg-[var(--color-grey-0)] px-2 py-1 md:px-3 md:py-2 rounded-md `}
//       >
//         <ChatMessageDetail
//           createdAt={createdAt as string}
//           id={id}
//           message={message}
//           onDeleteMessage={handleDeleteMessage}
//         />
//       </div>
//     </li>
//   );
// });
export default FriendMessage;
