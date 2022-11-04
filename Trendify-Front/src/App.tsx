import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Trend from "./pages/Trend/Trend";
import Credit from "./pages/Credit/Credit";
import Home from "./pages/Home/Home";
import TrendId from "./pages/TrendId/TrendId";
import Stats from "./pages/Stats/Stats";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/credit" element={<Credit/>}/>
        
        <Route path="/twitch/trend/" element={<Trend/>}/>
        <Route path="/trend/:id/" element={<TrendId/>}/>
        <Route path="/twitch/stats" element={<Stats/>}/>
        
        <Route path="*" element={<Navigate to={"/home"}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
