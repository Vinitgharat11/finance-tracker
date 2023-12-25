"use client"

import { createContext } from "react";

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  loginWithCredentials: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };

  const loginWithCredentials = async ()=>{
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      
    }
  }
  const logout = () => {
    signOut(auth);
  };

  const values = {
    user,
    loading,
    googleLoginHandler,
    logout,
    loginWithCredentials
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}