import express from 'express';
import upload from '../middlewares/upload.js';
import { uploadProducts,uploadTransactions } from '../controllers/insertTables.js';
import {uploadAll} from '../controllers/insertMassiveController.js';

import {
    getDoctors,
    getDoctorById,
    updateDoctor
} from '../controllers/doctorController.js';
import { uploadAllMongoDb,getPatientHistory } from '../controllers/insertMassiveMongo.js';
import { getRevenueReport } from '../controllers/reportController.js';

const router = express.Router();


//insert Tables Routes
router.post('/upload/products', upload.single('archivo'), uploadProducts);
router.post('/upload/transactions', upload.single('archivo'), uploadTransactions);



router.post('/upload/all', upload.single('archivo'), uploadAll);




export default router;