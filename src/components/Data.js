import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Data(props) {

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [explain, setExplain] = useState('');
  const [types, setType] = useState({ type1: '', type2: '' });
  const { type1, type2 } = types;
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [genus, setGenus] = useState('');
  const [characteristics, setCharacteristics] = useState({ chara1: '', chara2: '' })
  const { chara1, chara2 } = characteristics;
  const [image, setImage] = useState('');


  const pokeNumbers = async () => {
    const info = await props.pokeInfo;
    setNumber(info.id);
    setHeight(info.height);
    setWeight(info.weight);
  }

  const pokeName = async () => {
    const info = await props.pokeInfo;
    const bulbasaur = await axios.get(info.species.url);
    if (bulbasaur.data.names[2].language.name === "ko") {
      setName(bulbasaur.data.names[2].name);
    }
  }

  const pokeExplain = async () => {
    const info = await props.pokeInfo;
    const bulbasaur = await axios.get(info.species.url);
    const flavorText = bulbasaur.data.flavor_text_entries[75];
    if (flavorText.language.name === 'ko' && flavorText.version.name === 'sword') {
      setExplain(flavorText.flavor_text)
    }
  }

  const pokeType = async () => {
    const info = await props.pokeInfo;
    const bulbasaur_0 = await axios.get(info.types[0].type.url)
    const bulbasaur_1 = await axios.get(info.types[1].type.url)
    if (bulbasaur_1.data.names[1].language.name === 'ko' && bulbasaur_0.data.names[1].language.name === 'ko') {
      setType({ type1: bulbasaur_1.data.names[1].name, type2: bulbasaur_0.data.names[1].name })
    }
  }

  const pokeGender = async () => {
    const info = await props.pokeInfo;
    const bulbasaur = await axios.get(info.species.url)
    switch (bulbasaur.data.gender_rate) {
      case 0:
        setGender("수컷");
        break;
      case 1:
        setGender("수컷 87.5%, 암컷 12.5%");
        break;
      case 2:
        setGender("수컷 75% 암컷 25%");
        break;
      case 4:
        setGender("수컷 50% 암컷 50%");
        break;
      case 6:
        setGender("수컷 25% 암컷 75%");
        break;
      case 8:
        setGender("암컷");
        break;
      case -1:
        setGender("무성");
        break;
    }
  }

  const pokeGenus = async () => {
    const info = await props.pokeInfo;
    const bulbasaur = await axios.get(info.species.url)
    if (bulbasaur.data.genera[1].language.name === 'ko') {
      setGenus(bulbasaur.data.genera[1].genus)
    }
  }

  const pokeCharacteristics = async () => {
    const info = await props.pokeInfo;
    const bulbasaur_0 = await axios.get(info.abilities[0].ability.url)
    const bulbasaur_1 = await axios.get(info.abilities[1].ability.url)
    setCharacteristics({ chara1: bulbasaur_0.data.names[1].name, chara2: bulbasaur_1.data.names[1].name })
  }

  const pokeImage = async () => {
    const info = await props.pokeInfo;
    const bulbasaur = await axios.get(info.species.url);
    setImage(info.sprites.other['official-artwork'].front_default)

  }

  useEffect(() => {
    pokeNumbers()
    pokeName()
    pokeExplain()
    pokeType()
    pokeGender()
    pokeGenus()
    pokeCharacteristics()
    pokeImage()
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
        <li>포켓몬 특성 = {chara1} {chara2}</li>
        <li>포켓몬 이미지 = <img src={image}/></li>
      </ul>
    </>
  )
}