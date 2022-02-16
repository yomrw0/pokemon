import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Data(props) {

  const [name, setName] = useState('');
  const [genus, setGenus] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [explain, setExplain] = useState('');
  const [types, setType] = useState({ type0: '', type1: '' });
  const { type0, type1 } = types;
  const [characteristics, setCharacteristics] = useState({ chara0: '', chara1: '' })
  const { chara0, chara1 } = characteristics;
  const kor = 'ko';
  
  const getPokeProfile = async () => {
    const info = await props.pokeInfo;

    setNumber(info.id);
    setHeight(info.height);
    setWeight(info.weight);
    setImage(info.sprites.other['official-artwork'].front_default); 

  }

  // 포켓몬 속성과 타입은 각각 1~2개씩이다.
  const getPokeInfo = async () => {
    const types_0 = await (await axios.get(info.types[0].type.url)).data.names[1]
    const types_1 = await (await axios.get(info.types[1].type.url)).data.names[1]
    const chara_0 = await (await axios.get(info.abilities[0].ability.url)).data.names[1].name
    const chara_1 = await (await axios.get(info.abilities[1].ability.url)).data.names[1].name

    setCharacteristics({ chara0: chara_0, chara1: chara_1 })

    if (types_1.language.name === kor && types_0.language.name === kor) {
      setType({ type0: types_1.name, type1: types_0.name })
    }
  }

  const getPokeDetailInfo = async () => {
    const info = await props.pokeInfo;
    const species = await (await axios.get(info.species.url)).data;
    const flavorText = species.flavor_text_entries[75];
    const genera = species.genera[1];

    if (species.names[2].language.name === kor) {
      setName(species.names[2].name);
    }

    if (flavorText.language.name === kor && flavorText.version.name === 'sword') {
      setExplain(flavorText.flavor_text)
    }

    if (genera.language.name === kor) {
      setGenus(genera.genus)
    }

    getPokeGender(species.gender_rate)
  }

  const getPokeGender = gender_rate => {
    switch (gender_rate) {
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

  useEffect(() => {
    getPokeProfile()
    getPokeInfo()
    getPokeDetailInfo()
  }, [])

  return (
    <>
      <ul>
        <li>도감 번호 = {number}</li>
        <li>포켓몬 이름 = {name}</li>
        <li>포켓몬 설명 = {explain}</li>
        <li>포켓몬 타입 = {type0} {type1}</li>
        <li>포켓몬 키 = {height}</li>
        <li>포켓몬 몸무게 = {weight}</li>
        <li>포켓몬 성별 = {gender}</li>
        <li>포켓몬 분류 = {genus}</li>
        <li>포켓몬 특성 = {chara0} {chara1}</li>
        <img src={image} alt='포켓몬 이미지'/>
      </ul>
    </>
  )
}