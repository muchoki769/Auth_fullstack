"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = async () =>  {
        try{
            await axios.get("/api/users/logout")
            toast.success("Logout successfully")
            router.push("/login")
        } catch(err: unknown) {
            const error = err as AxiosError<{message: string}>;
            
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.message) {
                toast.error(error.message);
            } else{
                toast.error("Something went wrong")
            }
            
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        toast.success("User details fetched successfully")
        setData(res.data.data._id)
    }
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-amber-500">{data === 'nothing' ? "Nothing" : 
                <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 textwhite fonr-bold py-2 px-4 p-3 rounded mt-4">
                Logout
                </button>

                <button 
            onClick={getUserDetails}
            className="bg-green-900 hover:bg-blue-700 textwhite fonr-bold py-2 px-4 rounded mt-4">
                Get User Details
                </button>

        </div>
    )
}