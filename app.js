import express from 'express';
import { connectMongo } from './dbmongo.js';
import apiRoutes from './routes/apiRoutes.js';


const app = express();
connectMongo();

app.use(express.json());
app.use(apiRoutes);
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});