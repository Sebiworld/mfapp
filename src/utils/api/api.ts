import { ApiDefaultPage } from '@models/api-default-page.model';
import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  headers: {
    'content-type': 'application/json',
    'x-api-key': import.meta.env.VITE_APIKEY
  },
});

export const api = {
  getPage: (path: string, params?: { [key: string]: unknown }) =>
    instance({
      method: 'GET',
      url: `/tpage${(path?.[0] !== '/' ? '/' : '') + path}`,
      params,
      transformResponse: (response): ApiDefaultPage => {
        try {
          const json = JSON.parse(response);
          return json as ApiDefaultPage;
        } catch (e) {
          throw new Error('Could not parse response')
        }
      }
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