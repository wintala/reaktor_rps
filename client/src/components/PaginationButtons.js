
const PaginationButtons = ({nPages, currentPage, changePageFunc, className}) => {
	return(
		<div className={className}> 

			{currentPage > 2 ? 
			<>
			<button onClick={() => changePageFunc(1)}>
				1
			</button> 
			<span>...</span>
			</>
			: null}	

			{currentPage > 1 ? 
			<button onClick={() => changePageFunc(p => p - 1)}>
				{currentPage - 1}
			</button>
			: null}

			<button className={`${className} current-page-button`}>
				{currentPage}
			</button>

			{currentPage < nPages ? 
			<button onClick={() => changePageFunc(p => p + 1)}>
				{currentPage + 1}
			</button>
			: null}
			
			{currentPage < nPages - 1 ?
			<>
			<span>...</span>
			<button onClick={() => changePageFunc(nPages)}>
				{nPages}
			</button>
			</>
			: null}

		</div>
	)
}

export default PaginationButtons

