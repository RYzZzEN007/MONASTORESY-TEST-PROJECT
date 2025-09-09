import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Monastery360</h2>
      <LanguageSwitcher />
    </nav>
  );
}
