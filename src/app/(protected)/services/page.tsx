import { auth } from "@/auth";
import React from "react";

type Props = {};

const ServicePage = async (props: Props) => {
  const session = await auth();
  return <div>ServicePage {JSON.stringify(session)}</div>;
};

export default ServicePage;
