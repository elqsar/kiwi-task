import axios from 'axios'

const client = axios.create({
  baseURL: 'https://api.skypicker.com'
})

const allFlights = async (params) => {
  const query = createQuery(params)
  console.log('FETCH')
  const { data } = await client.get(`/flights?${query}`)
  return data
}

const createQuery = ({ from, to, dateFrom, dateTo }) => {
  // CZ, porto, 03%2F03%2F2018, 03%2F05%2F2018
  return `flyFrom=${from}&to=${to}&dateFrom=03%2F03%2F2018&dateTo=03%2F05%2F2018&directFlights=0&partner=picky&partner_market=eu&curr=EUR&offset=0&limit=5&sort=price`
}

export default {
  allFlights
}
