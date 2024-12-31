"use server";

import connectToDB from "@/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function registerUserAction(formData) {
  await connectToDB();

  try {
    const { userName, email, password } = formData;

    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "Email already exists!",
      };
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // Add `await`
    const hashedPassword = await bcrypt.hash(password, salt); // Add `await`

    // Create a new user
    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newlyCreatedUser.save();

    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong! Please try again",
      };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "Some error occurred! Please try again",
    };
  }
}

export async function loginUserAction(formData) {
  await connectToDB();

  try {
    const { email, password } = formData;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password!",
      };
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password!",
      };
    }

    const createdTokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign(createdTokenData, "I_LOVE_YOU_SAFI", {
      expiresIn: "1d",
    });

    const getCookies = cookies();
    getCookies.set("token", token);

    // Successful login
    return {
      success: true,
      message: "User logged in successfully!",
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    return {
      success: false,
      message: "Some error occurred! Please try again.",
    };
  }
}

export async function fetchAuthUserAction() {
  await connectToDB();

  try {
    const getCookies = await cookies();
    const token = getCookies.get("token")?.value || "";

    if (token === "") {
      return {
        success: false,
        message: "Token is invalid! Please try again",
      };
    }

    const decodedToken = jwt.verify(token, "I_LOVE_YOU_SAFI");
    const getUserInfo = await User.findOne({ _id: decodedToken.id });

    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong! Please try again",
      };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "Some error occurred! Please try again",
    };
  }
}

export async function logoutUserAction() {
  const getCookies = cookies();
  getCookies.set("token", "");
}
