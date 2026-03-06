/**
 * MULTER FILE UPLOAD MIDDLEWARE
 * ---------------------------------------------------------
 * This middleware configures Multer to handle file uploads
 * in an Express application. It uses disk storage to save
 * uploaded files directly on the server.
 * 
 * Multer works with the multipart/form-data protocol,
 * which is used when forms send files to a server.
 */

import multer from 'multer';

/**
 * STORAGE CONFIGURATION
 * ---------------------------------------------------------
 * diskStorage allows us to control:
 * 1. The destination folder where files will be saved.
 * 2. The filename that will be assigned to uploaded files.
 */
const storage = multer.diskStorage({

    /**
     * DESTINATION FUNCTION
     * ---------------------------------------------------------
     * Defines the folder where uploaded files will be stored.
     * 
     * Parameters:
     * req  -> Express request object
     * file -> Information about the uploaded file
     * cb   -> Callback function used to return the result
     * 
     * In this case, all files will be saved in the "uploads/" folder.
     */
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    /**
     * FILENAME FUNCTION
     * ---------------------------------------------------------
     * Defines the name of the file once it is stored.
     * 
     * To avoid filename conflicts, we prepend a timestamp
     * using Date.now() before the original file name.
     * 
     * Example generated filename:
     * 1712345678900-data.csv
     * 
     * Parameters:
     * req  -> Express request object
     * file -> Contains metadata about the uploaded file
     * cb   -> Callback function used to return the filename
     */
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }

});

/**
 * MULTER INSTANCE
 * ---------------------------------------------------------
 * Creates the Multer middleware using the storage
 * configuration defined above.
 * 
 * This middleware will process incoming multipart/form-data
 * requests and store the uploaded files on disk.
 */
const upload = multer({ storage });

/**
 * EXPORT MIDDLEWARE
 * ---------------------------------------------------------
 * The middleware is exported so it can be used in routes.
 * 
 * Example usage in a route:
 * 
 * import upload from '../middlewares/upload.js';
 * router.post('/upload', upload.single('file'), controller);
 */
export default upload;