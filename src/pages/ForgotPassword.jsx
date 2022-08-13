import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
function ForgotPassword(props) {
  const [email, setEmail] = useState();

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">forgot ForgotPassword</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={onChange}
            className="emailInput"
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            {" "}
            Sign In
          </Link>
          <div className="signBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
