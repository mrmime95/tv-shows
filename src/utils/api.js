import { SERVER, TARGET_URL } from './constants';

const login = () =>
  fetchFunction('/login', {
    method: 'POST',
    body: JSON.stringify({
      apikey: `${process.env.REACT_APP_APIKEY}`,
      userkey: `${process.env.REACT_APP_USERKEY}`,
      username: `${process.env.REACT_APP_USERNAME}`,
    }),
  });

const series = {
  search: params =>
    fetchFunction('/search/series', {
      method: 'GET',
      searchParams: params,
    }),
  getSeries: id =>
    fetchFunction(`/series/${id}`, {
      method: 'GET',
    }),
  getEpisodes: ({ id, page = 1 }) =>
    fetchFunction(`/series/${id}/episodes`, {
      method: 'GET',
      searchParams: { page },
    }),
};

export default {
  login,
  series,
};

async function fetchFunction(path, { searchParams, ...params }) {
  try {
    const res = await fetch(`${SERVER}${path}${searchParams ? `?${new URLSearchParams(searchParams)}` : ''}`, {
      ...params,
      headers: {
        'Content-Type': params.method === 'GET' ? 'none' : 'application/json',
        Accept: 'application/json',
        'Target-URL': TARGET_URL,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}
