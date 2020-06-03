import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import logo from "../../assets/logo.svg";

import "./styles.css";

const Create = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoproj" />
        <Link to="/">
          <FiArrowLeft />
          Home
        </Link>
      </header>

      <form>
        <h1>Register collection point</h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity Name</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Pin your address!</span>
          </legend>

          <Map center={[-16.6830628, -49.2537428]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-16.6830628, -49.2537428]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State</label>
              <select name="uf" id="uf">
                <option value="0">Select one state</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select one city</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Collect items</h2>
            <span>Select one or more items</span>
          </legend>
          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="oil" />
              <span>Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="oil" />
              <span>Oil</span>
            </li>
            <li className="selected">
              <img src="http://localhost:3333/uploads/oil.svg" alt="oil" />
              <span>Oil</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">Create Point!</button>
      </form>
    </div>
  );
};

export default Create;
