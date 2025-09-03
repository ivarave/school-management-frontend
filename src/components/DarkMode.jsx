import React, { useEffect } from "react";
import Sun from "./Sun.svg";
import Moon from "./moon.svg";
import "../styles/DarkMode.css";

const DarkMode = () => {
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkmode();
    } else {
      setLightmode();
    }
  };

  const setDarkmode = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightmode = () => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkmode();
  }

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <img src={Sun} alt="Sun" className="icon sun" />
        <img src={Moon} alt="Moon" className="icon moon" />
      </label>
    </div>
  );
};

export default DarkMode;
