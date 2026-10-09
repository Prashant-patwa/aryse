import NavButton from "./NavButton";
import { FaGithub, FaInstagram, FaYoutube, FaRegCopyright, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#034C53] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info & Social Icons */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Aryse</h2>
            <p className="text-teal-100/80 text-sm max-w-xs">
              Student ideas . Real world impact
            </p>
            <div className="flex items-center gap-3 mt-2">
              <NavButton path="https://instagram.com" btnName={<FaInstagram />} variant="SMlink" />
              <NavButton path="https://linkedin.com" btnName={<FaLinkedin />} variant="SMlink" />
              <NavButton path="https://github.com" btnName={<FaGithub />} variant="SMlink" />
              <NavButton path="https://youtube.com" btnName={<FaYoutube />} variant="SMlink" />
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Quick Links</h3>
            <ul className="flex flex-col gap-1">
              <NavButton path="/" btnName="Home" variant="link" />
              <NavButton path="/campaigns" btnName="Explore" variant="link" />
              <NavButton path="/create-campaigns" btnName="Create Project" variant="link" />
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Company</h3>
            <ul className="flex flex-col gap-1">
              <NavButton path="/about" btnName="About" variant="link" />
              <NavButton path="/contact" btnName="Contact" variant="link" />
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Legal</h3>
            <ul className="flex flex-col gap-1">
              <NavButton path="/privacy-policy" btnName="Privacy Policy" variant="link" />
              <NavButton path="/terms-of-service" btnName="Terms of Service" variant="link" />
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className=" pt-6 border-t border-teal-800/60 flex items-center justify-center text-xs text-teal-100/70 gap-1">
          <FaRegCopyright />
          <span>2026 Aryse. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}