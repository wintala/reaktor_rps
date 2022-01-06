
const GenericTable = ({tableArray, className, firstRowHeader}) => {
	// turns nested array into a jsx table

	return(
		<>
		<table className={className}>
			<tbody>
				<tr>
					{tableArray[0].map((headerCell, i) => 
					firstRowHeader ?
					<th key={i}>{headerCell}</th> :
					<td key={i}>{headerCell}</td>
					)}
				</tr>
				{tableArray.slice(1).map((row, i) => 
				<tr key={i} >
					{row.map((cell, j) => 
					<td key={j}>{cell}</td>
					)}
				</tr>
				)}
			</tbody>
		</table>
		</>
	)
}


export default GenericTable
