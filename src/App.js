import axios from "axios";
import Data from "./components/Data";
import React from "react";

export default function App() {

  const PokeInfo = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const info = datas.data;
    return info;
  }

  return (
    <Data pokeInfo={PokeInfo()}/>
  );
}