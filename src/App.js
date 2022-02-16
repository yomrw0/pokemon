import axios from "axios";
import React from "react";
import Data from "./components/Data";

export default function App() {

  const pokeInfo = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    return await (await axios.get(pokeData)).data;
  }

  return (
    <Data pokeInfo={pokeInfo()}/>
  );
}