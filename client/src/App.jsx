import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExploreCampaigns from "./pages/ExploreCampaigns";
import CreateCampaigns from "./pages/CreateCampaigns";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import ProjectDetails from "./pages/ProjectDetails";
import DemoPayment from "./pages/DemoPayment";
import ContributionSuccess from "./pages/ContributionSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="campaigns" element={<ExploreCampaigns />} />

          <Route
            path="create-campaigns"
            element={
              <ProtectedRoute>
                <CreateCampaigns />
              </ProtectedRoute>
            }
          />

          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-of-service" element={<TermsOfService />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="logout" element={<Logout />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="projects/:id/contribute" element={<DemoPayment />} />
          <Route
            path="projects/:id/contribution-success"
            element={<ContributionSuccess />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}