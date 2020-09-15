const login = () =>
  fetchFunction('/login', {
    method: 'POST',
    body: JSON.stringify({
      apikey: `${process.env.REACT_APP_APIKEY}`,
      userkey: `${process.env.REACT_APP_USERKEY}`,
      username: `${process.env.REACT_APP_USERNAME}`,
    }),
  });

export default {
  login,
};

async function fetchFunction(path, params) {
  try {
    const res = await fetch(`https://cors-proxy-tvshows.herokuapp.com${path}`, {
      ...params,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Target-URL': 'https://api.thetvdb.com',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}
