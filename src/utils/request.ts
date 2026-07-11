import axios from 'axios';
export const request = axios.create({
  baseURL: 'http://localhost:8080/fileTransferApi/file',
  timeout: 10000
});

export const toMinio = axios.create({
  baseURL: 'http://192.168.154.100:9000/',
  timeout: 10000
});