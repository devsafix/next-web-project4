"use server";

import connectToDB from "@/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";

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

    // Successful login
    return {
      success: true,
      data: {
        userName: user.userName,
        email: user.email,
      },
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
