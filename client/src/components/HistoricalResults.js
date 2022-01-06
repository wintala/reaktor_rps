import { useState } from "react"
import service from "../service";
import PlayerResults from "./PlayerResults";
import "./HistoricalResults.css"
import { useEffect } from "react";

const HistoricalResults = () => {
	const [players, setPlayers] = useState(null)
	const [selectedPlayer, setSelectedPlayer] = useState(null)
	const [searchFilter, setSearchFilter] = useState("")

	useEffect(() => {
     service.getPlayerNames()
		.then(data => setPlayers(data))
		.catch(e => alert(`Error occured while fetching playernames: ${e}`))
  }, [])

	return(
		<>
		<div id="banner">
			<h1 id="live-main-header">
				Historical statistics
			</h1>
			<h3 id="live-info">
				Chooce player to inspect
			</h3>
		</div>

		<div id="history-wrap" onClick={() => selectedPlayer ? setSelectedPlayer(null) : null}>
			{players ?
			<>
			<input
					id="player-filter"
					placeholder="search"
					type="text"
					value={searchFilter}
					onChange={({ target }) => setSearchFilter(target.value)}
			/>
			<ul id="player-list">
				{players.filter(n => n.toLowerCase().includes(searchFilter.toLowerCase())).map(n =>
				<li key={n} onClick={() => setSelectedPlayer(n)}>
					{n}
				</li>
				)}
			</ul> 
			</>:
			<div className="loading">Loading data...</div>}
		</div>
		{selectedPlayer ? <PlayerResults name = {selectedPlayer}/> : null}
		</>
	)

}

export default HistoricalResults