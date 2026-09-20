import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExploreCampaigns from "./pages/ExploreCampaigns";
import About from "./pages/About";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/explore-campaigns" element={<ExploreCampaigns />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

/* mapping -> {} -> return keyword -> logic | else () */

/* el then index */

/* map function gives each el */