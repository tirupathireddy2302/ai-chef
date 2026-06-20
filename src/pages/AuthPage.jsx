import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "../firebase";

import { FcGoogle } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";

import "./../styles/AuthPage.css";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [confirmationResult, setConfirmationResult] =
    useState(null);

  // Email Login/Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Send OTP
  const sendOTP = async () => {
    try {
      if (!phone) {
        alert("Enter phone number");
        return;
      }

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier =
          new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {}
          );
      }

      const appVerifier =
        window.recaptchaVerifier;

      const result =
        await signInWithPhoneNumber(
          auth,
          phone,
          appVerifier
        );

      setConfirmationResult(result);

      alert("OTP Sent Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(
        otp
      );

      navigate("/");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>
          {isLogin
            ? "Welcome Back 👋"
            : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {isLogin
              ? " Register"
              : " Login"}
          </span>
        </p>

        <div className="divider">
          OR
        </div>

        {/* Google Login */}

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <FcGoogle />

          Continue with Google
        </button>

        <div className="divider">
          Phone Login
        </div>

        <input
          type="tel"
          placeholder="+919876543210"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <button
          className="phone-btn"
          onClick={sendOTP}
        >
          <FaPhoneAlt />

          Send OTP
        </button>

        {confirmationResult && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              className="verify-btn"
              onClick={verifyOTP}
            >
              Verify OTP
            </button>
          </>
        )}

        <div id="recaptcha-container"></div>

      </div>
    </div>
  );
}

export default AuthPage;