"use client";

import { AtSymbolIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React,{useEffect,useState} from "react";
import toast from "react-hot-toast";

export default function forgotPasswordPage() {
      const [email, setEmail] = useState("");
        // const [verified, setVerified] = useState(false);
        const [error, setError] = useState(false);
        const [buttonDisabled, setButtonDisabled] = useState(false);
        const [loading, setLoading] = useState(false);
        

        const forgotPassword = async ( ) => {
            setLoading(true);
            try{
                await axios.post('/api/users/forgotPassword',
                    {email})
                // setVerified(true);
                toast.success("Check your email to reset password");
            } catch (error:any) {
                setError(true);
                console.log(error.response.data);
                toast.error(error.message);
            }finally {
                setLoading(false);
            }
        }

        //   useEffect(() => {
        //         const urlToken = window.location.search.split("=") [1];
        //         setEmail(urlToken || "");
        //     },[email])

        //     useEffect(() => {
        //           if(email.length > 0) {
        //            forgotPassword();
        //           } 
        //        },[email]); 
            //  useEffect(() => {
            //             if(SetEmail.email.length > 0 ) {
            //                 setButtonDisabled(false);
            //             } else {
            //                 setButtonDisabled(true);
            //             }
            //         }, [email]);
        useEffect(() =>  {
            setButtonDisabled(email.trim().length === 0);
        },[email]);

        return(
            <div className = "flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
                <h1 className="text-2xl bg-blue-400 rounded-md py-2 px-4 m-2">Forgot Password Page</h1>
                {/* {verified && ( */}
                                <div className= "flex flex-col grid-cols-1 gap-0.5 m-2  bg-gray-200 shadow-md py-4 px-4 border-2 border-gray-200 rounded-2xl w-full max-w-md ">
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

                    
                            {/* )}  */}
                           {/* {error && (
                                // <div>
                                //     <h2 className="text-2xl  bg-red-500">Error !, Email Not Verified</h2>
                                //     <Link href="/signup">
                                //         signup
                                //     </Link>
                                // </div>
                            )}  */}
            </div>
        )
}