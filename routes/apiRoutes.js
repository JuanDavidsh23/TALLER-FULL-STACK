import express from 'express';
import upload from '../middlewares/upload.js';
import {uploadAllData} from '../controllers/insertMassiveController.js';
import {getAutos,getAutoByPlaca,createAuto,updateAuto,deleteAuto} from '../controllers/vehiculoscontroller.js';




const router = express.Router();

//TO USE THIS ENDPOINT YOU NEED TO PUT THE URL http://localhost:3000 ON GOOGLE AND SELECT THE FILE
//INSERT MASIVE SQL http://localhost:3000/uploadAllData
router.post('/uploadAllData', upload.single('archivo'), uploadAllData);


//ROUTES VEHICULOS 
//http://localhost:3000/getAutos GET ALL VEHICLES
router.get('/getAutos', getAutos);

//http://localhost:3000/getAutos/LHK965 GET VEHICLE FOR PLACA 
router.get('/getAutos/:placa', getAutoByPlaca);


//http://localhost:3000/createAutos CREATE VEHICLE
router.post('/createAutos', createAuto);

//http://localhost:3000/updateAuto
router.put('/updateAuto/:placa', updateAuto);

// http://localhost:3000/deleteAuto/:placa DELETE VEHICLE
router.delete('/deleteAuto/:placa', deleteAuto);



export default router;