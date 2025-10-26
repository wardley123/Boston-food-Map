import { useState } from "react"

export default function login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  return(
    <div className="flex items-center justify-center h-screen p-4">
    
    <form className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg border border-gray-900 shadow-sm dark:bg-gray-800 dark:border-gray-700 min-h-96">
    
    <div>
      <label htmlFor="emailAddress" className="block mb-2">Email Address:</label>
      <input type="text" id="emailAddress" className="w-full px-3 py-2 border rounded" />
    </div>

    
    <div>
      <label htmlFor="password" className="block mb-2">Password:</label>
      <input type="password" id="password" className="w-full px-3 py-2 border rounded" />
    </div>

  </form>
  
</div>
    )

}
    