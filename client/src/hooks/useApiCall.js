import { useEffect, useState } from "react"

const useApiCall = (fetchFunc) => {
	const [loading, setloading] = useState(true)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchFunc()
		.then(d => {
			setData(d)
			setloading(false)
		})
		.catch(e => {
			setError(e)
			setloading(false)
		})
	}, [])


	return [data, loading, error]
}

export default useApiCall