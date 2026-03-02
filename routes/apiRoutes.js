import express from 'express';
import upload from '../middlewares/upload.js';
import { uploadProducts,uploadCostumers,uploadSupplier,UploadTransactions,uploadtransaction_details } from '../controllers/insertTables.js';
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
router.post('/upload/transactions', upload.single('archivo'), UploadTransactions);
router.post('/upload/customers', upload.single('archivo'), uploadCostumers);
router.post('/upload/Supplier', upload.single('archivo'), uploadSupplier);
router.post('/upload/detail', upload.single('archivo'), uploadtransaction_details);





router.post('/upload/all', upload.single('archivo'), uploadAll);




export default router;