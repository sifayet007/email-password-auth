import React, { useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showText, setShowText] = useState(false);
  const inputElement = useRef();
  const inputElementKey = useRef();
  const inputElementRef = () => {
    inputElement.current.focus();
  };
  const inputElementRefKey = () => {
    inputElementKey.current.focus();
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    setErrorMessage("");
    setSuccess(false);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and include one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className=" text-center">
      <h3 className="text-3xl mb-5">Register</h3>

      <form action="" onSubmit={submitHandler} className="">
        <label htmlFor="" className="">
          <span onClick={inputElementRef} className="relative">
            <MdOutlineMail className="absolute -right-6 top-1 opacity-40 " />
          </span>

          <input
            ref={inputElement}
            className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl grow"
            type="email"
            name="email"
            placeholder="Email"
            id=""
            required
          />
        </label>
        <br />
        <br />

        <label className="" htmlFor="">
          <span className="relative" onClick={inputElementRefKey}>
            <FaKey className="absolute -right-6 top-1 opacity-40 " />
          </span>
          {showText ? (
            <span onClick={() => setShowText(!showText)} className="relative">
              <FaEye className="absolute -right-[371px] top-1" />
            </span>
          ) : (
            <span onClick={() => setShowText(!showText)} className="relative">
              <FaEyeSlash className="absolute -right-[371px] top-1" />
            </span>
          )}
          <input
            ref={inputElementKey}
            className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl"
            type={`${showText ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            id=""
            required
          />
        </label>
        <br />
        <br />
        <button className="w-96 hover:opacity-70 duration-300 bg-green-600 text-white py-2 rounded-md font-semibold">
          Login
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
      {success && <p className="text-green-500 mt-5">Register Successful</p>}
    </div>
  );
};

export default Register;
