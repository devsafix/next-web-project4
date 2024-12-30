"use client";

import { registerUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpFormInitialState, userRegistrationFormControls } from "@/utils";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState(signUpFormInitialState);

  const handleSaveButtonDisable = () => {
    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  };

  const handleSaveUser = async () => {
    const result = await registerUserAction(signUpFormData);
    console.log(result);
    if(result.success){
        redirect("/sign-in")
    }
  };

  return (
    <form action={handleSaveUser} className="p-20">
      <h1 className="text-3xl text-red-500 font-bold">Sign Up Form</h1>
      {userRegistrationFormControls.map((item) => (
        <div key={item.name} className="my-5 max-w-sm">
          <Label>{item.label}</Label>
          <Input
            type={item.type}
            className="mt-1"
            placeholder={item.placeholder}
            defaultValue={signUpFormData[item.name]}
            onChange={(e) =>
              setSignUpFormData({
                ...signUpFormData,
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
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
