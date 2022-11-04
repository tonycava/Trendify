import React, { FC } from 'react';
import css from "./Credit.module.css"
import Navbar from "../../components/Navbar/Navbar";

type CreditProps = {}

const Credit: FC<CreditProps> = () => {
  return (
    <>
      <Navbar/>
      <div className={css.container}>
          <span id={css.anthony}>CAVAGNÉ Anthony : Get the data from the bot and write in a JSON and then write in DB /
              Do the route of the serveur to get the data in the FrontEnd </span>
        
        <span id={css.matis}>BLONDY MATIS : Bot to scrap of twitch and get the top 30 tendance and for
              each tendance get the top 4 streamer / Display data for the user</span>
      </div>
      <div className={css.logo}>
        <img src="https://git.ytrack.learn.ynov.com/avatars/e0b86c5676cdbac00ac3ab4794f41684?size=580"
             alt="logo git for anthony"/>
        <img src="https://git.ytrack.learn.ynov.com/avatars/6adecdeb79a30b9b0f36967d50c4c00e?size=580"
             alt="logo git for matis"/>
      </div>
    </>
  );
}


export default Credit
