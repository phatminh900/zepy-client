interface Children {
  children: React.ReactNode;
}

interface ICredential {
  email: string;
  password: string;
}
interface ISignup extends ICredential {
  fullName: string;
  passwordConfirm: string;
}

interface User {
  fullname: string;

  avatar: string;
  gender: string;
  email: string;
  status: string;
  id: string;
}
interface IRequestedFriend {
  friend_id: string;
  created_at: string;
  id: string;
  user_profile: User;
}

interface IUserProfile {
  status: string;
  avatar: string;
  id: string;
  fullname: string;
  email: string;
  gender: string;
}
interface IMessage {
  id: string;
  author_id: string;
  emojis: string[];
  created_at: Date | string;
  user_id: string;
  room_id: string;
  message: string;
  isRead: boolean;
  author_profile?: IUserProfile;
}

interface IFriendProfile {
  avatar: string;
  email: string;
  fullname: string;
  gender: string;
  id: string;
  status: string;
}

interface IConversation {
  friend_id: string;
  id: string;
  isChatted: boolean;

  lastMessage: string;
  lastMessageAt: string;
  isRead: boolean;
  created_at: string;
  type: "normal";
  room_id: string;
  unReadMessageCount: number;
  user_id: string;
  friend_profile: IUserProfile;
  last_send_profile: IUserProfile;
}
interface IGroupConversation
  extends Omit<IConversation, "friend_id" | "friend_profile" | "room_id"> {
  group_id: string;
  type: "group";
  room_id: string;
  group: { name: string; id: string; avatar: string; room_id: string };

  created_at: string;
}
interface IFriend {
  id: string;
  room_id: string;
  friend_profile: User;
}

interface IGroup {
  id: string;
  main_author_id: string;
  vice_author_id?: string;
  room_id: string;
  avatar: string;
}
