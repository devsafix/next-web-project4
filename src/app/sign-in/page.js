"use client";

import { loginUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInFormInitialState, userLoginFormControls } from "@/utils";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState(signInFormInitialState);

  const handleSaveButtonDisable = () => {
    return Object.keys(signInFormData).every(
      (key) => signInFormData[key].trim() !== ""
    );
  };

  const handleLoginUser = async () => {
    const result = await loginUserAction(signInFormData);
    console.log(result);
    if (result.success) {
      redirect("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <form action={handleLoginUser} className="p-20">
        <h1 className="text-3xl text-red-500 font-bold">Sign In Form</h1>
        {userLoginFormControls.map((item) => (
          <div key={item.name} className="my-5 max-w-sm">
            <Label>{item.label}</Label>
            <Input
              type={item.type}
              className="mt-1"
              placeholder={item.placeholder}
              defaultValue={signInFormData[item.name]}
              onChange={(e) =>
                setSignInFormData({
                  ...signInFormData,
                  [item.name]: e.target.value,
                })
              }
            />
          </div>
        ))}

        <Button
          disabled={!handleSaveButtonDisable()}
          type="submit"
          className="disabled:text-opacity-60"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
