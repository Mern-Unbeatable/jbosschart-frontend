import { API_ENDPOINTS } from './httpEndpoint';
import { httpMethods } from './httpMethods';

export const signIn = async ({ email, password }) => {
  return httpMethods.post(API_ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
};

export const signUp = async (formData) => {
  return httpMethods.post(API_ENDPOINTS.AUTH.REGISTER, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const signOut = async () => {
  return httpMethods.post(API_ENDPOINTS.AUTH.LOGOUT, {});
};

export default {
  signIn,
  signUp,
  signOut,
};
