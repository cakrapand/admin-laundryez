"use client";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RoleGate = (props: Props) => {
  const session = useSession();
  const isSuperAdmin = session.data?.user.isSupeAdmin;

  if (!isSuperAdmin) return <p>Unauthorized</p>;
  return <>children</>;
};

export default RoleGate;
