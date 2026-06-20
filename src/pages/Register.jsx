import { useState } from "react";

import {
 createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Register(){

 const [email,setEmail] =
 useState("");

 const [password,setPassword] =
 useState("");

 const handleRegister =
 async(e)=>{

   e.preventDefault();

   try{

     await createUserWithEmailAndPassword(
       auth,
       email,
       password
     );

     alert("Registered");

   }catch(error){

     alert(error.message);

   }
 };

 return(

  <form onSubmit={handleRegister}>

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
     Register
   </button>

  </form>
 );
}

export default Register;