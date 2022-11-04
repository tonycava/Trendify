import React, { Dispatch, FC, SetStateAction } from 'react';
import css from "./Navbar.module.css"
import { Link } from "react-router-dom";

type NavbarProps = {
  setSearch?: Dispatch<SetStateAction<string>>
}

const Navbar: FC<NavbarProps> = ({setSearch}) => {
  return (
    <>
      <header>
        
        <label id={css.containerInputSearch}>
          <input onChange={(e) => setSearch && setSearch(e.target.value.toLowerCase())} id={css.inputSearch} placeholder="Search Trend..." type="search"/>
        </label>
        <span id={css.slogan}>Trend With Trendify</span>
      </header>
      <nav id={css.subnav}>
        <ul className={css.containerList}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/twitch/trend">Trend</Link></li>
          <li><Link to="/twitch/stats">Stats</Link></li>
          <li><Link to="/credit">Credit</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;