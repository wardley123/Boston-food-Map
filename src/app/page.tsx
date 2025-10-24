import Image from "next/image";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleMap from "./components/map_component";

export default function Home() {
  return (

   <div className="flex items-center justify-center h-screen p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <label htmlFor="emailAddress">Email Address:</label>
      <br></br>
      <input type="text" />
      <br></br>
      <label htmlFor="Password">Password:</label>
       <br></br>
      <input type="text" />
    </form>
        {/*<GoogleMap />*/} 
    </div>
  );
}
