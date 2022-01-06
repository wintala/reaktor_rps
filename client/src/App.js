
import './App.css';
import HistoricalResults from './components/HistoricalResults';
import Live from "./components/Live"
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useEffect } from 'react';
import service from "./service"


const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    service.syncDB()
    .then(_ => console.log("DB synced"))
    .catch(e => console.log("DB sync failed"))
    // since there is no automated cron job like task, db is synced every time client session is started 
    // (this will obviosly take unacceptable amount of time if the last sycn has happened long time ago)
  }, [])

  return(  
    <> 
    <div id="nav" onClick={() => navigate(window.location.pathname === "/" ? "history": "/")}>
      {window.location.pathname === "/" ? "Historical results": "Live"}
    </div>
    <Routes>
      <Route path="/" element={<Live/>} />
      <Route path="/history" element={<HistoricalResults />} />
    </Routes>
    </>
  )
}

export default App;
