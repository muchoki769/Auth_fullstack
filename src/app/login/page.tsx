"use client";

import React, { useEffect } from "react"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router  = useRouter();
      const [user, setUser] = React.useState({
            email:"",
            password:"",
            
        })
        const [buttonDisabled, setButtonDisabled] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
    
        const onLogin = async ()=> {
            try{
                setLoading(true);
                const response = await axios.post("/api/users/login", user);
                console.log("Login success", response.data);
                toast.success("Login success");
                router.push("/profile");
            } catch(error: any ){
                console.log("Login Failed", error.message);
                toast.error(error.message);

            } finally {
                setLoading(false);
            }
    
        }

        useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }, [user]);
        
    return (

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr/>
            {/* <form className="flex flex-col grid-cols-1 gap-0.5 px-4 py-4 border-2 border-gray-600 rounded-2xl w-full max-w-md"> */}
              <div className="flex flex-col grid-cols-1 gap-0.5 m-2 py-4 px-4 border-2 border-gray-600 rounded-2xl w-full max-w-md">

                  <label htmlFor="email">email</label>
            <input
            className='border-2 border-gray-300 focus:outline-none focus:border-gray-600 rounded-md p-2 mb-4'
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser ({...user, email: e.target.value})}
            placeholder='email'
            />

            <label htmlFor="password">password</label>
            <input
            className='border-2 border-gray-300 focus:outline-none focus:border-gray-600 rounded-md p-2 mb-4'
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser ({...user, password: e.target.value})}
            placeholder='password'
            />

            <button 
            onClick={onLogin}
            className='bg-blue-500 text-white rounded-md p-2 mb-4'> 
             {buttonDisabled ? "No Login" : "Login"}
                
                </button>
            <p>Dont have an account? <Link href="/signup" className='text-blue-500'>SignUp</Link></p>
            <p>Forgot Password? <Link href="/forgotPassword" className='text-blue-500'>ForgotPassword</Link></p>
            {/* </form> */}
            </div>
        </div>

        
    )
}