import { Link } from "react-router"

export default function NavButton({path, btnName, variant = "nav"}) {

    // Because content should determine the size of the nav links.
    const styles = {
  nav: " text-teal-600 font-semibold hover:text-teal-700",

  signin:
    "p-2 text-lg text-green-600 font-semibold hover:shadow-md",

  createAccount:
    "pt-2 px-2 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800",

    link: "cursor-pointer text-gray-600",

    SMlink: "size-6 font-bold cursor-pointer text-gray-600"
};


    // Select the correct style based on the variant prop, falling back to "nav" if unmatched
    const selectedStyle = styles[variant] || styles.nav;

    return (
        <Link to={path} className={selectedStyle}>
            {btnName}
        </Link>
    )
}

// react Link uses <a>, both <a> & <button> are interactive so don't overlap.
// Link disguise as button for nav and btn for action

