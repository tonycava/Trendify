import React, { FC } from 'react';
import css from "./Home.module.css"
import { Link } from "react-router-dom";

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  
  return (
    <div className={css.wrapContentInCentre}>
      <div className={css.textBox}>
        <span className={css.heading}>Navigate to a Trend !</span>
      </div>
      <div className={css.container}>
        
        <div className={css.containerImg}>
          <Link to="/twitch/trend">
            <img className={css.img} src="https://blog.twitch.tv/assets/uploads/03-glitch.jpg" alt="twitch image"/></Link>
        </div>
        
        <div className={css.containerImg}>
          <Link to="#">
            <img className={css.img} src="https://www.foodette.fr/files/products/coming-soon-logo_okok-721x524.jpg"
                 alt="twitch image"/></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;