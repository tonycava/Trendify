import React, { FC, useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Card from "../../components/Card/Card";
import css from './Trend.module.css'
import { BASE_URL } from "../../../environments/env";

type TrendProps = {}

type TrendSchemaFromAPI = {
  Id: number
  Views: string
  Follow: string
  Category: string
  Tag: string
  TrendTopImg: string
}

const Trend: FC<TrendProps> = () => {
  const [search, setSearch] = useState<string>("");
  const [cards, setCards] = useState<TrendSchemaFromAPI[]>([])
  
  useEffect(() => {
    axios.get(`${BASE_URL}/api`, {
      headers: {
        "admin": true
      }
    })
      .then(({ data }) => setCards(data))
      .catch((err) => console.log(err))
  }, [])
  
  
  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <div id={css.containerCard}>
        {cards.map((card, index) => card.Category.toLowerCase().includes(search) &&
          <Card key={index} result={card} indexCard={index}/>)}
      </div>
    </div>
  );
};

export default Trend;