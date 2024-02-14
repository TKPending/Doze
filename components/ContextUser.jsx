"use client";

import { useState, createContext, useEffect } from "react";
export const Context = createContext();
import axios from "axios";
axios.defaults.withCredentials = true;

export function ContextUser({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user");

      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onUserSignedIn = () => {
    getUser();
  };

  const onUserSignedOut = () => {
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Context.Provider value={{ user, onUserSignedOut, onUserSignedIn }}>
      {children}
    </Context.Provider>
  );
}
