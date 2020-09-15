import api from '../utils/api';
// const setUser = payload => ({ type: 'SET_USER', payload });
export const logUserOut = () => ({ type: 'LOG_OUT' });

export const fetchUser = userInfo => dispatch => {
  api.login().then(data => {
    console.log(data);
    localStorage.setItem('token', data.token);
    /* dispatch(setUser(data.user)); */
  });
};
