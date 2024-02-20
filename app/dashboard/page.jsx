'use client';

import { Context } from "@/components/ContextUser";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import HeaderContainer from "../../components/DashboardComponents/HeaderContainer/HeaderContainer";
import MainGoalsContainer from "../../components/DashboardComponents/MainGoalsContainer/MainGoalsContainer";
import SubGoalsContainer from "../../components/DashboardComponents/SubGoalsContainer/SubGoalsContainer";

const DashboardPage = () => {
  const {user} = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      router.push("/")
    }
  }, [user])

  return (
    <div className="h-min-screen w-screen bg-white flex flex-col overscroll-none px-40 py-6 h-full">
      <HeaderContainer />
      <MainGoalsContainer />
      <SubGoalsContainer />
    </div>
  );
};

export default DashboardPage;
