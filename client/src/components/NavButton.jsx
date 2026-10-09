import { Link } from "react-router";

export default function NavButton({ to, path, name, btnName, variant = "nav" }) {
  // Support both 'to' and 'path' props for flexible routing, as well as 'name' / 'btnName'
  const linkTarget = to || path || "#";
  const label = name || btnName;

  const styles = {
    nav:
      "text-slate-600 hover:text-teal-600 font-medium text-sm py-1 border-b-2 border-transparent hover:border-teal-600 transition-all whitespace-nowrap",

    signin:
      "px-5 py-2 border border-teal-600 text-teal-600 hover:bg-teal-50/50 rounded-lg font-medium text-sm transition-colors whitespace-nowrap",

    createAccount:
      "px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium text-sm transition-colors whitespace-nowrap shadow-sm",

    link: "text-teal-100/80 hover:text-white text-sm transition-colors block py-1",

    SMlink: "text-white/80 hover:text-white text-xl p-2 rounded-full hover:bg-teal-800/40 transition-colors inline-flex items-center justify-center"
  };

  const selectedStyle = styles[variant] || styles.nav;

  return (
    <Link to={linkTarget} className={selectedStyle}>
      {label}
    </Link>
  );
}