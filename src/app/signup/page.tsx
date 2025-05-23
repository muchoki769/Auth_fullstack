"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { AtSymbolIcon, EyeIcon, EyeSlashIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";



export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username: "",
    })
const [buttonDisabled, setButtonDisabled] = useState(false);
const [loading, setLoading] = React.useState(false);
const [showPassword, setShowPassword] = useState(false);

    const onSignup = async () => {
        try{
           setLoading(true);
           const response = await axios.post("/api/users/signup", user); 
           console.log("Signup success", response.data);
              toast.success("Signup success check your email to verify your account");
              router.push("/login");

        }catch(error: unknown) {
            const err = error as AxiosError<{message: string}>;
            if (err.response?.data?.message) {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
            } else if (err.message) {
                console.log(err.message);
                toast.error(err.message);
            } else {
                toast.error("Something went wrong");
            }
            
        } finally {
            setLoading(false);
        }

    }

    useEffect(() =>  {
         if(user.email.length > 0 && user.password.length > 
            0 && user.username.length > 0 ) {
            setButtonDisabled(false);
         } else {
            setButtonDisabled(true);
         }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
            <h1>{loading ? "Processing..." : "Signup"}</h1>
            <hr/>
            {/* <form className="flex flex-col grid-cols-1 gap-0.5 m-2 py-4 px-4 border-2 border-gray-600 rounded-2xl w-full max-w-md"> */}
           
            <div className="flex flex-col grid-cols-1 gap-0.5 m-2 py-4 px-4 border-2
             border-gray-200 rounded-2xl w-full max-w-sm mr-2 ml-2  bg-gray-200 shadow-md">
                <div className="w-full">
             <div>
            <label htmlFor="username">Username</label>
            <div className="relative">
            <input
            className='peer block w-full border-2 border-gray-300 focus:outline-none
             focus:border-gray-600 rounded-md p-2 mb-4 pl-10 py-[9px]'
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser ({...user, username: e.target.value})}
            placeholder='username'
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2  h-[18px] w-[18px] 
            -translate-y-1/2  text-gray-500 peer-focus:text-gray-900"/>
            </div>
            </div>

            <div>
                  <label htmlFor="email">email</label>
                     <div className="relative">
            <input
            className='peer block w-full border-2 border-gray-300 focus:outline-none focus:border-gray-600 
            rounded-md p-2 mb-4 pl-10 py-[9px]'
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser ({...user, email: e.target.value})}
            placeholder='email'
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2
               h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            </div>
           
                <div>
            <label htmlFor="password">password</label>
            <div className="relative">
            <input
            className='peer block w-full border-2 border-gray-300 focus:outline-none focus:border-gray-600 
            rounded-md p-2 mb-4 pl-10 py-[9px] '
            id="password"
            type={showPassword ? "text":"password"}
            value={user.password}
            onChange={(e) => setUser ({...user, password: e.target.value})}
            placeholder='password'
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2
            h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center hover:text-gray-900 text-gray-500"
            >
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                ):
                <EyeIcon className="h-5 w-5"/>
            }
            </button>
            </div>
            </div>
            </div>
            <button
            onClick={onSignup}
            className='bg-blue-500 text-white rounded-md p-2 mb-4' 
           >
                {buttonDisabled ? "No Signup" : "Sign Up"}
                </button>
            <p>Already have an account? <Link href="/login" className='text-blue-500'>Login</Link></p>
            
          
            {/* </form> */}
            </div>
        </div>

    )
}