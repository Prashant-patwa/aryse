import aryseLogo from "../assets/Aryse-logo.svg";

export default function AryseLogo() {
  return (
    <img
      src={aryseLogo}
      alt="Aryse"
      loading="eager"
      className="cursor-pointer w-28 h-auto object-contain"
    />
  );
}