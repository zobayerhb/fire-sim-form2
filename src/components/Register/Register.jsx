import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const terms = e.target.term.checked;

    console.log(email, password, terms, passwordRegex);

    setSuccess(false);
    setErrorMessage("");

    if (!terms) {
      setErrorMessage("please accept our terms and condition");
    }

    if (password.length < 6) {
      setErrorMessage("Please type at least 6 characters");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "password should be at least one uppercase, one lowercase, one number, one special character"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentialUser) => {
        console.log("user successfully add", credentialUser.user);
        setSuccess(true);
        sendEmailVerification(auth.currentUser).then(() => {
          alert("please check your email and verified");
        });
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSignUp}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            name="email"
            className="grow"
            placeholder="Email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-5 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={passwordShow ? "text" : "password"}
            name="password"
            className="grow"
            placeholder="Password"
            required
          />
          <button
            onClick={() => setPasswordShow(!passwordShow)}
            className="absolute right-2 top-4"
          >
            {passwordShow ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>
        <div className="form-control">
          <label className="label justify-start cursor-pointer">
            <input type="checkbox" name="term" className="checkbox" />
            <span className="label-text ml-3 text-lg">
              Accept our terms & conditions
            </span>
          </label>
        </div>
        <button className="btn btn-accent btn-wide">Register</button>
      </form>
      <p>
        I have already an account/
        <Link to="/logIn" className="font-bold text-accent">
          LogIn
        </Link>
      </p>
      {success && (
        <p className="text-success font-bold">User successfully added</p>
      )}
      {errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>}
    </div>
  );
};

export default Register;
