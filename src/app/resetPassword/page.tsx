"use client";

import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";




export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword,setShowPassword]= useState(false);


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    const resetPassword = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/resetPassword", {
                token,
                password,
            });
            toast.success("Password reset successfully");
            router.push("/login");
        } catch (err: any) {
            console.log(err.response.data);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className = "flex items-center justify-center flex-col gap-0.5 min-h-screen p-4  bg-gray-300">
            <h1 className="font-bold text-2xl mb-4">Reset Your Password</h1>
            <div  className="flex flex-col grid-cols-1 gap-0.5 w-full max-w-md  bg-gray-200 shadow-md border-2 border-gray-200 rounded-md px-2 py-4">
                <div>
            <label htmlFor="password">New Password</label>
            <div className="relative">
            <input
            id="password"
            type={showPassword ? "text": "password"}
            placeholder="Enter new password"
            className="peer block w-full border-2 border-gray-300 focus:outline-none
             focus:border-gray-600 rounded-md p-2 mb-4 pl-10 py-[9px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

           <KeyIcon className="pointer-events-none absolute left-3 top-1/2
            h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

            <button
             type="button"
             onClick={() => setShowPassword(!showPassword)}
             className = "absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-900"
            >
                {showPassword? (
                    <EyeSlashIcon className="h-5 w-5" />    
                ): (
                    <EyeIcon className="h-5 w-5" />    
                )
                
                }

            </button>

            {/* <label htmlFor="confirm-password">Confirm Password</label>
            <input
            
            id="password"
            type="password" 
            placeholder="Confirm new password" 
            className="border-2 border-gray-300 focus:outline-none focus:border-gray-600  rounded-md p-2 mb-4" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            /> */}
            </div>
            </div>
            <button
                onClick={resetPassword}
                className= "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
                // disabled={password.length < 6} // Disable button if password is less than 6 characters
                >
                    Reset Password
            </button>
        </div>
        </div>
    )
}