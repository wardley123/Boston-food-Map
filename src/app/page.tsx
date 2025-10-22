import Image from "next/image";
import GoogleMap from "./components/map_component";
import Login from "./pages/login";

export default function Home() {
  return (
    <div>
      <Login />
      <GoogleMap />

      <h1>Home page</h1>
      <h1>hellos</h1>
    </div>
  );
}
