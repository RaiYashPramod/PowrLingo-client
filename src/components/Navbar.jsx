import { Link } from "react-router-dom";
import { UserCircle2, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  const closeMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg text-white bg-black font-mono h-auto p-8"
        role="navigation"
      >
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-white font-mono text-xl">
            <Link to="/" aria-label="Home">
              PowrLingo
            </Link>
          </h3>
          <div className="lg:flex lg:flex-row-reverse justify-between text-lg w-[30rem] hidden">
            <Link to="/user" aria-label="User Profile">
              <UserCircle2 className="w-8 h-8" />
            </Link>
            <a href="/" onClick={handleLogOut} aria-label="Logout">
              Logout
            </a>
            <Link to="/quiz" aria-label="Quiz">
              Quiz
            </Link>
            <Link to="/leaderboard" aria-label="Leaderboard">
              LeaderBoard
            </Link>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            <MenuIcon className="text-white h-6 w-6 cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-black text-white transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center space-y-6 p-6 text-xl">
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <X className="text-white h-6 w-6 cursor-pointer" />
          </button>
          <Link to="/user" onClick={closeMenu}>
            <UserCircle2 className="w-20 h-20" />
          </Link>
          <a href="/" onClick={handleLogOut}>
            Logout
          </a>
          <Link to="/quiz" onClick={closeMenu}>Quiz</Link>
          <Link to="/leaderboard" onClick={closeMenu}>Leader-Board</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
