import aryseLogo from "../assets/aryse-logo.svg";

export default function AryseLogo() {
    return (
        <img src={aryseLogo}
                    alt="Aryse"
                    loading="eager"
                    className=" cursor-pointer w-24 h-auto"
        />
        // my logo is horizontal so make h auto and control width    
    )
}