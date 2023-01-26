import { useEffect, useState } from 'react'

const useFetch = (url, options, params) => {
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState('')

  if (params) {
    url += '?' + new URLSearchParams(params)
  }

  useEffect(() => {
    // console.log('Fetching URL : ' + url)
    fetch(url, options)
      .then(async (res) => {
        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json')
        const data = isJson ? await res.json() : null
        if (!data)
          throw new Error(
            'Returned data was not JSON format : ' + res.statusText
          )
        return data
      })
      .then((data) => {
        seterror(data.error)
        setdata(data)
        setloading(false)
      })
      .catch((err) => {
        seterror(err.toString())
        setloading(false)
      })
  }, [url, options])
  return { data, loading, error }
}
export default useFetch
