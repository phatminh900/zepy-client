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
  user_metadata: {
    avatar: string;
    fullname: string;
  };
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

interface IMessage {
  id: string;
  author_id: string;
  emojis: string[];
  created_at: Date | string;
  user_id: string;
  room_id: string;
  message: string;
  isRead: boolean;
  author_profile?: {
    avatar: string;
    email: string;
    gender: string;
    fullname: string;
  };
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
  created_at: string;
  friend_id: string;
  id: string;
  isChatted: boolean;
  lastMessage: string;
  lastMessageAt: string;
  isRead: boolean;
  room_id: string;
  unReadMessageCount: number;
  user_id: string;
  friend_profile: {
    status: string;
    avatar: string;
    id: string;
    fullname: string;
  };
  last_send_profile: { avatar: string; id: string; fullname: string };
}
