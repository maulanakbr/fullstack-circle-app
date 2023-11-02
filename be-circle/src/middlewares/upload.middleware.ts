import type { Request } from 'express';
import multer from 'multer';

import { HttpException } from '@/exceptions/httpException';

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new HttpException(406, `${file.mimetype} is invalid file type`));
};

// const storage = multer.diskStorage({
//   destination: 'src/uploads',
//   filename: function (req: Request, file: Express.Multer.File, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage();

export const Upload = multer({ storage, fileFilter });
