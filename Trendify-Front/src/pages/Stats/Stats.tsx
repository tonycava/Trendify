import React, { FC, useEffect, useState } from 'react';
import axios from "axios";
import css from "./Stats.module.css"
import Chart, { ChartEvent } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Navbar from "../../components/Navbar/Navbar";
import { BASE_URL } from "../../../environments/env";

type StatsProps = {}

const Stats: FC<StatsProps> = () => {
  Chart.register(CategoryScale);
  
  const [graph, setGraph] = useState<any>()
  
  useEffect(() => {
    axios.get(`${BASE_URL}/api`, {
      headers: { "admin": true }
    })
      .then(({ data }) => setGraph(data))
      .catch((err) => console.log(err))
  }, [])
  
  let countFollow: number = 0
  let countView: number = 0
  
  let xAxisGraph: string[] = []
  let yAxisGraph: number[] = []
  
  
  graph?.map((item: any) => {
    const viewCategory: number = parseFloat(item.Views.slice(0, - 1).replaceAll(',', '.'))
    const followCategory: string = item.Follow.replaceAll(',', '.')
    
    if (!isNaN(Number(followCategory.slice(0, - 1)))) {
      if (followCategory.slice(- 1) === 'k') countFollow += parseFloat(followCategory.slice(0, - 1)) / 1000
      else countFollow += parseFloat(followCategory.slice(0, - 1))
    }
    
    xAxisGraph.push(item.Category)
    
    if (item.Views.slice(- 1) === 'M') {
      if (isNaN(viewCategory * 1000) || isNaN(viewCategory * 1000)) return;
      
      countView += viewCategory * 1000
      yAxisGraph.push(viewCategory * 1000)
      
    } else {
      if (isNaN(viewCategory * 1000) || isNaN(viewCategory * 1000)) return
      
      countView += viewCategory
      yAxisGraph.push(viewCategory)
    }
  })
  
  
  const dataGraph = {
    labels: xAxisGraph,
    datasets: [{
      label: 'Number of viewers in thousands',
      position: 'bottom',
      color: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
      data: yAxisGraph,
    }]
  };
  
  countView = Math.round(countView)
  countFollow = Math.round(countFollow)
  
  return (
    <div>
      <Navbar/>
      <div id={css.containerStats}>
        <div className={css.stats}>
          <span className={css.countView}>{countFollow}M followers in the top 30</span>
          <span className={css.countView}>{countView}K viewers in the top 30</span>
        </div>
      </div>
      <Line style={{ marginTop: "300px" }} height="100%" data={dataGraph} options={{
        scales: {
          x: {
            display: true,
            ticks: {
              color: 'rgb(255, 99, 132)',
            },
          },
          y: {
            ticks: {
              callback: function (value, index, ticks){
                return value + 'k'
              }
            },
            display: true,
            type: 'logarithmic'
          },
        },
      }}/>
    </div>
  );
};

export default Stats;