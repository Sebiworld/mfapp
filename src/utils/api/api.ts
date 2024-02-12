import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://example.com',
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'example.com',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY
  },
});

export const api = {
  getData: () =>
    instance({
      'method': 'GET',
      'url': '/query',
      'params': {
        'search': 'parameter',
      },
      transformResponse: [function (data) {
        // Do whatever you want to transform the data
        console.log('Transforming data...')
        const json = JSON.parse(data)
        // list of nested object keys
        const dates = Object.keys(json['nested object'])
        data = {
          dates
        }
        return data;
      }],
    }),
  postData: () =>
    instance({
      'method': 'POST',
      'url': '/api',
      'data': {
        'item1': 'data1',
        'item2': 'item2'
      },
      'headers': {
        'content-type': 'application/json' // override instance defaults
      },
    })
}