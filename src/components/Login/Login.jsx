import React, { useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../Firebase.init";

const Login = () => {
  const [Open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const loginHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setErrorMessage("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (!result.user.emailVerified) {
          setErrorMessage("Please verify your email address");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMessage(error.message);
      });
  };
  const handelForgetPassword = (e) => {
    e.preventDefault();
    console.log("hello our bangladesh", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("password Resat email sent, please check your email");
      });
    }
  };
  return (
    <div>
      <div className="">
        <h3 className="text-3xl mb-5  text-center">Login Now!</h3>

        <form action="" onSubmit={loginHandler} className=" text-center">
          <label htmlFor="" className="">
            <span className="relative">
              <MdOutlineMail className="absolute -right-6 top-1 opacity-40 " />
            </span>

            <input
              className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl grow"
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              id="email"
              required
            />
          </label>
          <br />
          <br />

          <label className="" htmlFor="">
            <span className="relative">
              <FaKey className="absolute -right-6 top-1 opacity-40 " />
            </span>

            <span onClick={() => setOpen(!Open)} className="relative">
              {Open ? (
                <FaEyeSlash className="absolute -right-[371px] top-1" />
              ) : (
                <FaEye className="absolute -right-[371px] top-1" />
              )}
            </span>

            <input
              className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl"
              type={`${Open ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              id="password"
              required
            />
          </label>
          <br />
          <br />
          <label
            onClick={handelForgetPassword}
            className="hover:underline duration-150 "
          >
            <a href="">Forget password?</a>
          </label>
          <br />
          <br />
          <button className="w-96 hover:opacity-70 duration-300 bg-green-600 text-white py-2 rounded-md font-semibold">
            Sing Up
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mt-4">Login Successful</p>
        )}
      </div>
    </div>
  );
};

export default Login;
