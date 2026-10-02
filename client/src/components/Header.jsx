import AryseLogo from "./AryseLogo"
import NavButton from "./NavButton"

export default function Header() {
  return (
    <header className="w-full border-2 border-teal-700 h-16 py-3  px-2 bg-teal-50">

      <div className="flex justify-around items-end " >
        <AryseLogo className="self-end" />

        <div className="flex gap-4">
          <NavButton path="/" btnName="Home" variant="nav" />
          <NavButton path="/campaigns" btnName="Explore Projects" variant="nav" />
          <NavButton path="/about" btnName="How It Works" variant="nav" />
        </div>

        <div className="flex gap-4">
          <NavButton path="/login" btnName="Sign In" variant="signin" />
          <NavButton path="/signup" btnName="Create Account" variant="createAccount" />
        </div>
      </div>
    </header>
  );
}

// Structure
//    ↓
// Parent controls layout
//    ↓
// Children participate in that layout
//    ↓
// Children should NOT fight the parent

// <header className="border-b border-[#0F8F83] bg-[#F0FDFA]">
//   <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

//     <AryseLogo />

//     <div className="flex items-center gap-6">
//       <NavButton path="/" btnName="Home" variant="nav" />
//       <NavButton path="/about" btnName="How It Works" variant="nav" />
//       <NavButton
//         path="/explore-campaigns"
//         btnName="Explore Projects"
//         variant="nav"
//       />
//     </div>

//     <div className="flex items-center gap-4">
//       <NavButton path="/login" btnName="Sign In" variant="signin" />
//       <NavButton
//         path="/signup"
//         btnName="Create Account"
//         variant="createAccount"
//       />
//     </div>

//   </div>
// </header>