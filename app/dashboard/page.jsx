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
    <div className="h-min-screen w-full bg-white flex flex-col gap-8 overscroll-none lg:px-40 md:px-10 px-5 py-6 h-full">
      <HeaderContainer />
      <MainGoalsContainer />
      <SubGoalsContainer />
    </div>
  );
};

export default DashboardPage;
