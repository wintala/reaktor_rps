import { useEffect, useState } from "react";
import {rpsResult, iconMapping} from "../util";
import GenericTable from "./GenericTabel";
import "./PlayerResults.css";
import service from "../service"
import PaginationButtons from "./PaginationButtons";

const PlayerResults = ({name}) => {
	const [statistics, setStatistics] = useState(null)
	const [showing, setShowing] = useState("summary")
	const [page, setPage] = useState(1)
	const gamesPerPage = 100

	useEffect(() => {
		service.getHistoricalResults(name)
		.then(d => {
			const games = d.map(g => g.playerA.name === name ? g : {...g, playerA: g.playerB, playerB: g.playerA}).sort((g) => g.t) // setting playerA to be always the player of interest
			const wins = games.filter(g => rpsResult(g.playerA.played, g.playerB.played) === "win").length
			
			const countHand = (hand) => games.filter(g => g.playerA.played === hand).length

			const playerHands = {
				SCISSORS: countHand("SCISSORS"),
				ROCK: countHand("ROCK"),
				PAPER: countHand("PAPER")
			}

			const keyWithHighestValue = (obj) => Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)

			setStatistics({
				games,
				nGames: games.length,
				wins,
				favoriteHand: keyWithHighestValue(playerHands),
				favoriteHandUsage: playerHands[keyWithHighestValue(playerHands)]
			})
		})
		.catch(e => alert(`Error occured while fetching player ${name} information: ${e}`))
	}, [name])

	if(!statistics) {
		return(
			<div id="player-statistics-wrap">
				<h1>{name} statistics</h1>
				<div>
					<img className="statistics-loading-image" src={iconMapping.ROCK} alt="rpsimage"></img>,
					<img className="statistics-loading-image" src={iconMapping.SCISSORS} alt="rpsimage"></img>,
					<img className="statistics-loading-image" src={iconMapping.PAPER} alt="rpsimage"></img>,
				</div>
				<div id="statistics-loading-text">Loading...</div>
			</div>	
		)
	}

	const summarytableContents = [
		["Games played", statistics.nGames],
		["Wins", statistics.wins],
		["Win ratio", `${(statistics.wins / statistics.nGames * 100).toPrecision(4)}%`],
		["Favorite hand", statistics.favoriteHand],
		["Favorite hand usage", (statistics.favoriteHandUsage / statistics.nGames  * 100).toPrecision(4) + "%"]
	]

	const gamesTableContents = [["Opponent", `${name.split(" ")[0]}'s hand`, "Opponents hand", "Day", "Result"]]
	.concat(
		statistics.games.slice((page - 1) * gamesPerPage, page * gamesPerPage).map(g => [
			g.playerB.name, 
			<img src={iconMapping[g.playerA.played]} alt="hand"></img>, 
			<img src={iconMapping[g.playerB.played]} alt="hand"></img>,
			new Date(g.t).toDateString(),
			rpsResult(g.playerA.played, g.playerB.played)
		])
	)

	const content = () => {
		switch (showing) {
			case "summary":
				return <GenericTable tableArray={summarytableContents} cl firstRowHeader={false}/>
			case "games":
				return (
					<>
						<PaginationButtons 
							nPages={Math.ceil(statistics.nGames / gamesPerPage)} 
							currentPage={page} 
							changePageFunc={setPage} 
							className={"pagination-button-wrap"}
						/>
						<GenericTable tableArray={gamesTableContents} firstRowHeader={true}/>
						<PaginationButtons 
							nPages={Math.ceil(statistics.nGames / gamesPerPage)} 
							currentPage={page} 
							changePageFunc={setPage} 
							className={"pagination-button-wrap"}
						/>
					</>
				)	
			default:
				return null;
		}
	}

	const viewAlterButton = (text, state) => {
		const activatedButtonStyle = {backgroundColor: "rgb(0, 102, 5)", cursor: "auto"}
		return(
			<button 
				style={showing === state ? activatedButtonStyle : null}
				onClick={() => setShowing(state)}
			>
				{text}
			</button>
		)
	}

	return(
		<div id="player-statistics-wrap">
			<h1>{name} statistics</h1>
			<div id="option-buttons-wrap">
				{viewAlterButton("Summary", "summary")}
				{viewAlterButton("Games", "games")}
			</div>
			{content()}
		</div>	
	)

}


export default PlayerResults