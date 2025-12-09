"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Login (){
    const router = useRouter()
    //state variables for the Email, Password, Error, and loading states
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState('')
    const[message, setMessage] = useState('')
    const[loading, setLoading] = useState(false)

    //login in handler, to handle already existing users
    const loginHandler = async(e : React.FormEvent) => {
        //set the setter methods to their base values
        //to prevent default form submission behavior
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')

        //check if user exist with supabase
        let { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        //if we have an error logging in then it displays the reason why
        if(signInError){
            //displays message
            setError(signInError.message)
            //set loading to false
            setLoading(false)
        }
        else{
            //navigates to the map component to begin searching for food locations
            router.push('/GoogleMap')
        }
    }

    return(
        <div className="flex items-center justify-center h-screen p-4">
            {/*form to  */}
            <form onSubmit={loginHandler}
                  className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg border border-gray-900 shadow-sm dark:bg-gray-800 dark:border-gray-700 min-h-96">
                
                <div>
                    <h2 className="text-2xl font-bold">Login:</h2>

                    <label 
                        htmlFor ="emailAddress"
                        className="block mb-2">Email Address: 
                    </label>

                    <input
                        type="email" 
                        id="emailAddress" 
                        value={email} onChange={(e) => setEmail(e.target.value)} required 
                        className="w-full px-3 py-2 border rounded"
                    />

                </div>

                <div>

                    <label 
                        htmlFor="Password"
                        className="block mb-2">Password: 
                    </label>

                    <input
                        type="Password" 
                        id="Password" 
                        value={email} onChange={(e) => setPassword(e.target.value)} required 
                        className="w-full px-3 py-2 border rounded" 
                    />
                </div>

                <button
                    type = "submit"
                    disabled = {loading}
                    className="mx-auto block px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    {loading ? "loading..." : "login"}

                </button>

                <p className="text-center text-sm">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>

                
            </form>
        </div>
    )
}