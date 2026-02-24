import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = crypto.randomUUID();
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
};
