import React, { useEffect, useState } from 'react'
import "../styles/login.css"
import { signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth";
import useAuthState from '../utils/useAuthState';


// import Auth from '../utils/Auth';


const LoginSingnUp = () => {
    const navigate=useNavigate();
    const [loginValues, setLoginValues] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [authUser,setAuthUser]=useAuthState("");
    

    const[loginEmail,setLoginEmail]=useState("");
    const[loginPassword,setLoginPassword]=useState("");
  
    const loginButton = () => {
        setLoginValues(true);


    }
    const registerButton = (e) => {
        setLoginValues(false);

    }
    const handleRegister = async () => {
        try {
           
           await createUserWithEmailAndPassword(auth, email, password);
          
        } catch (error) {
            console.log(error)
        }
    }
    const handleRegisterWithGoogle = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth,googleProvider);
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogin=async(e)=>{
        e.preventDefault()
    try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCredential)=>{
            console.log(userCredential)
        }).catch((error)=>{
            console.log(error);
        });

        
    } catch (error) {
        console.log(error)
    }
    }
    const handleLoginWithGoogle=async()=>{
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.log(error)
    }
    }
   
    useEffect(()=>{
        const listen=onAuthStateChanged(auth,(user)=>{
            if(user){
                setAuthUser(user)
                navigate('/')
            }
            else{setAuthUser(null)}
            
        })
    },[])


    return (
        <div className="main__container">
            
            <div className="form-box">
                <header className="first__div">
                    <div className="button-login-sigup">
                        <div id="btn"></div>
                        <button className="toggle-button" onClick={loginButton}>Login</button>
                        <button className="toggle-button" onClick={registerButton}>Signup</button>
                    </div>
                    <div className="title-header">
                        <div className="header__title">
                            <h2>Welcome!!</h2>
                        </div>
                        <div className="sub__title">
                            <h3>Login to your account</h3>
                        </div>
                    </div>
                </header>
                <section className="main__body">

                    {
                        loginValues === true ? (

                            <form id="login" className="input-form">
                                <input type="text" className="input-field" id="user" placeholder="Email" onChange={(e)=>setLoginEmail(e.target.value)} required />
                                <input type="text" className="input-field" id="password" placeholder="Password" onChange={(e)=>setLoginPassword(e.target.value)} required />
                                <button className="submit-btn" onClick={handleLogin} >Log in</button>
                                <button className="submit-btn-google" onClick={handleLoginWithGoogle} >Log in With Google</button>
                            </form>
                        ) : (
                            <form id="login" className="input-form" >
                                <input type="text" className="input-field" id="user" onChange={(e) => setEmail(e.target.value)} placeholder="Email"  />
                                <input type="text" className="input-field" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"  />
                                <input type="password" className="input-field " id="conpas" onChange={(e) => setConPassword(e.target.value)} placeholder="Confirm-Password"  />
                                <button className="submit-btn" onClick={handleRegister} >Register</button>
                                <button className="submit-btn-google" onClick={handleRegisterWithGoogle } >Sign Up in With Google</button>
                            </form>

                        )


                    }



                </section>

            </div>
        </div>

    )
}

export default LoginSingnUp