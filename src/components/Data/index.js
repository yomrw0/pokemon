import axios from "axios";
import React, { useState, useEffect } from "react";


export default function Data() {
  
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [explain, setExplain] = useState('');
  const [types, setType] = useState({type1 : '', type2 : ''});
  const {type1, type2} = types
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [genus, setGenus] = useState('');
  const [characteristics, setCharacteristics] = useState('');


  const pokeNumbers = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur = datas.data;
    setNumber(bulbasaur.id);
    setHeight(bulbasaur.height)
    setWeight(bulbasaur.weight)
  }

  const pokeName = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur = await axios.get(datas.data.species.url);
    if(bulbasaur.data.names[2].language.name === "ko") {
      setName(bulbasaur.data.names[2].name);
    }
    
  }

  const pokeExplain = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur = await axios.get(datas.data.species.url);
    const flavorText = bulbasaur.data.flavor_text_entries[75];
    if(flavorText.language.name === 'ko' && flavorText.version.name === 'sword') {
      setExplain(flavorText.flavor_text)
    }
  }

  const pokeType = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur_0 = await axios.get(datas.data.types[0].type.url)
    const bulbasaur_1 = await axios.get(datas.data.types[1].type.url)
    if(bulbasaur_1.data.names[1].language.name === 'ko' && bulbasaur_0.data.names[1].language.name === 'ko') {
      setType({type1 :bulbasaur_1.data.names[1].name, type2: bulbasaur_0.data.names[1].name})
    }
  }

  const pokeGender = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur = datas.data;
    console.log(bulbasaur)
  }

  const pokeGenus = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur = datas.data;
    console.log(bulbasaur)
  }
  
  const pokeCharacteristics = async () => {
    const pokeAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0");
    const pokeData = pokeAPI.data.results[0].url;
    const datas = await axios.get(pokeData);
    const bulbasaur = datas.data;
    console.log(bulbasaur)
  }

  useEffect(() => {
    pokeNumbers()
    pokeName()
    pokeExplain()
    pokeType()
    pokeGender()
    // pokeGenus()
    // pokeCharacteristics()
  }, [])

  
    return (
      <>
        <ul>
          <li>도감 번호 = {number}</li>
          <li>포켓몬 이름 = {name}</li>
          <li>포켓몬 설명 = {explain}</li>
          <li>포켓몬 타입 = {type1} {type2}</li>
          <li>포켓몬 키 = {height}</li>
          <li>포켓몬 몸무게 = {weight}</li>
          <li>포켓몬 성별 = {gender}</li>
          <li>포켓몬 분류 = {genus}</li>
          <li>포켓몬 특성 = {characteristics}</li>
        </ul>
      </>
    )
}