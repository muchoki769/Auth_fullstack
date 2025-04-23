"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";




export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);


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
        <div className = "flex items-center justify-center flex-col gap-0.5 min-h-screen p-4  ">
            <h1 className="font-bold text-2xl mb-4">Reset Your Password</h1>
            <div  className="flex flex-col grid-cols-1 gap-0.5 w-full max-w-md border-2 border-gray-600 rounded-md px-2 py-4">
                
            <label htmlFor="password">New Password</label>
            <input
            id="password"
            type="password"
            placeholder="Enter new password"
            className="border-2 border-gray-300 focus:outline-none focus:border-gray-600 rounded-md p-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {/* <label htmlFor="confirm-password">Confirm Password</label>
            <input
            
            id="password"
            type="password" 
            placeholder="Confirm new password" 
            className="border-2 border-gray-300 focus:outline-none focus:border-gray-600  rounded-md p-2 mb-4" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            /> */}
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