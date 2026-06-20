import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const handleLogin = async(e) => {

    e.preventDefault();

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Success");

    }catch(error){

      alert(error.message);

    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e)=>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>
          setPassword(e.target.value)
        }
      />

      <button>
        Login
      </button>
    </form>
  );
}

export default Login;