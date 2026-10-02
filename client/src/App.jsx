import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExploreCampaigns from "./pages/ExploreCampaigns";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/campaigns" element={<ExploreCampaigns />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

/* mapping -> {} -> return keyword -> logic | else () */

/* el then index */

/* map function gives each el */