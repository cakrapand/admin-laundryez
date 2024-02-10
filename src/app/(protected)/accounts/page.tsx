import { auth } from "@/auth";
import RoleGate from "@/components/RoleGate";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AcountPage = async (props: Props) => {
//   const session = await auth();
//   if (!session?.user.isSupeAdmin) redirect("/");

  return (
    <RoleGate>
      <p>Account</p>
    </RoleGate>
  );
};

export default AcountPage;
