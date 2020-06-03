import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import axios from "axios";

import { LeafletMouseEvent } from "leaflet";

import { Map, TileLayer, Marker } from "react-leaflet";
import logo from "../../assets/logo.svg";

import "./styles.css";

interface Item {
  id: number;
  title: string;
  image_ulr: string;
}

interface IBGRes {
  sigla: string;
}
interface IBGResCity {
  nome: string;
}

const Create = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [ufs, setUfs] = useState<string[]>([]);

  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");

  const [selectedCity, setSelectedCity] = useState("0");

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("items").then((res) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGRes[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
      )
      .then((res) => {
        const ufInitials = res.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    axios
      .get<IBGResCity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cityName = res.data.map((city) => city.nome);

        setCities(cityName);
      });
  }, [selectedUf]);

  function handleCities(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handlePin(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

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

          <Map center={initialPosition} zoom={15} onclick={handlePin}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State</label>
              <select
                value={selectedUf}
                name="uf"
                id="uf"
                onChange={handleSelectUf}
              >
                <option value="0">Select one state</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select
                onChange={handleCities}
                value={selectedCity}
                name="city"
                id="city"
              >
                <option value="0">Select one city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_ulr} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Create Point!</button>
      </form>
    </div>
  );
};

export default Create;
