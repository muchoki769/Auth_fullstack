"use client";

import { AtSymbolIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React,{useEffect,useState} from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
      const [email, setEmail] = useState("");
      
        const [, setError] = useState(false);
        const [buttonDisabled, setButtonDisabled] = useState(false);
        const [, setLoading] = useState(false);
        

        const forgotPassword = async ( ) => {
            setLoading(true);
            try{
                await axios.post('/api/users/forgotPassword',
                    {email})
                // setVerified(true);
                toast.success("Check your email to reset password");
            } catch (err: unknown) {
                const error = err as AxiosError<{message: string}>;
                setError(true);
                if (error.response?.data?.message) {

                
                // console.log(error.response.data);
                toast.error(error.response.data.message);
                } else if (error.message){
                    toast.error(error.message);
                } else {
                    toast.error("Something went wrong");

                }
            }finally {
                setLoading(false);
            }
        }


        useEffect(() =>  {
            setButtonDisabled(email.trim().length === 0);
        },[email]);

        return(
            <div className = "flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
                <h1 className="text-2xl bg-blue-400 rounded-md py-2 px-4 m-2">Forgot Password Page</h1>
                
                                <div className= "flex flex-col grid-cols-1 gap-0.5 m-2  bg-gray-200 shadow-md py-4 px-4 border-2 border-gray-200 rounded-2xl w-full max-w-sm mr-2 ml-2 ">
                                    <div>
                                         <label htmlFor="email">email</label>
                                         <div className="relative">
                                         <input
                                         className='peer block w-full border-2 border-gray-300 
                                         focus:outline-none focus:border-gray-600 rounded-md p-2 mb-4 pl-10 py-[9px]'
                                         id='email'
                                         type="text"
                                         value={email}
                                         onChange={(e) => setEmail ( e.target.value)}
                                         placeholder='email'
                                         />
                                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2
                                            h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                         </div>
                                         </div>
                                         <p className="text-sm text-gray-500">We will send you a link to reset your password</p>

                            <button 
                                onClick={forgotPassword}
                                className='bg-blue-500 text-white rounded-md p-2 mb-4 hover:bg-blue-600 transition duration-200 ease-in-out'> 
                                {buttonDisabled ? "No submit" : "Submit"}
                                    
                            </button>

                            <p>Dont have an account? <Link href="/signup" className='text-blue-500'>SignUp</Link></p>
                                    
                                </div>

                    
                        
            </div>
        )
}