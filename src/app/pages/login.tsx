"use client"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

import { useState } from "react"
//once login is complete will access the map componet
import GoogleMap from "../components/map_component";

import { createClient } from '@supabase/supabase-js'
//TODO:
//handle successful authenitcation 
//password validation
//handle redirection(to map componet) after successful sign up
//The Supabase client initialization is outside the component. This works, but it's cleaner to move it to a separate utils file so you can reuse it elsewhere.
//Reset error state in handleSubmit. You clear message but not error at the start of the handler.

export default function login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  //user signup handler 
  const handleSignUp = async(e : React.FormEvent) => {

    e.preventDefault()
    setLoading(true)
    setMessage('')

    //check for if usestate (users) password is less than 6 characters
    if(password.length < 6){
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

  //allows users to sign up and create a new account thru supabase
  const {data, error} = await supabase.auth.signUp({
    email: email,
    password: password
  })

  if(error){
    setError(error.message)
    setLoading(false)
  }
}


  return(
    <div className="flex items-center justify-center h-screen p-4">
    
    <form 
    onSubmit={handleSignUp} 
    className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg border border-gray-900 shadow-sm dark:bg-gray-800 dark:border-gray-700 min-h-96">
    
    <div>
      <label 
      htmlFor="emailAddress" 
      className="block mb-2">Email Address:
      </label>
    {/* value = {email} sets the value of the input to our usestate email variable */}
    {/* onchange={(e)} => setEmail(target value)}  this extracts the current text within the input and calls the usestate setEmail to with the value and re-renders */}
      <input 
      type="email" 
      id="emailAddress" 
      value={email} onChange={(e) => setEmail(e.target.value)} required 
      className="w-full px-3 py-2 border rounded" />
    </div>

    
    <div>
      <label 
      htmlFor="password" 
      className="block mb-2">Password:
      </label>

      {/* value = {password} sets the value of the input to our usestate password variable */}
    {/* onchange={(e)} => setPassword(target value)}  this extracts the current text within the input and calls the usestate setPassword to with the value and re-renders */}
      <input 
      type="password" 
      id="password" 
      value ={password} onChange ={(e) => setPassword(e.target.value)} required 
      className="w-full px-3 py-2 border rounded" />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="mx-auto block px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {loading ? "signing up.." : "sign up"}
    </button>

  </form>
  
</div>
    )

}
    