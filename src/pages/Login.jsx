/* eslint-disable react/prop-types */
import { SignInSignUpForm } from "../components"
// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Login = ({ loginState, setLoginState }) => {
  const navigate = useNavigate();

  if (!loginState) {
    return (
      <div className="container w-full h-screen flex justify-center items-center bg-green-600">
        <SignInSignUpForm loginForm={true} loginState={loginState} setLoginState={setLoginState} />
      </div>
    )
  } else {
    setTimeout(() => {
      navigate('/')
    }, 1000)
    return (
      <div className="flex justify-center items-center w-screen h-screen text-3xl font-bold">
        <h1>Already Logged in. <br /> Navigating to Home...</h1>
      </div>
    )
  }
}

export default Login