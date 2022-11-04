import React, { FC } from 'react';
import css from "./Card.module.css"

type CardProps = {
  result: {
    Id: number
    Views: string
    Follow: string
    Category: string
    Tag: string
    TrendTopImg: string
  }
  indexCard: number
}

const Card: FC<CardProps> = ({ result, indexCard }) => {
  return (
    <div style={{ backgroundImage: `url(${result.TrendTopImg})` }} className={css.card}>
      <div className={css.bottom}>
        <span className={css.category}>#{indexCard + 1} {result.Category}</span>
        <button className={css.btn}><a href={`/trend/${indexCard + 1}`}>See more details</a></button>
      </div>
    </div>
  );
};

export default Card;