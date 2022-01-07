import { useEffect, useState } from "react";
import {rpsResult, iconMapping, constructPlayerStatistics} from "../util";
import GenericTable from "./GenericTabel";
import "./PlayerResults.css";
import service from "../service"
import PaginationButtons from "./PaginationButtons";
import useApiCall from "../hooks/useApiCall";
import useListPagination from "../hooks/useListPagination";

const PlayerResults = ({name}) => {
	const [results, loading, error] = useApiCall(() => service.getHistoricalResults(name))
	const [statistics, setStatistics] = useState(null)
	const [showing, setShowing] = useState("summary")

	const itemsPerPage = 100
	const [paginate, page, setPage] = useListPagination(itemsPerPage)

	useEffect(() => {
		if (results) {
			setStatistics(constructPlayerStatistics(results))
		}
	}, [results])

	if (error) {
		alert(error)
 		return null
	}

	if(loading) {
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
		.concat(paginate(results).map(g => [
			g.playerB.name, 
			<img src={iconMapping[g.playerA.played]} alt="hand"></img>, 
			<img src={iconMapping[g.playerB.played]} alt="hand"></img>,
			new Date(g.t).toDateString(),
			rpsResult(g.playerA.played, g.playerB.played)
		]))

	const content = () => {
		switch (showing) {
			case "summary":
				return <GenericTable tableArray={summarytableContents} cl firstRowHeader={false}/>
			case "games":
				return (
					<>
						<PaginationButtons 
							nPages={Math.ceil(statistics.nGames / itemsPerPage)} 
							currentPage={page} 
							changePageFunc={setPage} 
							className={"pagination-button-wrap"}
						/>
						<GenericTable tableArray={gamesTableContents} firstRowHeader={true}/>
						<PaginationButtons 
							nPages={Math.ceil(statistics.nGames / itemsPerPage)} 
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