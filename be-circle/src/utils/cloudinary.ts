import {
  UPLOAD_API_KEY,
  UPLOAD_API_SECRET,
  UPLOAD_CLOUD_NAME,
  UPLOAD_FOLDER,
  UPLOAD_IMAGE_URL,
} from '@/config';
import { v2 as cloudinary } from 'cloudinary';

import { HttpException } from '@/exceptions/httpException';

cloudinary.config({
  cloud_name: UPLOAD_CLOUD_NAME,
  api_key: UPLOAD_API_KEY,
  api_secret: UPLOAD_API_SECRET,
});

export const uploadFile = async (file: Express.Multer.File) => {
  const fileMime = file.mimetype;
  const fileBuffer = file.buffer.toString('base64');

  return await cloudinary.uploader.upload(
    `data:${fileMime};base64,${fileBuffer}`,
    {
      folder: UPLOAD_FOLDER,
    },
    function (err, data) {
      if (err) {
        throw new HttpException(401, err.message);
      }
      if (data) {
        console.log(data);
      }
    },
  );
};

export const extractFileUrl = (fileUrl: string) => {
  return fileUrl.split(UPLOAD_IMAGE_URL)[1].split('/')[2].replace('.jpg', '');
};

export const removeImageFile = async (publicUrl: string) => {
  return await cloudinary.api.delete_resources(
    [`${UPLOAD_FOLDER}/${publicUrl}`],
    {
      type: 'upload',
    },
  );
};
