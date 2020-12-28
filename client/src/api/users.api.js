import httpClient from './http-client';

const END_POINT = '/users';

const login = form => httpClient.post(END_POINT + '/login', form);
const register = form => httpClient.post(END_POINT, form);

export {
  login,
  register
}