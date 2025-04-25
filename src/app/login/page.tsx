"use client";

import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { AtSymbolIcon, EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";





export default function LoginPage() {
    const router  = useRouter();
      const [user, setUser] = React.useState({
            email:"",
            password:"",
            
        })
        const [buttonDisabled, setButtonDisabled] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [showPassword, setShowPassword] = useState(false);
        // const [password, setPassword] = useState("");
    
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

        // useEffect(() => {

        // },[password]);
        
    return (

            <div className="flex  flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr/>
            {/* <form className="flex flex-col grid-cols-1 gap-0.5 px-4 py-4 border-2 border-gray-600 rounded-2xl w-full max-w-md"> */}
              <div className="flex  flex-col grid-cols-1 gap-0.5 m-2 py-4 px-4
                 border-2 border-gray-200 rounded-2xl w-full max-w-md bg-gray-200 shadow-md">
               
                <div className="w-full">
                   
                  <label
                //   className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email">email
                  </label>
                  <div className="relative">
            <input
            className='peer block w-full border-2 border-gray-300 focus:outline-none focus:border-gray-600
             rounded-md p-2 mb-4 py-[9px] pl-10 text-sm  placeholder:text-gray-500'
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser ({...user, email: e.target.value})}
            placeholder='email'
            required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 
            top-1/2 h-[18px] w-[w-18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
            </div>
           
            
             <div>
            <label htmlFor="password">password</label>
            <div className="relative">
            <input
            className='peer block w-full border-2 border-gray-300 focus:outline-none
             focus:border-gray-600 rounded-md p-2 mb-2 py-[9px] pl-10 text-sm  placeholder:text-gray-500'
            id="password"
            value={user.password}
            onChange={(e) => setUser ({...user, password: e.target.value})}
            placeholder='password'
            required
            type={showPassword ? "text" : "password"}
            // endAdornment={
            
                // <button 
                // type="button"
                // onClick={() => setShowPassword((prev) => !prev)}
                // className="absolute right-2 top-1/2 transform -translate-y-1/2"
                // aria-label="toggle password visibility"
                // >
                //     {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                // </button>
            
            // }

            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px]
             w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
             />

             <button
             type = "button"
             onClick={() => setShowPassword(!showPassword)}
             className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-900">
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5"/>
                ) : (
                    <EyeIcon className="h-5 w-5"/>
                )}
            </button>
          
            </div>
            </div>
          

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