"use client";

import React from "react";
import { Button } from "../button";
import { logoutUserAction } from "@/actions";

const LogoutUser = () => {
  const handleLogout = async () => {
    logoutUserAction();
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default LogoutUser;
