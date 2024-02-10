import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import React from "react";

type Props = {};

const Home = async (props: Props) => {
  const session = await auth();

  return (
    <div>
      <p>Home</p>
      <p>{JSON.stringify(session)}</p>
      <form action={logout}>
        <Button type='submit'>Logout</Button>
      </form>
    </div>
  );
};

export default Home;
