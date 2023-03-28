import React,{useEffect, useState} from 'react'
import {onAuthStateChanged} from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [authUser,setAuthUser]=useState("");
    const navigate=useNavigate();




  return (
    <div>

        {
            
            authUser?(()=>navigate('/')):(()=>navigate('/login'))
        }
    </div>
  )
}

export default Auth