import Image from "next/image";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleMap from "./components/map_component";

export default function Home() {
  return (
    <div>
       <div className = "min-h-screen flex item-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-ms">
          <h1 className="text-2xl font-bold text center mb-6">
            
          </h1>
        </div>
        <label className="text" >
            Username = <input name = "username" />
        </label>
  

        <label>
            Password = <input name = "Password" />
        </label>
    </div>
      {/*<GoogleMap />*/}

    </div>
  );
}
