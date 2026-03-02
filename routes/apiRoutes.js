import express from 'express';
import upload from '../middlewares/upload.js';
import {uploadAllData} from '../controllers/insertMassiveController.js';
import { getSuppliers,getSuppliersID,updateSuppliersID,createSuppliers,deleteSuppliers } from '../controllers/crudSuppliers.js';
import {getSuppliersAnalysis,getCustomerHistory,getTopProductsByCategory} from '../controllers/reportController.js'
import {uploadAllDataMongo} from '../controllers/insertMongo.js'


const router = express.Router();

//TO USE THIS ENDPOINT YOU NEED TO PUT THE URL http://localhost:3000 ON GOOGLE AND SELECT THE FILE
//INSERT MASIVE SQL http://localhost:3000/uploadAllData
router.post('/uploadAllData', upload.single('archivo'), uploadAllData);

//INSERT MASIVE TRANSACTIONS ON MONGO DBhttp://localhost:3000/uploadAllDataMongo
router.post('/uploadAllDataMongo', upload.single('archivo'), uploadAllDataMongo);

//GET SUPLIERS http://localhost:3000/api/suppliers BY ID http://localhost:3000/api/suppliers/1
router.get('/api/suppliers', getSuppliers);
router.get('/api/suppliers/:id', getSuppliersID);

//UPDATE SUPPLIER ROUTE http://localhost:3000/api/suppliers/1 
router.put('/api/suppliers/:id', updateSuppliersID);

//CREATE SUPPLIER http://localhost:3000/api/suppliers
router.post('/api/suppliers', createSuppliers);

//DELETE SUPPLIER http://localhost:3000/api/suppliers/id
router.delete('/api/suppliers/:id', deleteSuppliers);

//GET SUPPPLIERS ANALYSIS http://localhost:3000/api/supplierAnalysis
router.get('/api/supplierAnalysis',getSuppliersAnalysis)

//GET CUSTOMER HISTORY http://localhost:3000/api/customerHistory/1
router.get('/api/customerHistory/:id',getCustomerHistory)

//GET TOP PRODUCTS http://localhost:3000/api/topProducts/Home
router.get('/api/topProducts/:category',getTopProductsByCategory)


export default router;