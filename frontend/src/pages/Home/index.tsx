import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoproj" />
        </header>

        <main>
          <h1>Your waste collection marketplace!</h1>
          <p>We help people to find collection points efficiently</p>

          <Link to="/create">
            <span>
              <FiLogIn />
            </span>
            <strong>register a collection point</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
