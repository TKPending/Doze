"use client";

import { useState, createContext, useEffect } from "react";
export const Context = createContext();
import axios from "axios";
import AuthClient from "@/util/clients/authClient";
import MainGoalsClient from "@/util/clients/mainGoalsClient";
import SubGoalsClient from "@/util/clients/subGoalsClient";
import DashboardClient from "@/util/clients/dashboardClient";

axios.defaults.withCredentials = true;

export function ContextUser({ children }) {
  const [user, setUser] = useState(null);
  const [UserAuth, setUserAuth] = useState(new AuthClient());
  const [MainClient, setMainClient] = useState(new MainGoalsClient());
  const [SubClient, setSubClient] = useState(new SubGoalsClient());
  const [DashClient, setDashboardClient] = useState(new DashboardClient());

  const onUserSignedIn = async () => {
    await UserAuth.getUser(setUser);
  };

  const onUserSignedOut = async () => {
   setUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserAuth.getUser(setUser)
      } catch (err) {
        console.log("Problem getting user from ContextUser.jsx")
        console.error(err);
      }
    }
  
    fetchData();
  }, []);

  return (
    <Context.Provider value={{ user, UserAuth, MainClient, onUserSignedOut, onUserSignedIn }}>
      {children}
    </Context.Provider>
  );
}
