
import { useEffect, useRef, useState } from 'react';
import rpsAll from "../icons/rps-all.png"
import "./Live.css"
import {rpsResult, colorMapping, iconMapping} from "../util";


const Live = () => {
  const [games, setGames] = useState({onGoing: [], finnished: []})
  const socket = useRef(null)
  const showLastNResults = 5

  useEffect(() => {
    socket.current = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live")

    socket.current.addEventListener('open', () => console.log("Connected to WS"))
    socket.current.addEventListener('error', (e) => console.log("Failed connecting WS"))

    socket.current.addEventListener('message', (event) => {
      const phase = JSON.parse(JSON.parse(event.data)) // https://stackoverflow.com/questions/42494823/json-parse-returns-string-instead-of-object

      if (phase.type === "GAME_BEGIN") {
        setGames(games => ({...games, onGoing: games.onGoing.concat(phase)}))
      } 
      else if (phase.type === "GAME_RESULT") {
        phase.playerA.status = rpsResult(phase.playerA.played, phase.playerB.played)
        phase.playerB.status = rpsResult(phase.playerB.played, phase.playerA.played)
        setGames(games => (
          {
            onGoing: games.onGoing.filter(g => g.gameId !== phase.gameId), 
            finnished: games.finnished.slice(- showLastNResults + 1).concat(phase)
          }
        ))
      }
    })
    return(() => socket.current.close())
  }, [])

  return(
    <div>
      <div id="banner">
        <h1 id="live-main-header">
          Live
        </h1>
        <h3 id="live-info">
          {`Here you can see all ongoing games and results of last ${showLastNResults} games`}
        </h3>
      </div>

      <h2 className="result-list-header">
        Ongoing games
      </h2>

      <ul className="result-list ongoing-list">
        {games.onGoing.slice(0).reverse().map( g =>
          <li key={g.gameId}>
            <div>
              {g.playerA.name}
            </div>
            <img src={rpsAll} alt="rps"></img>
            <div>
              {g.playerB.name}
            </div>
          </li>
        )}
      </ul>

      <h2 className="result-list-header">
        Latest results
      </h2>

      <ul className="result-list finnish-list">
        {games.finnished.slice(0).reverse().map( g =>
          <li key={g.gameId}>
            <div style={{backgroundColor: colorMapping[g.playerA.status]}}>
              <span>{g.playerA.name}</span>
              <span>
                <img src={iconMapping[g.playerA.played]} alt = {g.playerA.played}></img>
              </span>
            </div>
            <div style={{backgroundColor: colorMapping[g.playerB.status]}}>
              <span>{g.playerB.name}</span>
              <span>
                <img src={iconMapping[g.playerB.played]} alt = {g.playerB.played}></img>
              </span>
            </div>
          </li>
        )}
      </ul>
			
    </div>
  )
}

export default Live