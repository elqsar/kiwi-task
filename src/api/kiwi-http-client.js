import axios from 'axios'
import moment from 'moment'

const DATE_PATTERN = 'DD/MM/YYYY'
const BASE_URL = 'https://api.skypicker.com'

const client = axios.create({
  baseURL: BASE_URL
})

const proxy = axios.create({
  baseURL: 'https://9782cb6s90.execute-api.eu-central-1.amazonaws.com/dev'
})

const allFlights = async (params) => {
  const query = createQuery(params)
  const { data } = await client.get(`/flights?${query}`)
  return data
}

const suggestLocation = async ({ term }) => {
  const { data } = await proxy.post(`/locations`, { term })
  return data
}

const createQuery = ({ from, to, dateFrom, offset }) => {
  // CZ, porto, 03%2F03%2F2018, 03%2F05%2F2018
  const parsedDate = new Date(dateFrom || Date.now())
  const queryDateFrom = encodeURIComponent(prepareDate(parsedDate))
  return `flyFrom=${from}&to=${to}&dateFrom=${queryDateFrom}&dateTo=${queryDateFrom}&directFlights=0&partner=picky&partner_market=eu&curr=EUR&offset=${offset}&limit=5&sort=price`
}

const prepareDate = date => moment(date).format(DATE_PATTERN) || moment().format(DATE_PATTERN)

export default {
  allFlights,
  suggestLocation
}
