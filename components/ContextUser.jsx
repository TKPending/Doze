"use client";

import { useState, createContext, useEffect } from "react";
export const Context = createContext();
import AuthClient from "@/util/clients/authClient";
import axios from "axios";

axios.defaults.withCredentials = true;

export function ContextUser({ children }) {
  const [user, setUser] = useState(null);

  const onUserSignedIn = async () => {
    const newUser = await AuthClient.getUser();
    localStorage.setItem('user', newUser);
    setUser(newUser);
  };
  
  const onUserSignedOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("user")){
        return;
      }
      const newUser = await AuthClient.getUser();
      setUser(newUser);
    };

    fetchData();
  }, []);

  return (
    <Context.Provider value={{ user, onUserSignedOut, onUserSignedIn }}>
      {children}
    </Context.Provider>
  );
}
