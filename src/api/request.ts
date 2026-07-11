import {request,toMinio} from '@/utils/request'

export const uploadFile = (file: string|null) => {
  return request.get('/upload', {
    params: {
      fileName: file,
    },
  })
}


// 上传文件到Minio
export const uploadFileToMinio = (bucketName: string, formData: FormData) => {
  return toMinio.post(`/${bucketName}`, formData,)
}


//获取文件下载
export const getFileDownload = (fileKey: string) => {
  return request.get('/download', {
    params: {
      key: fileKey,
    },
  })
}

//删除minio的文件
export const deleteFileFromMinio = (fileKey: string, fileName: string) => {
  return request.delete('/delete', {
    params: {
      fileKey: fileKey,
      fileName: fileName,
    },
  })
}