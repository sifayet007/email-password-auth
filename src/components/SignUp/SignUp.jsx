import React, { useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaImages } from "react-icons/fa";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showText, setShowText] = useState(false);
  //
  const inputElement = useRef();
  const inputElementKey = useRef();
  const nameInput = useRef();
  const photoUrl = useRef();
  //
  const inputElementRef = () => {
    inputElement.current.focus();
  };
  const inputElementRefKey = () => {
    inputElementKey.current.focus();
  };
  const nameInputHandel = () => {
    nameInput.current.focus();
  };
  const photoUrlHandel = () => {
    photoUrl.current.focus();
  };
  //
  const singUpHandel = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const photo = e.target.photoUrl.value;
    const name = e.target.name.value;
    console.log(email, password, terms);
    setErrorMessage("");
    setSuccess(false);
    if (!terms) {
      setErrorMessage("please accept our terms and conditions.");
      return;
    }

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
        console.log(result);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification Email send");
          setSuccess(true);
        });
        // update profile name and photo url
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => console.log("User profile update error", error));
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div>
      <div className="">
        <h3 className="text-3xl mb-5  text-center">Sign Up</h3>

        <form
          action=""
          className=" text-center flex flex-col gap-3"
          onSubmit={singUpHandel}
        >
          {/* name container */}
          <label htmlFor="" className="">
            <span onClick={nameInputHandel} className="relative">
              <FaRegUserCircle className="absolute -right-6 top-1 opacity-40 " />
            </span>

            <input
              ref={nameInput}
              className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl grow"
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              required
            />
          </label>
          {/* photo link container */}
          <label htmlFor="" className="">
            <span onClick={photoUrlHandel} className="relative">
              <FaImages className="absolute -right-6 top-1 opacity-40 " />
            </span>

            <input
              ref={photoUrl}
              className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl grow"
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              id="photoUrl"
              required
            />
          </label>
          {/* email container */}
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
              id="email"
              required
            />
          </label>
          {/* password container */}
          <label className="" htmlFor="">
            <span className="relative" onClick={inputElementRefKey}>
              <FaKey className="absolute -right-6 top-1 opacity-40 " />
            </span>

            <span className="relative" onClick={() => setShowText(!showText)}>
              {showText ? (
                <FaEyeSlash className="absolute -right-[371px] top-1 opacity-40" />
              ) : (
                <FaEye className="absolute -right-[371px] top-1 opacity-40" />
              )}
            </span>

            <input
              ref={inputElementKey}
              className="focus:outline-2 focus:outline-green-700 py-2 pl-7 rounded-md border-2 w-96 focus:shadow-xl"
              type={`${showText ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              id="password"
              required
            />
          </label>

          <label className="flex justify-center  gap-2">
            <input
              className=" w-5 h-5 focus:ring-red-600 text-red-600 bg-red-500 peer:"
              type="checkbox"
              name="terms"
              id=""
            />
            <span>Accept Our Terms And condition</span>
          </label>

          <di>
            <button className="w-96 hover:opacity-70 duration-300 bg-green-600 text-white py-2 rounded-md font-semibold">
              Sing Up
            </button>
          </di>
        </form>
        {errorMessage && (
          <p className="text-red-600 mt-5 text-center">{errorMessage}</p>
        )}
        {success && (
          <p className="text-green-500 text-center">Sing Up Successful</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
