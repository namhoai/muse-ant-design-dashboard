import { contantAuthentication } from '@constants/';
import { loadFromLocalStorageObjectFromBase64 } from '@databases/localStorage';

export default function authHeader() {
  const user = loadFromLocalStorageObjectFromBase64(contantAuthentication.DATA_AUTH);
  var header = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (user?.access_token) {
    header['Authorization'] = `Bearer ${user?.access_token}`;
  }
  return header;
}
