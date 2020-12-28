import httpClient from './http-client';

const END_POINT = '/books';

const getBooks = () => httpClient.get(END_POINT);

export {
  getBooks
}