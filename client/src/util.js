
import rock from "./icons/rock.png"
import paper from "./icons/paper.png"
import scissors from "./icons/scissors.png"

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


export {iconMapping}
export {colorMapping}
export {rpsResult}