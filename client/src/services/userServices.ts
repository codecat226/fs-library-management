import axios from "axios";
import {
  ForgotUser,
  ResetUser,
  updateUserPassword,
  UserLogin,
} from "types/userTypes";
axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:4000/api/users/";

export const registerUser = async (values: FormData) => {
  const res = await axios.post(`${baseUrl}register`, values);
  return res;
};

export const loginUser = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res;
};

export const verifyUser = async (token: string | undefined) => {
  const res = await axios.post(`${baseUrl}verify/${token}`);
  return res;
};

export const forgotPassword = async (values: ForgotUser) => {
  const res = await axios.post(`${baseUrl}forgot-password`, values);
  return res;
};

export const resetPassword = async (
  values: ResetUser,
  token: string | undefined
) => {
  const res = await axios.post(`${baseUrl}reset-password/${token}`, values);
  return res;
};
export const logoutUser = async () => {
  const res = await axios.post(
    `${baseUrl}logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return res;
};

export const updateUser = async (values: FormData, id: string) => {
  const res = await axios.put(`${baseUrl}${id}`, values);
  return res;
};

export const changePassword = async (
  values: updateUserPassword,
  id: string
) => {
  const res = await axios.put(`${baseUrl}edit-password/${id}`, values);
  return res;
};

export const refreshUser = async () => {
  const res = await axios.get(`${baseUrl}refresh`, {
    withCredentials: true,
  });
  return res.data;
};

export const getBorrowedBooks = async (userId: string) => {
  const res = await axios.get(`${baseUrl}borrowed/${userId}`);
  return res;
};

// DONATE
export const fetchBrainTreeToken = async () => {
  const res = await axios.get(`${baseUrl}braintree/token`);
  return res.data;
};

export const processBrainTreeDonation = async (nonce:string, amount:number, email:string) => {
  const res = await axios.post(
    `${baseUrl}braintree/donate`,
    {nonce, amount, email},
    {
      withCredentials: true,
    }
  );
  return res;
};




// FOR ADMIN

export const banUser = async (userId: string) => {
  const res = await axios.post(`${baseUrl}ban/${userId}`);
  return res;
};

export const unbanUser = async (userId: string) => {
  const res = await axios.post(`${baseUrl}unban/${userId}`);
  return res;
};
