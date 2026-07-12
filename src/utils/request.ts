import axios from 'axios';
export const request = axios.create({
  baseURL: 'http://121.196.218.190:8080/fileTransferApi/file',
  timeout: 10000
});

export const toMinio = axios.create({
  baseURL: 'http://121.196.218.190:9000/',
  timeout: 10000
});