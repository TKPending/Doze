"use client";
import Profile from "@/components/Profile";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Context } from "@/components/ContextUser";

export default function UserProfile() {
  const { user } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="h-full">
      <Profile />
    </div>
  );
}
