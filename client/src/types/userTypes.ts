export type UserLogin = {
  username: string;
  password: string;
};

export type UserRegister = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  image: string;
};

export type ForgotUser = {
  email: string;
};

export type ResetUser = {
  password: string;
};

export type InitialStateUser = {
  error: string;
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    image: string;
    isAdmin: boolean;
  };
};

export type InitialStateUsers = {
  error: string;
  loading: boolean;
  users: AdminUser[];
};

export type AdminUsersArray = [
  {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    isBanned: boolean;
  }
];

export type AdminUser = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  isBanned: boolean;
};

export type UserProfile = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  isAdmin: boolean;
};

export type updateUserBasic = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  image: string;
  email: string;
};

export type updateUserPassword = {
  _id: string;
  username: string;
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
};

export type DonateInitialState = {
  
}
