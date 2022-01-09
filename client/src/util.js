
import rock from "./icons/rock.png"
import paper from "./icons/paper.png"
import scissors from "./icons/scissors.png"

const iconMapping = {
	SCISSORS: scissors,
	ROCK: rock,
	PAPER: paper
}

const colorMapping = {
	"win": "rgb(128, 255, 128)",
	"lose": "rgb(255, 118, 118)",
	"tie": "rgb(168, 168, 168)"
}

const rpsResult = (player, opponent) => {
	switch (true) {
		case (player === opponent):
			return "tie"
		case (player === "SCISSORS" && opponent === "PAPER"):
				return "win"
		case (player === "PAPER" && opponent === "ROCK"):
				return "win"
		case (player === "ROCK" && opponent === "SCISSORS"):
				return "win"
		default:
			return "lose"
	}
}

const constructPlayerStatistics = (results, name) => {

	let statistics = {
		nGames: results.length,
		wins: 0,
		hands: {
			ROCK: 0,
			SCISSORS: 0,
			PAPER: 0
		}
	}

	const handelResult = (r) => {
		const player = r.playerA.name === name ? r.playerA : r.playerB 
		const opponent = r.playerA.name === name ? r.playerB : r.playerA 

		return({
			win: rpsResult(player.played, opponent.played) === "win",
			hand: player.played
		})	
	}

	results.forEach((r) => {
		const summary = handelResult(r)
		statistics.wins += summary.win
		statistics.hands[summary.hand] += 1
	})

	const keyWithHighestValue = (obj) => Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)

	statistics.favoriteHand = keyWithHighestValue(statistics.hands)
	statistics.favoriteHandUsage = statistics.hands[statistics.favoriteHand]

	return statistics
}

const logWSInfo = (socket) => {
	switch (socket.readyState) {
		case WebSocket.CONNECTING:
			console.log("Connecting WS")
			break;
		case WebSocket.OPEN:
			console.log("Connnected to WS")
			break;
		case WebSocket.CLOSED:
			console.log("Failed to connect WS")
			break; 
		default:
			break;
	}
}



export {iconMapping}
export {colorMapping}
export {rpsResult}
export {constructPlayerStatistics}
export {logWSInfo}