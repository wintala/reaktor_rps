
import {useState } from "react"

const useListPagination = (itemsPerPage) => {
	const [page, setPage] = useState(1)

	const paginate = (arr) => arr.slice((page - 1) * itemsPerPage, page * itemsPerPage)

	return [paginate, page, setPage]
}

export default useListPagination