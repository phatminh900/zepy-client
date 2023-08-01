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
