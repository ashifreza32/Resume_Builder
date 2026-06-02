import multer from 'multer';

// 1. Storage engine setup
const storage = multer.diskStorage({});

// 2. Initialising the upload middleware with the storage config
const upload = multer({ storage });

// 3. Exporting the middleware for use in routes
export default upload;