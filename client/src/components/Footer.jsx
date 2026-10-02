import NavButton from "./NavButton";
import { FaGithub, FaInstagram, FaYoutube, FaRegCopyright } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="flex flex-col border-2 border-gray-400 w-full bg-gray-400 text-white">

            <div className="flex justify-around">
                <div className="flex flex-col">
                    <span className="flex">
                        <NavButton path="https://github.com" btnName={<FaGithub />} variant="SMlink" />
                        <NavButton path="https://github.com" btnName={<FaXTwitter />} variant="SMlink" />
                        <NavButton path="https://github.com" btnName={<FaInstagram />} variant="SMlink" />
                        <NavButton path="https://github.com" btnName={<FaYoutube />} variant="SMlink" />
                    </span>
                    <p className="font-normal">Empowering student dreams through community support.</p>
                </div>

                <div>
                    <p>
                        Platform
                    </p>
                    <ul className="flex flex-col">
                        <NavButton path="/campaigns" btnName="Explore Projects" variant="link" />
                        <NavButton path="/create-campaigns" btnName="Start a Project" variant="link" />
                        <NavButton path="/about" btnName="How It Works" variant="link" />
                    </ul>
                </div>

                <div>
                    <p>
                        Company
                    </p>
                    <ul className="flex flex-col">
                        <NavButton path="/about" btnName="How It Works" variant="link" />
                        <NavButton path="/contact" btnName="Contact" variant="link" />
                    </ul>
                </div>

                <div>
                    <p>
                        Legal
                    </p>
                    <ul className="flex flex-col">
                        <NavButton path="/privacy-policy" btnName="Privacy Policy" variant="link" />
                        <NavButton path="/terms-of-service" btnName="Terms of Service" variant="link" />
                    </ul>
                </div>
            </div>

            <p className="flex justify-center bg-gray-500" ><span><FaRegCopyright className="" /></span>2026 Aryse. All rights reserved.</p>
        </footer>
    )
}