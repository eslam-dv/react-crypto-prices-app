import { Link } from "react-router-dom";

import "./nav.css";

export const Navbar = () => {
  return (
    <header>
      <nav className="container">
        <h1>
          <Link to="/">
            Crypto <span>Prices</span>
          </Link>
        </h1>
      </nav>
    </header>
  );
};
