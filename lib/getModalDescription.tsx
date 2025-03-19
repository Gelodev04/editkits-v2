import React from "react";

export const getModalDescription = (messageType, email = "") => {
  switch (messageType) {
    case "Log In":
      return "Welcome back! Please enter your details";

    case "Email not verified":
      return "Your email is not verified yet. Please verify email to continue using your account. If you've forgotten your password, you can reset it and proceed to login";

    case "Email already\nregistered":
      return "Your email is already registered, but it's not verified yet. Please verify email to continue using your existing account. If you've forgotten your password, you can reset it and proceed to login";

    case "Forgot your password?":
      return "Enter your email below to send a reset code";

    case "Enter verification code":
      return `We've sent a code to ${email}`;

    case "Reset Password":
      return (
        <>
          We have sent the reset code to{" "}
          <span className="font-bold">{email || ""}</span>, please enter the code below to reset your password
        </>
      );

    case "Sign Up":
      return "Enter the field below to get started";

    default:
      return "";
  }
};