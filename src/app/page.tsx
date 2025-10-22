import Image from "next/image";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleMap from "./components/map_component";

export default function Home() {
  return (

   <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form>
      <label htmlFor="emailAddress">Email Address</label><br></br>
      <input type="text" />
      <br></br>
      <label htmlFor="Password">Password</label>
      <input type="text" />
    </form>

        {/*<GoogleMap />*/}
      
    </div>
  );
}
