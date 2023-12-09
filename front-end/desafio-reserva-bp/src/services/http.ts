import { useStore } from '@/stores'
import axios from 'axios'

const store = useStore()

const buildHeader = () => {
  const token = store.auth.token

  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    const authorization = {
      Authorization: `Bearer ${token}`,
    };

    Object.assign(header.headers, authorization);
  }

  return header;
};


export const HttpService = {

  async get(url: string) {
    try {
      const header = buildHeader()
      const { data } = await axios.get(url, header)
      return data
    } catch (error: any) {
      const data =  error?.response?.data
      throw data
    }
  },

  async post(url: string, body: object) {
    try {
      const { data } = await axios.post(url, body)
      return data
    } catch (error: any) {
      const data =  error?.response?.data
      throw data
    }
  }
}
