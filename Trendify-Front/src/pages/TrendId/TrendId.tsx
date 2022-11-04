import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import css from "./TrendId.module.css"
import { BASE_URL } from "../../../environments/env";

type TrendIdProps = {}

type TrendLive = {
  Id: number,
  SpecTop: string,
  NameTop: string,
  ImgTop: string,
  UrlTopLive: string,
  NameTopLive: string,
  TrendId: number
}

type SingleTrendFromApi = {
  Id: number,
  Views: string,
  Follow: string,
  Category: string,
  Tag: string,
  TrendTopImg: string,
  TrendLive: TrendLive[]
}

const TrendId: FC<TrendIdProps> = () => {
  const { id } = useParams()
  const [trend, setTrend] = useState<SingleTrendFromApi>()
  
  useEffect(() => {
    axios.get(`${BASE_URL}/api/${id}`, {
      headers: {
        "admin": true
      }
    })
      .then(({ data }) => setTrend(data[0]))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <Navbar/>
      <div id={css.containerTrend}>
        <div id={css.containerImg}>
          <img id={css.trendImg} src={trend?.TrendTopImg} alt="Trend Image"/>
        </div>
        <span id={css.trendName}>Name : {trend?.Category}</span>
        <div id={css.side}>
          <span id={css.trendView}>Number of views : ${trend?.Views}</span>
          <span id={css.trendFollow}>Number of follows : ${trend?.Follow}</span>
          <span id={css.trendTag}> Tag : {trend?.Tag.replaceAll(',', ', ')}</span>
        </div>
      </div>
      
      <span id={css.trendLive}>Top 4 on this Trend :</span>
  
      
      <div id={css.containerLive}>
        {trend?.TrendLive[0].SpecTop.split(".").map((item, idx) => {
          
            const nameLive = trend?.TrendLive[0].NameTop.split('\n')[idx]
          
            const label = trend?.TrendLive[0].ImgTop.split(',')[idx]
            const link = trend?.TrendLive[0].UrlTopLive.split(',')[idx]
            const streamer = trend?.TrendLive[0].NameTopLive.split(',')[idx]
          
            return (
              <div key={idx} className={css.live} style={{
                backgroundImage: `url(${label})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                width: '100%'
              }}>
                <div className={css.top}>
                  <span className={css.trendLiveStreamer}>Name of the streamer : {streamer}</span>
                </div>
                <div className={css.bottom}>
                  <span className={css.trendLiveName}>Title : {nameLive}</span>
                  <span className={css.trendLiveSpec}>Number of viewvers : {item}</span>
                  <a className={css.trendurl} href={link === undefined ? `https://www.twitch.tv/directory/${trend.Category.replaceAll(" ", "%20")}` : link} target="_blank">Link to his stream</a>
                </div>
              </div>
            )
          }
        )}
      </div>
    </>
  );
};

export default TrendId;