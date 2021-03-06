import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Data(props) {

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [explain, setExplain] = useState('');
  const [types, setType] = useState({ type0: '', type1: '' });
  const { type0, type1 } = types;
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [genus, setGenus] = useState('');
  const [characteristics, setCharacteristics] = useState({ chara0: '', chara1: '' })
  const { chara0, chara1 } = characteristics;
  const [image, setImage] = useState('');


  const getPokeInfo = async () => {
    const info = await props.pokeInfo;
    const chara_0 = await axios.get(info.abilities[0].ability.url)
    const chara_1 = await axios.get(info.abilities[1].ability.url)
    const type_0 = await axios.get(info.types[0].type.url)
    const type_1 = await axios.get(info.types[1].type.url)
    const types_0 = type_0.data.names[1];
    const types_1 = type_1.data.names[1];

    setNumber(info.id);
    setHeight(info.height);
    setWeight(info.weight);
    setImage(info.sprites.other['official-artwork'].front_default);
    setCharacteristics({ chara0: chara_0.data.names[1].name, chara1: chara_1.data.names[1].name })
    if (types_1.language.name === 'ko' && types_0.language.name === 'ko') {
      setType({ type0: types_1.name, type1: types_0.name })
    }
  }

  const getPokeDetailInfo = async () => {
    const info = await props.pokeInfo;
    const species = await axios.get(info.species.url);
    const flavorText = species.data.flavor_text_entries[75];
    const genera = species.data.genera[1];

    if (species.data.names[2].language.name === "ko") {
      setName(species.data.names[2].name);
    }

    if (flavorText.language.name === 'ko' && flavorText.version.name === 'sword') {
      setExplain(flavorText.flavor_text)
    }

    if (genera.language.name === 'ko') {
      setGenus(genera.genus)
    }

    getPokeGender(species.data.gender_rate)
  }

  const getPokeGender = gender_rate => {
    switch (gender_rate) {
      case 0:
        setGender("??????");
        break;
      case 1:
        setGender("?????? 87.5%, ?????? 12.5%");
        break;
      case 2:
        setGender("?????? 75% ?????? 25%");
        break;
      case 4:
        setGender("?????? 50% ?????? 50%");
        break;
      case 6:
        setGender("?????? 25% ?????? 75%");
        break;
      case 8:
        setGender("??????");
        break;
      case -1:
        setGender("??????");
        break;
    }
  }

  useEffect(() => {
    getPokeInfo()
    getPokeDetailInfo()
  }, [])

  return (
    <>
      <ul>
        <li>?????? ?????? = {number}</li>
        <li>????????? ?????? = {name}</li>
        <li>????????? ?????? = {explain}</li>
        <li>????????? ?????? = {type0} {type1}</li>
        <li>????????? ??? = {height}</li>
        <li>????????? ????????? = {weight}</li>
        <li>????????? ?????? = {gender}</li>
        <li>????????? ?????? = {genus}</li>
        <li>????????? ?????? = {chara0} {chara1}</li>
        <li>????????? ????????? = <img src={image} /></li>
      </ul>
    </>
  )
}